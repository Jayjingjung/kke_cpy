<template>
  <div>
    <!-- Banner (ແດງ→ທອງ→ດຳອ່ອນ) -->
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold" v-if="exec">
          {{ getL(exec, 'name') }}
        </h1>
        <h1 class="text-4xl md:text-5xl font-heading font-bold" v-else>
          {{ $t('common.loading') }}
        </h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-16 bg-gray-50 min-h-[600px]">
      <div class="container mx-auto px-4 max-w-5xl">
        <!-- Back Button -->
        <div class="mb-8">
          <NuxtLink :to="localePath('/about/board')" class="inline-flex items-center gap-2 text-primary hover:text-gold-dark font-semibold transition-colors duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            {{ locale === 'lo' ? 'ກັບຄືນຫາຄະນະຜູ້ບໍລິຫານ' : locale === 'zh' ? '返回董事会' : 'Back to Board' }}
          </NuxtLink>
        </div>

        <div v-if="exec" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            <!-- Photo Column -->
            <div class="md:col-span-4 flex flex-col items-center">
              <div class="w-full max-w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-md bg-gray-100 border border-gray-200">
                <img v-if="exec.photo_url" :src="`${apiBase}${exec.photo_url}`" :alt="getL(exec, 'name')" class="w-full h-full object-cover">
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-24 h-24 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Profile Info & Bio Column -->
            <div class="md:col-span-8 space-y-6">
              <div>
                <h2 class="text-3xl font-bold text-dark font-heading">{{ getL(exec, 'name') }}</h2>
                <p class="text-gold-dark text-lg font-semibold mt-1">{{ getL(exec, 'position') }}</p>
                <div class="w-16 h-1 bg-gold-dark mt-4"></div>
              </div>

              <!-- Biography -->
              <div class="space-y-4">
                <h3 class="text-lg font-bold text-dark font-heading">
                  {{ locale === 'lo' ? 'ປະຫວັດຫຍໍ້ / ປະຫວັດການເຮັດວຽກ' : locale === 'zh' ? '个人履历 / 简介' : 'Biography & Profile' }}
                </h3>
                
                <div v-if="hasBio(exec)" class="prose max-w-none text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {{ getL(exec, 'bio') }}
                </div>
                <div v-else class="text-gray-400 italic">
                  {{ locale === 'lo' ? 'ບໍ່ມີຂໍ້ມູນປະຫວັດຫຍໍ້.' : locale === 'zh' ? '暂无履历信息。' : 'No biography available.' }}
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Loading / Not Found State -->
        <div v-else-if="loading" class="text-center py-24 text-gray-400">
          <svg class="animate-spin h-10 w-10 mx-auto text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ $t('common.loading') }}
        </div>

        <div v-else class="bg-white rounded-2xl shadow-md p-12 text-center text-gray-500">
          <p class="text-lg mb-4">{{ locale === 'lo' ? 'ບໍ່ພົບຂໍ້ມູນຜູ້ບໍລິຫານ.' : locale === 'zh' ? '找不到该人员的信息。' : 'Executive profile not found.' }}</p>
          <NuxtLink :to="localePath('/about/board')" class="btn-gold inline-block">{{ $t('common.back') }}</NuxtLink>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const { get, base: apiBase } = useApi();

const exec = ref<any>(null);
const loading = ref(true);

function getL(obj: any, field: string) {
  if (!obj) return '';
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

function hasBio(obj: any) {
  if (!obj) return false;
  const bio = getL(obj, 'bio');
  return bio && bio.trim().length > 0;
}

// SEO Metadata
useHead(() => ({
  title: exec.value ? `${getL(exec.value, 'name')} - KHOUNKHAM ENERGY` : 'Executive Profile - KHOUNKHAM ENERGY',
  meta: [
    {
      name: 'description',
      content: exec.value 
        ? `${getL(exec.value, 'name')} - ${getL(exec.value, 'position')} at KHOUNKHAM ENERGY.` 
        : 'Executive profile biography and details.'
    }
  ]
}));

onMounted(async () => {
  const id = route.params.id;
  try {
    exec.value = await get(`/executives/${id}`);
  } catch (err) {
    console.error('Failed to load executive profile:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.prose {
  line-height: 1.8;
}
</style>
