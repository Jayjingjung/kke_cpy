<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('projects.title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Filter -->
        <div class="flex flex-wrap gap-2 justify-center mb-8">
          <button v-for="cat in categories" :key="cat.value"
            @click="activeCategory = cat.value"
            :class="[activeCategory === cat.value ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-full text-sm font-medium transition-colors']">
            {{ cat.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="project in filteredProjects" :key="project.id"
            :to="localePath(`/projects/${project.slug}`)"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
            <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img v-if="project.cover_image" :src="`${apiBase}${project.cover_image}`"
                :alt="getLocalized(project, 'title')" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
              <span v-else class="text-4xl text-gray-400">📋</span>
            </div>
            <div class="p-4">
              <div class="flex gap-2 mb-2">
                <span class="text-xs bg-gold/10 text-gold-dark px-2 py-1 rounded">{{ project.category }}</span>
                <span class="text-xs bg-gold/10 text-gold-dark px-2 py-1 rounded">{{ project.status }}</span>
              </div>
              <h3 class="font-semibold text-lg group-hover:text-gold-dark transition-colors">{{ getLocalized(project, 'title') }}</h3>
              <p v-if="project.location" class="text-sm text-gray-500 mt-1">📍 {{ project.location }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const localePath = useLocalePath();
const { get, base: apiBase } = useApi();

const projects = ref<any[]>([]);
const activeCategory = ref('');

const categories = computed(() => {
  const cats = [...new Set(projects.value.map((p) => p.category).filter(Boolean))];
  return [{ value: '', label: t('projects.all') }, ...cats.map((c) => ({ value: c, label: c }))];
});

const filteredProjects = computed(() =>
  activeCategory.value ? projects.value.filter((p) => p.category === activeCategory.value) : projects.value
);

function getLocalized(obj: any, field: string) {
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

onMounted(async () => {
  try { projects.value = await get('/projects'); } catch {}
});
</script>
