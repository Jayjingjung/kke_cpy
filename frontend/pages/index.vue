<template>
  <div>
    <!-- Hero Slider -->
    <HomeHeroSection />

    <!-- About Summary (csenergy style) -->
    <section class="about-home-section">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <!-- Left: Title -->
          <div>
            <h3 class="text-gold text-lg font-semibold mb-3">{{ $t('nav.about') }}</h3>
            <h2 class="text-2xl md:text-3xl font-heading font-bold text-white leading-tight mb-2">
              ບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຈຳກັດຜູ້ດຽວ
            </h2>
            <p class="text-gold/80 text-lg">KHOUNKHAM ENERGY SOLE CO., LTD</p>
          </div>
          <!-- Right: Description -->
          <div>
            <p class="text-gray-300 leading-relaxed mb-4">{{ $t('home.who_we_are_desc') }}</p>
            <p class="text-gray-400 leading-relaxed">{{ $t('about.commitment_content') }}</p>
          </div>
        </div>

        <!-- Icon cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <NuxtLink v-for="item in aboutLinks" :key="item.to"
            :to="localePath(item.to)"
            class="about-card group">
            <div class="about-icon">{{ item.icon }}</div>
            <h4 class="text-white text-sm font-semibold mb-2 text-center">{{ item.label }}</h4>
            <span class="text-gold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
              {{ $t('common.read_more') }} →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Services (csenergy style) -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Left: Info + Stats -->
          <div>
            <h3 class="text-gold-dark text-lg font-semibold mb-3">{{ $t('home.our_services') }}</h3>
            <h2 class="text-2xl md:text-3xl font-heading font-bold text-dark leading-tight mb-6">
              ພວກເຮົາດຳເນີນທຸລະກິດຫຼາກຫຼາຍ<br>ແຂນງໃນ ສປປ ລາວ
            </h2>
            <p class="text-gray-600 leading-relaxed mb-10">
              ທຸລະກິດຂອງບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຄອບຄຸມ 5 ແຂນງການຫຼັກ ລວມທັງ ການສຳຫຼວດ ແລະ ຂຸດຄົ້ນແຮ່, ໂຮງງານໄມ້ອັດ, ປໍ້ານ້ຳມັນ, ເຕັກນິກໄຟຟ້າ ແລະ ການຂົນສົ່ງ ໂດຍມີເຄືອຂ່າຍທົ່ວປະເທດ.
            </p>

            <!-- Stats -->
            <div class="space-y-5">
              <div v-for="stat in businessStats" :key="stat.label" class="flex items-center gap-4">
                <div class="stat-badge" :style="{ background: stat.color }">
                  {{ stat.number }}
                </div>
                <span class="text-dark font-semibold text-lg">{{ stat.label }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Vertical Image Slider -->
          <div class="vertical-slider">
            <div class="vslider-track" :style="{ transform: `translateY(-${vSlide * 33.33}%)` }">
              <div class="vslider-item" v-for="(img, i) in sliderImages" :key="i">
                <img :src="img.src" :alt="img.alt" />
                <div class="vslider-caption">{{ img.alt }}</div>
              </div>
            </div>
            <div class="vslider-dots">
              <button v-for="(_, i) in sliderImages" :key="i"
                @click="vSlide = i"
                :class="['vdot', { active: i === vSlide }]"></button>
            </div>
          </div>
        </div>

        <!-- Service category buttons -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
          <NuxtLink v-for="service in services" :key="service.slug"
            :to="localePath(`/services/${service.slug}`)"
            class="service-btn group">
            <span class="text-xl">{{ service.icon }}</span>
            <span class="font-semibold text-sm">{{ service.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Latest Projects (dark overlay cards) -->
    <section class="projects-section">
      <div class="container mx-auto px-4">
        <h3 class="text-gold text-center text-lg font-semibold mb-2">{{ $t('home.latest_projects') }}</h3>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white text-center mb-3">ໂຄງການ ແລະ ຜົນງານ</h2>
        <p class="text-gray-400 text-center max-w-2xl mx-auto mb-4">ທຸລະກິດຂອງບໍລິສັດ ຄູນຄໍາ ພະລັງງານ ຄອບຄຸມຫຼາຍແຂນງ ລວມທັງ ການສຳຫຼວດບໍ່ແຮ່, ໂຮງງານ ແລະ ພະລັງງານ</p>
        <div class="gold-divider"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <NuxtLink v-for="(project, idx) in allProjects" :key="project.id || idx"
            :to="localePath(`/projects/${project.slug}`)"
            class="pj-card group">
            <img :src="project.cover_image ? `${apiBase}${project.cover_image}` : defaultProjectImages[idx % 3]"
              :alt="getLocalized(project, 'title')" class="pj-bg" />
            <div class="pj-overlay"></div>
            <div class="pj-content">
              <h3 class="pj-title">{{ getLocalized(project, 'title') }}</h3>
              <p class="pj-desc">{{ project.location || getLocalized(project, 'description')?.substring(0, 80) }}</p>
              <span class="pj-link">{{ $t('common.read_more') }} ▸</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- News & Activities -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h3 class="text-gold-dark text-center text-lg font-semibold mb-2">ຂ່າວສານ ແລະ ກິດຈະກຳ</h3>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-dark text-center mb-10">ຂ່າວ ແລະ ກິດຈະກຳຫຼ້າສຸດ</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="news in newsItems" :key="news.title" class="news-card group">
            <div class="news-img">
              <img :src="news.image" :alt="news.title" />
              <div class="news-img-overlay"></div>
              <span class="news-badge">{{ news.category }}</span>
            </div>
            <div class="news-body">
              <h3 class="news-title">{{ news.title }}</h3>
              <div class="news-date">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {{ news.date }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Sustainability / CSR -->
    <section class="csr-section">
      <div class="container mx-auto px-4">
        <h3 class="text-gold text-center text-lg font-semibold mb-2">ຄວາມຍືນຍົງ</h3>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white text-center mb-10">
          ຄວາມເອົາໃຈໃສ່ຕໍ່ຊຸມຊົນ ແລະ ສິ່ງແວດລ້ອມ
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <!-- Left: Content -->
          <div>
            <div class="space-y-6">
              <div class="csr-item">
                <h4 class="text-gold font-semibold mb-1">1) ການສ້າງພະລັງງານສະອາດ:</h4>
                <p class="text-gray-300 text-sm leading-relaxed">ພວກເຮົາມຸ່ງເນັ້ນ ນຳໃຊ້ພະຍາກອນ ພະລັງງານໝູນວຽນ ຢ່າງມີປະສິດທິພາບ ເພື່ອຫຼຸດການປ່ອຍ ກາສະຖາບອນ ແລະ ສະໜອງພະລັງງານສະອາດ ໃຫ້ຄົນຮຸ່ນໃໝ່ ແລະ ຮຸ່ນຕໍ່ໄປ.</p>
              </div>
              <div class="csr-item">
                <h4 class="text-gold font-semibold mb-1">2) ແນວທາງການປະຕິບັດແບບຍືນຍົງ:</h4>
                <p class="text-gray-300 text-sm leading-relaxed">ພວກເຮົາຮ່ວມກັບຮັບຜິດຊອບ ດ້ານສະມຸລໄພ, ນິເຕັກຮັກສາສິ່ງແວດລ້ອມ ໃນທຸກຂະບວນການ ດຳເນີນທຸລະກິດ ຂອງອົງກອນ ເພື່ອຮອງຮັບຄວາມສົມດຸນ ຂອງລະນິເວດ ກຽງຮູ່ກັບການສ້າງຄຸນຄ່າ ທາງດ້ານເສດຖະກິດ ໃນໄລຍະຍາວ.</p>
              </div>
              <div class="csr-item">
                <h4 class="text-gold font-semibold mb-1">3) ເສີມສ້າງຄວາມເຂັ້ມແຂງໃຫ້ແກ່ຊຸມຊົນ:</h4>
                <p class="text-gray-300 text-sm leading-relaxed">ພວກເຮົາສົ່ງເສີມການເຂົ້າເຖິງພະລັງງານຢ່າງສະເໝີພາບ, ເປີດໂອກາດໃນການສ້າງວຽກເຮັດງານທຳ ໃຫ້ແກ່ຊຸມຊົນ ແລະ ການຮ່ວມມີໃນໄລຍະຍາວ ລູກຢູ່ຄວາມກ້າວໜ້າຮ່ວມກັນ ຢ່າງຍືນຍົງ.</p>
              </div>
            </div>
          </div>

          <!-- Right: Image Slider (csenergy style) -->
          <div class="csr-slider">
            <div class="csr-slider-track">
              <div class="csr-slide-main">
                <img :src="csrImages[csrSlide].src" :alt="csrImages[csrSlide].alt" class="csr-main-img" />
              </div>
            </div>
            <div class="csr-slider-thumbs">
              <button v-for="(img, i) in csrImages" :key="i" @click="csrSlide = i"
                :class="['csr-thumb', { active: i === csrSlide }]">
                <img :src="img.src" :alt="img.alt" />
              </button>
            </div>
            <!-- Arrows -->
            <button class="csr-arrow csr-arrow-left" @click="csrSlide = (csrSlide - 1 + csrImages.length) % csrImages.length">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button class="csr-arrow csr-arrow-right" @click="csrSlide = (csrSlide + 1) % csrImages.length">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Partners -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-gold-dark text-lg font-semibold mb-2">ການຮ່ວມມື</h3>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-dark mb-10">ຜູ້ຖືຮຸ້ນ ແລະ ຄູ່ຮ່ວມທຸລະກິດ</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div v-for="partner in partners" :key="partner.name" class="partner-card">
            <div class="partner-badge">{{ partner.type }}</div>
            <div class="text-3xl mb-2">{{ partner.icon }}</div>
            <span class="text-xs text-gray-500 font-medium">{{ partner.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Careers CTA -->
    <section class="careers-section">
      <div class="careers-overlay"></div>
      <div class="relative z-10 container mx-auto px-4 text-center text-white">
        <h3 class="text-gold text-lg font-semibold mb-2">ສະໝັກງານ</h3>
        <h2 class="text-2xl md:text-4xl font-heading font-bold mb-4">ພວກເຮົາກຳລັງຊອກຫາຜູ້ທີ່ມີຄວາມສາມາດ</h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">ຖ້າທ່ານມີຄວາມກະຕືລືລົ້ນໃນການເຮັດວຽກ ແລະ ສາມາດເຮັດວຽກເປັນສະມາຊິກເພີ່ມໄດ້, ສະໝັກເຂົ້າມາເປັນສ່ວນໜຶ່ງຂອງພວກເຮົາໄດ້</p>
        <NuxtLink :to="localePath('/contact')" class="btn-gold inline-flex items-center gap-2 text-lg">
          ສະໝັກວຽກ
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-line"></div>

    <!-- Contact CTA -->
    <section class="contact-cta-section">
      <div class="contact-cta-bg" style="background-image: url('/images/hero-mining.jpg');"></div>
      <div class="contact-cta-overlay"></div>
      <div class="relative z-10 container mx-auto px-4 text-center text-white">
        <h3 class="text-gold text-lg font-semibold mb-2">{{ $t('nav.contact') }}</h3>
        <h2 class="text-3xl md:text-5xl font-heading font-bold mb-4">{{ $t('home.contact_cta') }}</h2>
        <div class="gold-divider"></div>
        <p class="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">{{ $t('about.commitment_content') }}</p>
        <NuxtLink :to="localePath('/contact')" class="btn-gold text-lg inline-flex items-center gap-2">
          {{ $t('nav.contact') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { get, base: apiBase } = useApi();

const projects = ref<any[]>([]);

const services = computed(() => [
  { slug: 'mining', icon: '⛏️', title: t('nav.mining') },
  { slug: 'plywood', icon: '🏭', title: t('nav.plywood') },
  { slug: 'gas-stations', icon: '⛽', title: t('nav.gas_stations') },
  { slug: 'electrical', icon: '⚡', title: t('nav.electrical') },
  { slug: 'logistics', icon: '🚛', title: t('nav.logistics') },
]);

const businessStats = [
  { number: '05', label: 'ແຂນງທຸລະກິດຫຼັກ', color: '#C9A227' },
  { number: '05', label: 'ສາຂາປໍ້ານ້ຳມັນ', color: '#E2231A' },
  { number: '50+', label: 'ໂຄງການທີ່ດຳເນີນ', color: '#28a745' },
];

const allProjects = computed(() => {
  if (projects.value.length >= 4) return projects.value.slice(0, 4);
  const fallback = [
    { id: 'f1', slug: 'gold-mine-attapeu', title_lo: 'ໂຄງການຂຸດຄົ້ນທອງ ແຂວງ ອັດຕະປື', title_en: 'Gold Mining — Attapeu', location: 'ແຂວງ ອັດຕະປື', category: 'mining', description_lo: 'ໂຄງການຂຸດຄົ້ນ ແລະ ປຸງແຕ່ງແຮ່ທອງ ໃນແຂວງ ອັດຕະປື' },
    { id: 'f2', slug: 'plywood-factory-expansion', title_lo: 'ໂຄງການຂະຫຍາຍໂຮງງານໄມ້ອັດ', title_en: 'Plywood Factory Expansion', location: 'ແຂວງ ຄຳມ່ວນ', category: 'factory', description_lo: 'ຂະຫຍາຍກຳລັງການຜະລິດໂຮງງານໄມ້ອັດ' },
    { id: 'f3', slug: 'solar-power-pilot', title_lo: 'ໂຄງການນຳຮ່ອງ ພະລັງງານແສງຕາເວັນ', title_en: 'Solar Power Pilot', location: 'ນະຄອນຫຼວງວຽງຈັນ', category: 'energy', description_lo: 'ໂຄງການນຳຮ່ອງ ຕິດຕັ້ງແຜ່ນໂຊລາ' },
    { id: 'f4', slug: 'logistics-expansion', title_lo: 'ຂະຫຍາຍເສັ້ນທາງຂົນສົ່ງ ລາວ-ໄທ-ຈີນ', title_en: 'Logistics Expansion', location: 'ທົ່ວປະເທດ', category: 'logistics', description_lo: 'ຂະຫຍາຍເສັ້ນທາງຂົນສົ່ງ ຂ້າມແດນ' },
  ];
  return [...projects.value, ...fallback].slice(0, 4);
});

const defaultProjectImages = [
  '/images/hero-energy.jpg',
  '/images/hero-factory.jpg',
  '/images/hero-mining.jpg',
];

const newsItems = [
  { image: '/images/hero-mining.jpg', title: 'ບໍລິສັດ ຄູນຄໍາ ລົງນາມບັນທຶກຄວາມເຂົ້າໃຈ (MOU) ເພື່ອພັດທະນາໂຄງການບໍ່ແຮ່ໃໝ່', category: 'ຂ່າວສານ', date: '23 ພຶດສະພາ 2026' },
  { image: '/images/hero-factory.jpg', title: 'ພິທີເປີດໂຮງງານໄມ້ອັດ ສາຂາໃໝ່ ຢ່າງເປັນທາງການ ຢູ່ແຂວງ ຄຳມ່ວນ', category: 'ກິດຈະກຳ', date: '15 ເມສາ 2026' },
  { image: '/images/hero-energy.jpg', title: 'ຄູນຄໍາ ພະລັງງານ ຮັບລາງວັນບໍລິສັດ ດ້ານພະລັງງານດີເດັ່ນ ປະຈຳປີ 2026', category: 'ຂ່າວສານ', date: '02 ມີນາ 2026' },
];

const csrSlide = ref(0);
const csrImages = [
  { src: '/images/hero-mining.jpg', alt: 'ການດູແລສິ່ງແວດລ້ອມ' },
  { src: '/images/hero-factory.jpg', alt: 'ໂຮງງານ ແລະ ຊຸມຊົນ' },
  { src: '/images/hero-energy.jpg', alt: 'ພະລັງງານສະອາດ' },
];

const vSlide = ref(0);
let vTimer: ReturnType<typeof setInterval>;

const sliderImages = [
  { src: '/images/hero-mining.jpg', alt: 'ສຳຫຼວດ ແລະ ຂຸດຄົ້ນແຮ່' },
  { src: '/images/hero-factory.jpg', alt: 'ໂຮງງານໄມ້ອັດ' },
  { src: '/images/hero-energy.jpg', alt: 'ພະລັງງານ ແລະ ການຂົນສົ່ງ' },
];

onMounted(() => {
  vTimer = setInterval(() => {
    vSlide.value = (vSlide.value + 1) % sliderImages.length;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(vTimer);
});

const mapPins = [
  { x: 165, y: 262, label: 'ສຳນັກງານໃຫຍ່', color: '#E2231A' },
  { x: 290, y: 335, label: 'ໂຮງງານໄມ້ອັດ', color: '#C9A227' },
  { x: 320, y: 425, label: 'ປໍ້ານ້ຳມັນ', color: '#28a745' },
  { x: 305, y: 590, label: 'ປໍ້ານ້ຳມັນ', color: '#28a745' },
  { x: 400, y: 645, label: 'ບໍ່ແຮ່ທອງ', color: '#E2231A' },
];

const partners = [
  { name: 'ກະຊວງພະລັງງານ', icon: '🏛️', type: 'ລັດຖະບານ' },
  { name: 'BCEL', icon: '🏦', type: 'ການເງິນ' },
  { name: 'LDB Bank', icon: '🏦', type: 'ການເງິນ' },
  { name: 'ບ. ໂພນສະຫວັນ', icon: '🤝', type: 'ຄູ່ຮ່ວມ' },
  { name: 'EGAT', icon: '⚡', type: 'ຄູ່ຮ່ວມ' },
  { name: 'PwC', icon: '📊', type: 'ກວດສອບ' },
];

const aboutLinks = computed(() => [
  { to: '/about', icon: '🏢', label: t('about.vision') + ' & ' + t('about.mission') },
  { to: '/about/board', icon: '👥', label: t('nav.board') },
  { to: '/about/org-structure', icon: '🏗️', label: t('nav.org_structure') },
  { to: '/projects', icon: '📋', label: t('nav.projects') },
  { to: '/contact', icon: '📞', label: t('nav.contact') },
]);

function getLocalized(obj: any, field: string) {
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

onMounted(async () => {
  try {
    const data = await get('/projects');
    projects.value = data.slice(0, 3);
  } catch {}
});
</script>

<style scoped>
.about-home-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #040636 0%, #0a0d4a 40%, #040636 100%);
  position: relative;
}
.about-home-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227, transparent);
}
.about-home-section::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227, transparent);
}

.about-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(201, 162, 39, 0.15);
  transition: all 0.3s;
  cursor: pointer;
}
.about-card:hover {
  background: rgba(201, 162, 39, 0.1);
  border-color: rgba(201, 162, 39, 0.4);
  transform: translateY(-4px);
}

.about-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(201, 162, 39, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 14px;
  transition: all 0.3s;
}
.about-card:hover .about-icon {
  border-color: #C9A227;
  background: rgba(201, 162, 39, 0.15);
  transform: scale(1.1);
}

/* ===== Services Section ===== */
.stat-badge {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(4, 6, 54, 0.15);
}

.services-map-visual {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(4, 6, 54, 0.15);
  height: 400px;
}

.map-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background: rgba(4, 6, 54, 0.15);
}

.map-pin {
  position: absolute;
  font-size: 1.5rem;
  animation: pinBounce 2s ease-in-out infinite;
  filter: drop-shadow(0 2px 4px rgba(4, 6, 54, 0.4));
}
.map-pin:nth-child(2) { animation-delay: 0.3s; }
.map-pin:nth-child(3) { animation-delay: 0.6s; }
.map-pin:nth-child(4) { animation-delay: 0.9s; }
.map-pin:nth-child(5) { animation-delay: 1.2s; }

@keyframes pinBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.service-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 16px;
  border: 2px solid rgba(201, 162, 39, 0.3);
  border-radius: 12px;
  background: white;
  color: #333;
  transition: all 0.3s;
}
.service-btn:hover {
  border-color: #C9A227;
  background: linear-gradient(135deg, rgba(201, 162, 39, 0.05), rgba(201, 162, 39, 0.1));
  color: #C9A227;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
}

/* ===== CSR Slider ===== */
.csr-item {
  padding-left: 16px;
  border-left: 3px solid rgba(201, 162, 39, 0.3);
}

.csr-slider {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.csr-main-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 16px;
  transition: opacity 0.5s;
}

.csr-slider-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.csr-thumb {
  flex: 1;
  height: 70px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  opacity: 0.5;
  transition: all 0.3s;
  cursor: pointer;
}
.csr-thumb.active {
  border-color: #C9A227;
  opacity: 1;
}
.csr-thumb:hover { opacity: 0.8; }
.csr-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.csr-arrow {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(4, 6, 54, 0.6);
  color: white;
  border: 1px solid rgba(201, 162, 39, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 5;
}
.csr-arrow:hover {
  background: rgba(226, 35, 26, 0.7);
  border-color: #C9A227;
}
.csr-arrow-left { left: 10px; }
.csr-arrow-right { right: 10px; }

/* ===== Vertical Slider ===== */
.vertical-slider {
  position: relative;
  height: 420px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(4, 6, 54, 0.15);
  border: 2px solid rgba(201, 162, 39, 0.2);
}

.vslider-track {
  display: flex;
  flex-direction: column;
  height: 300%;
  transition: transform 0.8s ease-in-out;
}

.vslider-item {
  position: relative;
  height: 33.33%;
  flex-shrink: 0;
}
.vslider-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vslider-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  background: linear-gradient(transparent, rgba(4, 6, 54, 0.8));
  color: white;
  font-family: 'Phetsarath', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
}

.vslider-dots {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.vdot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}
.vdot.active {
  background: #C9A227;
  border-color: #C9A227;
  transform: scale(1.3);
}

/* ===== CSR Section ===== */
.csr-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #040636 0%, #0a0d4a 50%, #040636 100%);
  position: relative;
}

.csr-card {
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(201, 162, 39, 0.15);
  transition: all 0.3s;
  text-align: left;
}
.csr-card:hover {
  background: rgba(201, 162, 39, 0.08);
  border-color: rgba(201, 162, 39, 0.4);
  transform: translateY(-4px);
}

.csr-num {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #E2231A, #B91C14);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

/* ===== Partners ===== */
.partner-card {
  position: relative;
  padding: 24px 16px 16px;
  border-radius: 12px;
  background: white;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}
.partner-card:hover {
  border-color: rgba(201, 162, 39, 0.4);
  box-shadow: 0 4px 20px rgba(4, 6, 54, 0.1);
  transform: translateY(-2px);
}

.partner-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #040636, #0a0d4a);
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}

/* ===== Careers ===== */
.careers-section {
  position: relative;
  padding: 80px 0;
  background-image: url('/images/hero-factory.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* ===== Projects Section (dark bg, overlay cards) ===== */
.projects-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #040636 0%, #06093d 100%);
}

.pj-card {
  position: relative;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  display: block;
  cursor: pointer;
}

.pj-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.pj-card:hover .pj-bg {
  transform: scale(1.08);
}

.pj-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 20%, rgba(4, 6, 54, 0.85) 75%);
  transition: background 0.4s;
}
.pj-card:hover .pj-overlay {
  background: linear-gradient(transparent 10%, rgba(4, 6, 54, 0.9) 70%);
}

.pj-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;
}

.pj-title {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: white;
  margin-bottom: 8px;
  line-height: 1.4;
}

.pj-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 12px;
  line-height: 1.5;
}

.pj-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: #C9A227;
  transition: color 0.3s;
}
.pj-card:hover .pj-link {
  color: #e8d48b;
}

/* ===== Project Cards ===== */
.project-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(4, 6, 54, 0.08);
  transition: all 0.4s;
  border: 1px solid #eee;
}
.project-card:hover {
  box-shadow: 0 10px 30px rgba(4, 6, 54, 0.15);
  transform: translateY(-4px);
  border-color: rgba(201, 162, 39, 0.3);
}

.project-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}
.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.project-card:hover .project-img img {
  transform: scale(1.08);
}

.project-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 40%, rgba(4, 6, 54, 0.6));
}

.project-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #C9A227, #d4af37);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.project-status {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #28a745;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(4, 6, 54, 0.7);
  padding: 3px 10px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.project-body {
  padding: 20px;
}

.project-title {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 8px;
  transition: color 0.3s;
}
.project-card:hover .project-title {
  color: #C9A227;
}

.project-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #999;
}

/* ===== News Cards ===== */
.news-card {
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(4, 6, 54, 0.08);
  transition: all 0.4s;
  border: 1px solid #eee;
}
.news-card:hover {
  box-shadow: 0 10px 30px rgba(4, 6, 54, 0.15);
  transform: translateY(-4px);
  border-color: rgba(201, 162, 39, 0.3);
}

.news-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}
.news-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.news-card:hover .news-img img {
  transform: scale(1.08);
}

.news-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 50%, rgba(4, 6, 54, 0.7));
}

.news-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: linear-gradient(135deg, #C9A227, #d4af37);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  font-family: 'Phetsarath', sans-serif;
}

.news-body {
  padding: 20px;
}

.news-title {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 12px;
  transition: color 0.3s;
}
.news-card:hover .news-title {
  color: #C9A227;
}

.news-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #999;
}

.careers-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(4, 6, 54, 0.85), rgba(10, 13, 74, 0.85));
}

/* ===== Contact CTA ===== */
.contact-cta-section {
  position: relative;
  padding: 80px 0;
  overflow: hidden;
}

.contact-cta-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.contact-cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(226, 35, 26, 0.85) 0%, rgba(185, 28, 20, 0.8) 30%, rgba(4, 6, 54, 0.9) 100%);
}

.contact-cta-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  z-index: 5;
  background: linear-gradient(90deg, transparent, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227, transparent);
}
.contact-cta-section::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  z-index: 5;
  background: linear-gradient(90deg, transparent, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227, transparent);
}
</style>
