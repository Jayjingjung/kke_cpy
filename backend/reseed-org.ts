import 'reflect-metadata';
import { AppDataSource } from './src/config/database';
import { OrgStructure } from './src/entities/OrgStructure';

async function run() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(OrgStructure);
  await repo.query('SET FOREIGN_KEY_CHECKS = 0');
  await repo.query('TRUNCATE TABLE org_structure');
  await repo.query('SET FOREIGN_KEY_CHECKS = 1');

  const sh = await repo.save(repo.create({ name_lo: 'ຜູ້ຖືຮຸ້ນ', name_en: 'Shareholders', name_zh: '股东', level: 0, order: 1 }));
  const bd = await repo.save(repo.create({ name_lo: 'ສະພາບໍລິຫານ', name_en: 'Board of Directors', name_zh: '董事会', parent_id: sh.id, level: 1, order: 1 }));

  const c = [
    ['ຄະນະກຳມະການກວດສອບ','Audit Committee','审计委员会'],
    ['ຄະນະກຳມະການ ບໍລິຫານຄວາມສ່ຽງ','Risk Management Committee','风险管理委员会'],
    ['ຄະນະກຳມະການ ບໍລິຫານຊັບສິນ ແລະ ໜີ້ສິນ','Asset Liabilities Management Committee','资产负债管理委员会'],
    ['ຄະນະກຳມະການ ບໍລິຫານ','Executive Committee','执行委员会'],
    ['ຄະນະກຳມະການສັນຫາ ແລະ ກຳນົດຄ່າຕອບແທນ','Nomination and Remuneration Committee','提名与薪酬委员会'],
    ['ຄະນະກຳມະການ ສິນເຊື່ອ','Credit Committee','信贷委员会'],
  ];
  for (let i = 0; i < c.length; i++) {
    await repo.save(repo.create({ name_lo: c[i][0], name_en: c[i][1], name_zh: c[i][2], parent_id: bd.id, level: 2, order: i+1 }));
  }

  const md = await repo.save(repo.create({ name_lo: 'ຜູ້ອຳນວຍການ', name_en: 'Managing Director', name_zh: '总经理', parent_id: bd.id, level: 2, order: 7 }));

  const d = [
    ['ຜູ້ຊ່ວຍ ບໍ່ແຮ່','Mining & Exploration','矿业勘探'],
    ['ຜູ້ຊ່ວຍ ໂຮງງານ','Plywood Factory','胶合板工厂'],
    ['ຜູ້ຊ່ວຍ ປໍ້ານ້ຳມັນ','Gas Station','加油站'],
    ['ຜູ້ຊ່ວຍ ໄຟຟ້າ','Electrical Eng.','电气工程'],
    ['ຜູ້ຊ່ວຍ ຂົນສົ່ງ','Logistics','物流'],
    ['ຜູ້ຊ່ວຍ ບໍລິຫານ','Administration','行政'],
    ['ຜູ້ຊ່ວຍ ການເງິນ','Finance','财务'],
    ['ຜູ້ຊ່ວຍ HR','Human Resources','人力资源'],
  ];
  for (let i = 0; i < d.length; i++) {
    await repo.save(repo.create({ name_lo: d[i][0], name_en: d[i][1], name_zh: d[i][2], parent_id: md.id, level: 3, order: i+1 }));
  }

  console.log('Done:', await repo.count());
  process.exit(0);
}
run().catch(e => { console.error(e.message); process.exit(1); });
