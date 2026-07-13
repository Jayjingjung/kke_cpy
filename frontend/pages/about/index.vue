<template>
  <div>
    <!-- Banner (ແດງ→ທອງ→ດຳອ່ອນ) -->
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('about.title') }}</h1>
        <div class="gold-divider mt-4"></div>
      </div>
    </section>

    <!-- History (ພື້ນຂາວ) -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="section-title">{{ $t('about.history') }}</h2>
        <div class="gold-divider"></div>
        <div class="prose prose-lg mx-auto text-gray-700 leading-relaxed">
          <p>{{ settings.company_history || $t('about.history_content') }}</p>
        </div>
      </div>
    </section>

    <!-- Vision & Mission (ພື້ນເທົາອ່ອນ) -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-white p-8 rounded-lg shadow-md border-t-4 border-gold overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 h-1" style="background: linear-gradient(90deg, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227)"></div>
            <h3 class="text-2xl font-heading font-bold mb-4 text-gold-gradient">{{ $t('about.vision') }}</h3>
            <p class="text-gray-700">{{ settings.vision || $t('about.vision_content') }}</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary overflow-hidden relative">
            <div class="absolute top-0 left-0 right-0 h-1" style="background: linear-gradient(90deg, #E2231A, #B91C14, #E2231A)"></div>
            <h3 class="text-2xl font-heading font-bold mb-4 text-primary">{{ $t('about.mission') }}</h3>
            <p class="text-gray-700">{{ settings.mission || $t('about.mission_content') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values (ພື້ນຂາວ) -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="section-title">{{ $t('about.values') }}</h2>
        <div class="gold-divider"></div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div v-for="value in coreValues" :key="value.icon" class="flex flex-col items-center group">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
              style="background: linear-gradient(135deg, rgba(201,162,39,0.1), rgba(201,162,39,0.2)); border: 2px solid rgba(201,162,39,0.3);">
              <span class="text-2xl">{{ value.icon }}</span>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ value.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Commitment (ແດງ→ທອງ→ດຳອ່ອນ) -->
    <section class="py-20 page-banner text-white text-center">
      <div class="container mx-auto px-4 max-w-3xl relative z-10">
        <h2 class="text-3xl font-heading font-bold mb-4">{{ $t('about.commitment') }}</h2>
        <div class="gold-divider"></div>
        <p class="text-lg text-gray-200 leading-relaxed">{{ $t('about.commitment_content') }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const { get } = useApi();

const settings = ref<Record<string, string>>({});

const coreValues = computed(() => [
  { icon: '🤝', label: locale.value === 'lo' ? 'ຄວາມຊື່ສັດ' : locale.value === 'zh' ? '诚信' : 'Integrity' },
  { icon: '🛡️', label: locale.value === 'lo' ? 'ຄວາມປອດໄພ' : locale.value === 'zh' ? '安全' : 'Safety' },
  { icon: '💡', label: locale.value === 'lo' ? 'ນະວັດຕະກຳ' : locale.value === 'zh' ? '创新' : 'Innovation' },
  { icon: '🌿', label: locale.value === 'lo' ? 'ສິ່ງແວດລ້ອມ' : locale.value === 'zh' ? '环保' : 'Environment' },
  { icon: '🏘️', label: locale.value === 'lo' ? 'ພັດທະນາຊຸມຊົນ' : locale.value === 'zh' ? '社区' : 'Community' },
]);

onMounted(async () => {
  try {
    const data = await get('/settings');
    for (const [key, val] of Object.entries(data as Record<string, any>)) {
      settings.value[key] = val[locale.value] || val.en || '';
    }
  } catch {}
});
</script>

<style scoped>
.text-gold-gradient {
  background: linear-gradient(135deg, #C9A227 0%, #e8d48b 35%, #f5ecd0 50%, #e8d48b 65%, #C9A227 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
