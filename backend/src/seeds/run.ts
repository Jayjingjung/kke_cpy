import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Service } from '../entities/Service';
import { ServiceBranch } from '../entities/ServiceBranch';
import { Executive } from '../entities/Executive';
import { OrgStructure } from '../entities/OrgStructure';
import { Setting } from '../entities/Setting';
import { Project } from '../entities/Project';

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected. Seeding...');

  const userRepo = AppDataSource.getRepository(User);
  if ((await userRepo.count()) === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await userRepo.save(userRepo.create({
      username: 'admin',
      email: 'admin@khounkham.com',
      password_hash: hash,
      role: 'super_admin',
    }));
    await userRepo.save(userRepo.create({
      username: 'editor',
      email: 'editor@khounkham.com',
      password_hash: await bcrypt.hash('editor123', 10),
      role: 'editor',
    }));
    console.log('Users created: admin/admin123, editor/editor123');
  }

  const serviceRepo = AppDataSource.getRepository(Service);
  if ((await serviceRepo.count()) === 0) {
    const services = [
      {
        slug: 'mining',
        title_lo: 'ສຳຫຼວດ ແລະ ຂຸດຄົ້ນແຮ່',
        title_en: 'Mineral Exploration & Mining',
        title_zh: '矿产勘探与开采',
        description_lo: 'ບໍລິສັດດຳເນີນການສຳຫຼວດ ແລະ ຂຸດຄົ້ນແຮ່ທາດຫຼາຍຊະນິດ ລວມທັງ ທອງ, ເງິນ, ທອງແດງ ແລະ ແຮ່ທາດອື່ນໆ ໂດຍນຳໃຊ້ເຕັກໂນໂລຊີທັນສະໄໝ ແລະ ເປັນມິດກັບສິ່ງແວດລ້ອມ. ພວກເຮົາມີທີມງານວິສະວະກອນ ແລະ ນັກທໍລະນີວິທະຍາທີ່ມີຄວາມຊ່ຽວຊານ ເພື່ອຮັບປະກັນການດຳເນີນງານທີ່ປອດໄພ ແລະ ມີປະສິດທິພາບ.',
        description_en: 'The company conducts exploration and mining of various minerals including gold, silver, copper and other minerals using modern and environmentally friendly technology. We have a team of experienced engineers and geologists to ensure safe and efficient operations.',
        description_zh: '公司开展多种矿产的勘探和开采，包括金、银、铜等矿物，采用现代化和环保技术。我们拥有经验丰富的工程师和地质学家团队，确保安全高效的运营。',
        icon: 'mining', order: 1,
      },
      {
        slug: 'plywood',
        title_lo: 'ໂຮງງານໄມ້ອັດ',
        title_en: 'Plywood / Particle Board Factory',
        title_zh: '胶合板工厂',
        description_lo: 'ໂຮງງານໄມ້ອັດຂອງພວກເຮົາຜະລິດໄມ້ອັດ ແລະ ແຜ່ນໄມ້ຄຸນນະພາບສູງ ສຳລັບການກໍ່ສ້າງ ແລະ ເຟີນິເຈີ ໂດຍໃຊ້ໄມ້ຈາກສວນປູກທີ່ໄດ້ຮັບການຮັບຮອງ. ຜະລິດຕະພັນຂອງພວກເຮົາໄດ້ຮັບຄວາມນິຍົມທັງໃນ ແລະ ຕ່າງປະເທດ.',
        description_en: 'Our plywood factory produces high-quality plywood and particle boards for construction and furniture using timber from certified plantations. Our products are popular both domestically and internationally.',
        description_zh: '我们的胶合板工厂使用经认证种植园的木材，生产用于建筑和家具的高品质胶合板和刨花板。我们的产品在国内外都很受欢迎。',
        icon: 'factory', order: 2,
      },
      {
        slug: 'gas-stations',
        title_lo: 'ປໍ້ານ້ຳມັນ',
        title_en: 'Gas Stations',
        title_zh: '加油站',
        description_lo: 'ເຄືອຂ່າຍປໍ້ານ້ຳມັນ 5 ສາຂາ ໃຫ້ບໍລິການນ້ຳມັນເຊື້ອໄຟ ແລະ ຜະລິດຕະພັນປິໂຕຣເລຍມ ທີ່ມີຄຸນນະພາບ ໃນທົ່ວພາກກາງ ແລະ ພາກໃຕ້ຂອງລາວ. ປໍ້ານ້ຳມັນຂອງພວກເຮົາໃຫ້ບໍລິການ 24 ຊົ່ວໂມງ ແລະ ມີສິ່ງອຳນວຍຄວາມສະດວກຄົບຖ້ວນ.',
        description_en: 'A network of 5 gas station branches providing quality fuel and petroleum products across central and southern Laos. Our stations operate 24 hours and offer full amenities.',
        description_zh: '5个加油站分支机构组成的网络，在老挝中部和南部提供优质燃油和石油产品。我们的加油站24小时营业，设施齐全。',
        icon: 'fuel', order: 3,
      },
      {
        slug: 'electrical',
        title_lo: 'ຝ່າຍເຕັກນິກໄຟຟ້າ',
        title_en: 'Electrical Engineering',
        title_zh: '电气工程部',
        description_lo: 'ຝ່າຍເຕັກນິກໄຟຟ້າໃຫ້ບໍລິການອອກແບບ, ຕິດຕັ້ງ ແລະ ບຳລຸງຮັກສາລະບົບໄຟຟ້າ ສຳລັບໂຄງການອຸດສາຫະກຳ ແລະ ພື້ນຖານໂຄງລ່າງ ລວມທັງ ລະບົບໄຟຟ້າແຮງສູງ, ໝໍ້ແປງ ແລະ ລະບົບຄວບຄຸມ.',
        description_en: 'Our electrical engineering department provides design, installation and maintenance of electrical systems for industrial projects and infrastructure including high-voltage systems, transformers and control systems.',
        description_zh: '电气工程部门为工业项目和基础设施提供电气系统的设计、安装和维护服务，包括高压系统、变压器和控制系统。',
        icon: 'electrical', order: 4,
      },
      {
        slug: 'logistics',
        title_lo: 'ການຂົນສົ່ງ',
        title_en: 'Logistics & Transportation',
        title_zh: '物流运输',
        description_lo: 'ບໍລິການຂົນສົ່ງສິນຄ້າ ແລະ ວັດສະດຸ ດ້ວຍກອງເຮືອຂົນສົ່ງທີ່ທັນສະໄໝ ຄອບຄຸມເສັ້ນທາງຫຼັກໃນ ສປປ ລາວ ແລະ ປະເທດເພື່ອນບ້ານ ລວມທັງ ໄທ, ຫວຽດນາມ ແລະ ຈີນ. ພວກເຮົາຂົນສົ່ງແຮ່ທາດ, ໄມ້, ນ້ຳມັນ ແລະ ສິນຄ້າທົ່ວໄປ.',
        description_en: 'Cargo and material transportation services with a modern fleet covering major routes in Lao PDR and neighboring countries including Thailand, Vietnam and China. We transport minerals, timber, fuel and general cargo.',
        description_zh: '以现代化车队提供货物和材料运输服务，覆盖老挝和邻国（泰国、越南和中国）的主要路线。我们运输矿产、木材、燃料和普通货物。',
        icon: 'logistics', order: 5,
      },
    ];
    for (const s of services) {
      await serviceRepo.save(serviceRepo.create(s as Partial<Service>));
    }
    console.log('Services seeded');

    // Seed gas station branches
    const gasService = await serviceRepo.findOne({ where: { slug: 'gas-stations' } });
    if (gasService) {
      const branchRepo = AppDataSource.getRepository(ServiceBranch);
      const branches = [
        { service_id: gasService.id, name_lo: 'ສາຂາ 1 — ນະຄອນຫຼວງ', name_en: 'Branch 1 — Vientiane', name_zh: '第1分店 — 万象', address_lo: 'ຖະໜົນ ທ່າເດື່ອ, ນະຄອນຫຼວງວຽງຈັນ', address_en: 'Thadeua Road, Vientiane Capital', address_zh: '万象市塔德瓦路', lat: 17.9667, lng: 102.6000, phone: '+856 20 xxxx 0001' },
        { service_id: gasService.id, name_lo: 'ສາຂາ 2 — ຄຳມ່ວນ', name_en: 'Branch 2 — Khammouane', name_zh: '第2分店 — 甘蒙', address_lo: 'ເມືອງ ທ່າແຂກ, ແຂວງ ຄຳມ່ວນ', address_en: 'Thakhek District, Khammouane Province', address_zh: '甘蒙省他曲县', lat: 17.4000, lng: 104.8000, phone: '+856 20 xxxx 0002' },
        { service_id: gasService.id, name_lo: 'ສາຂາ 3 — ສະຫວັນນະເຂດ', name_en: 'Branch 3 — Savannakhet', name_zh: '第3分店 — 沙湾拿吉', address_lo: 'ເມືອງ ໄກສອນ, ແຂວງ ສະຫວັນນະເຂດ', address_en: 'Kaysone District, Savannakhet Province', address_zh: '沙湾拿吉省凯山县', lat: 16.5500, lng: 104.7500, phone: '+856 20 xxxx 0003' },
        { service_id: gasService.id, name_lo: 'ສາຂາ 4 — ຈຳປາສັກ', name_en: 'Branch 4 — Champasak', name_zh: '第4分店 — 占巴塞', address_lo: 'ເມືອງ ປາກເຊ, ແຂວງ ຈຳປາສັກ', address_en: 'Pakse District, Champasak Province', address_zh: '占巴塞省巴色县', lat: 15.1200, lng: 105.7900, phone: '+856 20 xxxx 0004' },
        { service_id: gasService.id, name_lo: 'ສາຂາ 5 — ວຽງຈັນ', name_en: 'Branch 5 — Vientiane Province', name_zh: '第5分店 — 万象省', address_lo: 'ເມືອງ ວັງວຽງ, ແຂວງ ວຽງຈັນ', address_en: 'Vang Vieng District, Vientiane Province', address_zh: '万象省万荣县', lat: 18.9200, lng: 102.4500, phone: '+856 20 xxxx 0005' },
      ];
      for (const b of branches) {
        await branchRepo.save(branchRepo.create(b as Partial<ServiceBranch>));
      }
      console.log('Gas station branches seeded');
    }
  }

  const execRepo = AppDataSource.getRepository(Executive);
  if ((await execRepo.count()) === 0) {
    const execs = [
      {
        name_lo: 'ທ່ານ ຄູນຄຳ', name_en: 'Mr. Khounkham', name_zh: '坤坎先生',
        position_lo: 'ປະທານບໍລິສັດ', position_en: 'Chairman', position_zh: '董事长',
        bio_lo: 'ຜູ້ກໍ່ຕັ້ງ ແລະ ປະທານບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ມີປະສົບການຫຼາຍກວ່າ 20 ປີ ໃນທຸລະກິດພະລັງງານ ແລະ ບໍ່ແຮ່',
        bio_en: 'Founder and Chairman of KHOUNKHAM ENERGY with over 20 years of experience in energy and mining business',
        bio_zh: '坤坎能源创始人兼董事长，在能源和矿业领域拥有20多年经验',
        order: 1,
      },
      {
        name_lo: 'ທ່ານ ນາງ ສົມພອນ', name_en: 'Mrs. Somphone', name_zh: '宋蓬女士',
        position_lo: 'ຮອງປະທານບໍລິສັດ', position_en: 'Vice Chairman', position_zh: '副董事长',
        bio_lo: 'ຮັບຜິດຊອບດ້ານການເງິນ ແລະ ບໍລິຫານ ມີປະສົບການດ້ານການບໍລິຫານອົງກອນຂະໜາດໃຫຍ່',
        bio_en: 'Responsible for finance and administration with extensive experience in managing large organizations',
        bio_zh: '负责财务和行政管理，在大型企业管理方面拥有丰富经验',
        order: 2,
      },
      {
        name_lo: 'ທ່ານ ວິໄລ', name_en: 'Mr. Vilai', name_zh: '维莱先生',
        position_lo: 'ຜູ້ອຳນວຍການໃຫຍ່', position_en: 'Chief Executive Officer', position_zh: '首席执行官',
        bio_lo: 'ບໍລິຫານງານປະຈຳວັນຂອງບໍລິສັດ ແລະ ກຳກັບທິດທາງຍຸດທະສາດ',
        bio_en: 'Manages daily operations and oversees strategic direction of the company',
        bio_zh: '管理公司日常运营并监督战略方向',
        order: 3,
      },
    ];
    for (const e of execs) {
      await execRepo.save(execRepo.create(e as Partial<Executive>));
    }
    console.log('Executives seeded');
  }

  const orgRepo = AppDataSource.getRepository(OrgStructure);
  if ((await orgRepo.count()) === 0) {
    // Level 0: Shareholders
    const shareholders = await orgRepo.save(orgRepo.create({
      name_lo: 'ຜູ້ຖືຮຸ້ນ', name_en: 'Shareholders', name_zh: '股东', level: 0, order: 1,
    }));
    // Level 1: Board of Directors
    const board = await orgRepo.save(orgRepo.create({
      name_lo: 'ສະພາບໍລິຫານ', name_en: 'Board of Directors', name_zh: '董事会', parent_id: shareholders.id, level: 1, order: 1,
    }));
    // Level 2: Committees under Board
    const committees = [
      { name_lo: 'ຄະນະກຳມະການກວດສອບ', name_en: 'Audit Committee', name_zh: '审计委员会' },
      { name_lo: 'ຄະນະກຳມະການ ບໍລິຫານຄວາມສ່ຽງ', name_en: 'Risk Management Committee', name_zh: '风险管理委员会' },
      { name_lo: 'ຄະນະກຳມະການ ບໍລິຫານຊັບສິນ ແລະ ໜີ້ສິນ', name_en: 'Asset Liabilities Management Committee', name_zh: '资产负债管理委员会' },
      { name_lo: 'ຄະນະກຳມະການ ບໍລິຫານ', name_en: 'Executive Committee', name_zh: '执行委员会' },
      { name_lo: 'ຄະນະກຳມະການສັນຫາ ແລະ ກຳນົດຄ່າຕອບແທນ', name_en: 'Nomination and Remuneration Committee', name_zh: '提名与薪酬委员会' },
      { name_lo: 'ຄະນະກຳມະການ ສິນເຊື່ອ', name_en: 'Credit Committee', name_zh: '信贷委员会' },
    ];
    for (let i = 0; i < committees.length; i++) {
      await orgRepo.save(orgRepo.create({ ...committees[i], parent_id: board.id, level: 2, order: i + 1 }));
    }
    // Level 2: Managing Director (under Board)
    const md = await orgRepo.save(orgRepo.create({
      name_lo: 'ຜູ້ອຳນວຍການ', name_en: 'Managing Director', name_zh: '总经理', parent_id: board.id, level: 2, order: 7,
    }));
    // Level 3: Departments under MD
    const depts = [
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ບໍ່ແຮ່ ແລະ ສຳຫຼວດ', name_en: 'Mining & Exploration Dept.', name_zh: '矿业与勘探部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ໂຮງງານໄມ້ອັດ', name_en: 'Plywood Factory Dept.', name_zh: '胶合板工厂部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ປໍ້ານ້ຳມັນ', name_en: 'Gas Station Dept.', name_zh: '加油站部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ເຕັກນິກໄຟຟ້າ', name_en: 'Electrical Engineering Dept.', name_zh: '电气工程部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ຂົນສົ່ງ', name_en: 'Logistics Dept.', name_zh: '物流部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ບໍລິຫານ', name_en: 'Administration Dept.', name_zh: '行政部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ການເງິນ', name_en: 'Finance Dept.', name_zh: '财务部' },
      { name_lo: 'ຜູ້ຊ່ວຍຜູ້ອຳນວຍການ ຊັບພະຍາກອນມະນຸດ', name_en: 'Human Resources Dept.', name_zh: '人力资源部' },
    ];
    for (let i = 0; i < depts.length; i++) {
      await orgRepo.save(orgRepo.create({ ...depts[i], parent_id: md.id, level: 3, order: i + 1 }));
    }
    console.log('Org structure seeded');
  }

  const settingRepo = AppDataSource.getRepository(Setting);
  if ((await settingRepo.count()) === 0) {
    const settings = [
      { key: 'company_name', value_lo: 'ບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຈຳກັດຜູ້ດຽວ', value_en: 'KHOUNKHAM ENERGY SOLE CO., LTD', value_zh: '坤坎能源独资有限公司' },
      { key: 'phone', value_lo: '+856 20 xxxx xxxx', value_en: '+856 20 xxxx xxxx', value_zh: '+856 20 xxxx xxxx' },
      { key: 'email', value_lo: 'info@khounkham.com', value_en: 'info@khounkham.com', value_zh: 'info@khounkham.com' },
      { key: 'address', value_lo: 'ຖະໜົນ ລ້ານຊ້າງ, ເມືອງ ຈັນທະບູລີ, ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ', value_en: 'Lan Xang Road, Chanthabouly District, Vientiane Capital, Lao PDR', value_zh: '老挝万象市占塔布里县澜沧路' },
      { key: 'slogan', value_lo: 'ພະລັງງານເພື່ອອະນາຄົດ', value_en: 'Energy for the Future', value_zh: '为未来提供能源' },
      { key: 'founded_year', value_lo: '2005', value_en: '2005', value_zh: '2005' },
      { key: 'company_history', value_lo: 'ບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຈຳກັດຜູ້ດຽວ ໄດ້ສ້າງຕັ້ງຂຶ້ນໃນປີ 2005 ດ້ວຍເປົ້າໝາຍເພື່ອພັດທະນາພະລັງງານ, ບໍ່ແຮ່ ແລະ ອຸດສາຫະກຳ ແບບຍືນຍົງ ໃນ ສປປ ລາວ. ນັບຕັ້ງແຕ່ເລີ່ມສ້າງຕັ້ງ, ບໍລິສັດໄດ້ຂະຫຍາຍຕົວຢ່າງຕໍ່ເນື່ອງ ຈາກທຸລະກິດດ້ານບໍ່ແຮ່ ໄປສູ່ໂຮງງານໄມ້ອັດ, ປໍ້ານ້ຳມັນ 5 ສາຂາ, ເຕັກນິກໄຟຟ້າ ແລະ ການຂົນສົ່ງ ຈົນກາຍເປັນກຸ່ມບໍລິສັດທີ່ໜ້າເຊື່ອຖື ແລະ ມີຊື່ສຽງໃນທົ່ວປະເທດ.', value_en: 'KHOUNKHAM ENERGY SOLE CO., LTD was established in 2005 with the goal of driving sustainable development in energy, mining and industrial sectors in Lao PDR. Since its founding, the company has steadily expanded from mining operations into plywood manufacturing, a network of 5 gas stations, electrical engineering and logistics, becoming a trusted and reputable conglomerate across the country.', value_zh: '坤坎能源独资有限公司成立于2005年，目标是推动老挝能源、矿业和工业领域的可持续发展。自成立以来，公司从矿业运营稳步扩展到胶合板制造、5个加油站网络、电气工程和物流，成为全国值得信赖和享有声誉的企业集团。' },
      { key: 'vision', value_lo: 'ເປັນກຸ່ມບໍລິສັດດ້ານພະລັງງານ ແລະ ອຸດສາຫະກຳ ຊັ້ນນຳໃນພາກພື້ນແມ່ນ້ຳຂອງ ທີ່ມີການດຳເນີນທຸລະກິດແບບຍືນຍົງ ແລະ ຮັບຜິດຊອບຕໍ່ສັງຄົມ.', value_en: 'To be the leading energy and industrial conglomerate in the Mekong region, operating sustainably and with social responsibility.', value_zh: '成为湄公河地区领先的能源和工业集团，以可持续和负社会责任的方式经营。' },
      { key: 'mission', value_lo: 'ສະໜອງການບໍລິການດ້ານພະລັງງານທີ່ໜ້າເຊື່ອຖື, ການຂຸດຄົ້ນບໍ່ແຮ່ທີ່ມີຄວາມຮັບຜິດຊອບ ແລະ ການບໍລິການອຸດສາຫະກຳທີ່ມີຄຸນນະພາບ ເພື່ອການເຕີບໂຕແບບຍືນຍົງ ແລະ ການພັດທະນາຊຸມຊົນ.', value_en: 'To deliver reliable energy solutions, responsible mining practices, and quality industrial services for sustainable growth and community development.', value_zh: '提供可靠的能源解决方案、负责任的矿业实践和优质的工业服务，促进可持续增长和社区发展。' },
      { key: 'facebook', value_lo: 'https://facebook.com/khounkham.energy', value_en: 'https://facebook.com/khounkham.energy', value_zh: 'https://facebook.com/khounkham.energy' },
      { key: 'whatsapp', value_lo: '+856 20 xxxx xxxx', value_en: '+856 20 xxxx xxxx', value_zh: '+856 20 xxxx xxxx' },
    ];
    for (const s of settings) {
      await settingRepo.save(settingRepo.create(s));
    }
    console.log('Settings seeded');
  }

  const projectRepo = AppDataSource.getRepository(Project);
  if ((await projectRepo.count()) === 0) {
    const projects = [
      {
        slug: 'gold-mine-attapeu',
        title_lo: 'ໂຄງການຂຸດຄົ້ນທອງ ແຂວງ ອັດຕະປື',
        title_en: 'Gold Mining Project — Attapeu Province',
        title_zh: '阿速坡省金矿项目',
        category: 'mining', status: 'ongoing',
        description_lo: 'ໂຄງການຂຸດຄົ້ນ ແລະ ປຸງແຕ່ງແຮ່ທອງ ໃນແຂວງ ອັດຕະປື ມີກຳລັງການຜະລິດ 500 ໂຕນຕໍ່ວັນ',
        description_en: 'Gold mining and processing project in Attapeu Province with a production capacity of 500 tons per day',
        description_zh: '阿速坡省金矿开采和加工项目，日产能500吨',
        location: 'ແຂວງ ອັດຕະປື / Attapeu Province',
        start_date: new Date('2018-01-01'),
      },
      {
        slug: 'plywood-factory-expansion',
        title_lo: 'ໂຄງການຂະຫຍາຍໂຮງງານໄມ້ອັດ',
        title_en: 'Plywood Factory Expansion',
        title_zh: '胶合板工厂扩建项目',
        category: 'factory', status: 'completed',
        description_lo: 'ຂະຫຍາຍກຳລັງການຜະລິດໂຮງງານໄມ້ອັດ ເພີ່ມສາຍການຜະລິດໃໝ່ 2 ສາຍ',
        description_en: 'Expanding plywood factory production capacity with 2 new production lines',
        description_zh: '扩大胶合板工厂生产能力，新增2条生产线',
        location: 'ແຂວງ ຄຳມ່ວນ / Khammouane Province',
        start_date: new Date('2020-06-01'), end_date: new Date('2022-12-01'),
      },
      {
        slug: 'solar-power-pilot',
        title_lo: 'ໂຄງການນຳຮ່ອງ ພະລັງງານແສງຕາເວັນ',
        title_en: 'Solar Power Pilot Project',
        title_zh: '太阳能试点项目',
        category: 'energy', status: 'ongoing',
        description_lo: 'ໂຄງການນຳຮ່ອງ ຕິດຕັ້ງແຜ່ນໂຊລາ ຢູ່ປໍ້ານ້ຳມັນ ແລະ ໂຮງງານ ເພື່ອຫຼຸດຕົ້ນທຶນພະລັງງານ',
        description_en: 'Pilot project installing solar panels at gas stations and factories to reduce energy costs',
        description_zh: '在加油站和工厂安装太阳能板以降低能源成本的试点项目',
        location: 'ນະຄອນຫຼວງວຽງຈັນ / Vientiane Capital',
        start_date: new Date('2024-03-01'),
      },
    ];
    for (const p of projects) {
      await projectRepo.save(projectRepo.create(p as Partial<Project>));
    }
    console.log('Projects seeded');
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
