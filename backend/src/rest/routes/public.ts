import { Router } from 'express';
import { AppDataSource } from '../../config/database';
import { Executive } from '../../entities/Executive';
import { OrgStructure } from '../../entities/OrgStructure';
import { Service } from '../../entities/Service';
import { Project } from '../../entities/Project';
import { Gallery } from '../../entities/Gallery';
import { ContactMessage } from '../../entities/ContactMessage';
import { Setting } from '../../entities/Setting';

const router = Router();

router.get('/executives', async (_req, res) => {
  const data = await AppDataSource.getRepository(Executive).find({ order: { order: 'ASC' } });
  res.json(data);
});

router.get('/executives/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const data = await AppDataSource.getRepository(Executive).findOne({ where: { id } });
  if (!data) {
    res.status(404).json({ error: 'Executive not found' });
    return;
  }
  res.json(data);
});

router.get('/org-structure', async (_req, res) => {
  const data = await AppDataSource.getRepository(OrgStructure).find({
    order: { level: 'ASC', order: 'ASC' },
  });
  res.json(data);
});

router.get('/services', async (_req, res) => {
  const data = await AppDataSource.getRepository(Service).find({
    order: { order: 'ASC' },
    relations: ['branches'],
  });
  res.json(data);
});

router.get('/services/:slug', async (req, res) => {
  const data = await AppDataSource.getRepository(Service).findOne({
    where: { slug: req.params.slug },
    relations: ['branches'],
  });
  if (!data) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  res.json(data);
});

router.get('/projects', async (req, res) => {
  const where: any = {};
  if (req.query.category) where.category = req.query.category;
  if (req.query.status) where.status = req.query.status;
  const data = await AppDataSource.getRepository(Project).find({ where, order: { id: 'DESC' } });
  res.json(data);
});

router.get('/projects/:slug', async (req, res) => {
  const data = await AppDataSource.getRepository(Project).findOne({
    where: { slug: req.params.slug },
    relations: ['gallery'],
  });
  if (!data) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(data);
});

router.get('/gallery', async (req, res) => {
  const where: any = {};
  if (req.query.category) where.category = req.query.category;
  const data = await AppDataSource.getRepository(Gallery).find({ where, order: { created_at: 'DESC' } });
  res.json(data);
});

router.get('/settings', async (_req, res) => {
  const data = await AppDataSource.getRepository(Setting).find();
  const settings: Record<string, any> = {};
  data.forEach((s) => {
    settings[s.key] = { lo: s.value_lo, en: s.value_en, zh: s.value_zh };
  });
  res.json(settings);
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' });
      return;
    }
    const contact = AppDataSource.getRepository(ContactMessage).create({ name, email, phone, message });
    await AppDataSource.getRepository(ContactMessage).save(contact);
    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
