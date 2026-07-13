import { Router } from 'express';
import { AppDataSource } from '../../config/database';
import { Executive } from '../../entities/Executive';
import { Service } from '../../entities/Service';
import { ServiceBranch } from '../../entities/ServiceBranch';
import { Project } from '../../entities/Project';
import { Gallery } from '../../entities/Gallery';
import { OrgStructure } from '../../entities/OrgStructure';
import { ContactMessage } from '../../entities/ContactMessage';
import { Setting } from '../../entities/Setting';
import { requireAuth, requireRole } from '../../middleware/auth';
import { upload } from '../../middleware/upload';

const router = Router();
router.use(requireAuth);
router.use(requireRole('super_admin', 'editor'));

function crudRoutes<T extends { id: number }>(path: string, entityClass: any) {
  router.get(path, async (_req, res) => {
    const data = await AppDataSource.getRepository(entityClass).find();
    res.json(data);
  });

  router.post(path, async (req, res) => {
    const repo = AppDataSource.getRepository(entityClass);
    const item = repo.create(req.body);
    const saved = await repo.save(item);
    res.status(201).json(saved);
  });

  router.put(`${path}/:id`, async (req, res) => {
    const repo = AppDataSource.getRepository(entityClass);
    const item = await repo.findOne({ where: { id: parseInt(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Not found' }); return; }
    repo.merge(item, req.body);
    const saved = await repo.save(item);
    res.json(saved);
  });

  router.delete(`${path}/:id`, async (req, res) => {
    const repo = AppDataSource.getRepository(entityClass);
    const result = await repo.delete(parseInt(req.params.id));
    if (result.affected === 0) { res.status(404).json({ error: 'Not found' }); return; }
    res.json({ success: true });
  });
}

crudRoutes('/executives', Executive);
crudRoutes('/services', Service);
crudRoutes('/service-branches', ServiceBranch);
crudRoutes('/projects', Project);
crudRoutes('/gallery', Gallery);
crudRoutes('/org-structure', OrgStructure);
crudRoutes('/settings', Setting);

router.get('/contact-messages', async (req, res) => {
  const data = await AppDataSource.getRepository(ContactMessage).find({ order: { created_at: 'DESC' } });
  res.json(data);
});

router.put('/contact-messages/:id', async (req, res) => {
  const repo = AppDataSource.getRepository(ContactMessage);
  const item = await repo.findOne({ where: { id: parseInt(req.params.id) } });
  if (!item) { res.status(404).json({ error: 'Not found' }); return; }
  repo.merge(item, { status: req.body.status });
  const saved = await repo.save(item);
  res.json(saved);
});

router.delete('/contact-messages/:id', async (req, res) => {
  const result = await AppDataSource.getRepository(ContactMessage).delete(parseInt(req.params.id));
  if (result.affected === 0) { res.status(404).json({ error: 'Not found' }); return; }
  res.json({ success: true });
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;
