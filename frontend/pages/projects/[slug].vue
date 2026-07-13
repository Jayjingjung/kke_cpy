<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ getLocalized(project, 'title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section v-if="project" class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="flex flex-wrap gap-4 mb-8">
          <span class="bg-primary/10 text-primary px-3 py-1 rounded">{{ project.category }}</span>
          <span class="bg-gold/10 text-gold-dark px-3 py-1 rounded">{{ project.status }}</span>
          <span v-if="project.location" class="text-gray-600">📍 {{ project.location }}</span>
          <span v-if="project.start_date" class="text-gray-600">📅 {{ project.start_date }} — {{ project.end_date || 'Present' }}</span>
        </div>

        <div v-if="project.cover_image" class="mb-8 rounded-lg overflow-hidden">
          <img :src="`${apiBase}${project.cover_image}`" :alt="getLocalized(project, 'title')" class="w-full h-80 object-cover">
        </div>

        <div class="prose prose-lg max-w-none text-gray-700 mb-12">
          <p>{{ getLocalized(project, 'description') }}</p>
        </div>

        <div v-if="project.gallery && project.gallery.length">
          <h2 class="text-2xl font-heading font-bold mb-6">{{ $t('gallery.title') }}</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="img in project.gallery" :key="img.id" class="rounded-lg overflow-hidden cursor-pointer">
              <img :src="`${apiBase}${img.image_url}`" :alt="getLocalized(img, 'title')" class="w-full h-40 object-cover hover:scale-105 transition-transform">
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const { get, base: apiBase } = useApi();

const project = ref<any>(null);

function getLocalized(obj: any, field: string) {
  if (!obj) return '';
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

onMounted(async () => {
  try { project.value = await get(`/projects/${route.params.slug}`); } catch {}
});
</script>
