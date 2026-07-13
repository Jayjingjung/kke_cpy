<template>
  <div>
    <!-- Banner -->
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('about.board_title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="flex overflow-x-auto">
          <button v-for="tab in tabs" :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'tab-btn whitespace-nowrap',
              activeTab === tab.key ? 'tab-active' : 'tab-inactive'
            ]">
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-gray-50 min-h-[500px]">
      <div class="container mx-auto px-4">
        <div v-if="filteredExecutives.length">
          <!-- Chairman / Director (first person - centered large) -->
          <div v-if="chairman" class="flex justify-center mb-12">
            <NuxtLink :to="localePath('/about/executive/' + chairman.id)" class="profile-card profile-card-lg block text-left">
              <div class="profile-photo-lg">
                <img v-if="chairman.photo_url" :src="`${apiBase}${chairman.photo_url}`" :alt="getL(chairman, 'name')" class="w-full h-full object-cover">
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
              </div>
              <div class="profile-info">
                <h3 class="text-xl font-bold text-dark">{{ getL(chairman, 'name') }}</h3>
                <p class="text-gold-dark font-medium">{{ getL(chairman, 'position') }}</p>
                <span class="inline-block mt-3 text-xs font-semibold text-gold-dark hover:underline">
                  {{ locale === 'lo' ? 'ເບິ່ງປະຫວັດ' : locale === 'zh' ? '查看简历' : 'View Profile' }} &rarr;
                </span>
              </div>
            </NuxtLink>
          </div>

          <!-- Members grid -->
          <div v-if="members.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            <NuxtLink v-for="exec in members" :key="exec.id" :to="localePath('/about/executive/' + exec.id)" class="profile-card block text-left">
              <div class="profile-photo">
                <img v-if="exec.photo_url" :src="`${apiBase}${exec.photo_url}`" :alt="getL(exec, 'name')" class="w-full h-full object-cover">
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
              </div>
              <div class="profile-info">
                <h3 class="text-lg font-bold text-dark">{{ getL(exec, 'name') }}</h3>
                <p class="text-primary text-sm font-medium">{{ getL(exec, 'position') }}</p>
                <span class="inline-block mt-3 text-xs font-semibold text-primary hover:underline">
                  {{ locale === 'lo' ? 'ເບິ່ງປະຫວັດ' : locale === 'zh' ? '查看简历' : 'View Profile' }} &rarr;
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20 text-gray-400">
          {{ $t('common.no_data') }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { get, base: apiBase } = useApi();

const executives = ref<any[]>([]);
const activeTab = ref('board');

const tabs = computed(() => [
  { key: 'board', label: t('nav.board_directors') || 'ສະພາບໍລິຫານ' },
  { key: 'committee', label: t('nav.management_committee') || 'ຄະນະກຳມະການບໍລິຫານງານ' },
  { key: 'directors', label: t('nav.executive_directors') || 'ຄະນະອຳນວຍການ' },
  { key: 'advisors', label: t('nav.advisors') || 'ທີ່ປຶກສາ' },
]);

const filteredExecutives = computed(() => {
  const tabFilter = activeTab.value;
  return executives.value.filter((e: any) => {
    if (!e.category) return tabFilter === 'board';
    return e.category === tabFilter;
  }).sort((a: any, b: any) => a.order - b.order);
});

const chairman = computed(() => filteredExecutives.value[0] || null);
const members = computed(() => filteredExecutives.value.slice(1));

function getL(obj: any, field: string) {
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

onMounted(async () => {
  try { executives.value = await get('/executives'); } catch {}
});
</script>

<style scoped>
.tab-btn {
  padding: 16px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  font-family: 'Phetsarath', sans-serif;
}

.tab-active {
  color: #C9A227;
  border-bottom-color: #C9A227;
}

.tab-inactive {
  color: #666;
}
.tab-inactive:hover {
  color: #C9A227;
  background: rgba(201, 162, 39, 0.05);
}

.profile-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 100%;
  max-width: 280px;
  transition: all 0.3s;
}
.profile-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.profile-card-lg {
  max-width: 350px;
}

.profile-photo {
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #f3f3f3;
}
.profile-photo img {
  transition: transform 0.5s;
}
.profile-card:hover .profile-photo img {
  transform: scale(1.05);
}

.profile-photo-lg {
  width: 100%;
  height: 360px;
  overflow: hidden;
  background: #f3f3f3;
}
.profile-photo-lg img {
  transition: transform 0.5s;
}
.profile-card-lg:hover .profile-photo-lg img {
  transform: scale(1.05);
}

.profile-info {
  padding: 20px 16px;
}
</style>
