<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('gallery.title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-2 justify-center mb-8">
          <button v-for="cat in categories" :key="cat.value"
            @click="activeCategory = cat.value"
            :class="[activeCategory === cat.value ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700', 'px-4 py-2 rounded-full text-sm font-medium transition-colors']">
            {{ cat.label }}
          </button>
        </div>

        <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          <div v-for="img in filteredImages" :key="img.id"
            class="break-inside-avoid mb-4 rounded-lg overflow-hidden cursor-pointer group"
            @click="openLightbox(img)">
            <img :src="`${apiBase}${img.image_url}`" :alt="getLocalized(img, 'title')"
              class="w-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
            <div v-if="getLocalized(img, 'title')" class="bg-[#040636]/80 text-white text-sm p-2">
              {{ getLocalized(img, 'title') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxImage" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" @click="lightboxImage = null">
        <button class="absolute top-4 right-4 text-white text-3xl">&times;</button>
        <img :src="`${apiBase}${lightboxImage.image_url}`" :alt="getLocalized(lightboxImage, 'title')"
          class="max-w-[90vw] max-h-[90vh] object-contain" @click.stop>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const { get, base: apiBase } = useApi();

const images = ref<any[]>([]);
const activeCategory = ref('');
const lightboxImage = ref<any>(null);

const categories = computed(() => {
  const cats = [...new Set(images.value.map((i) => i.category).filter(Boolean))];
  return [{ value: '', label: t('gallery.all') }, ...cats.map((c) => ({ value: c, label: c }))];
});

const filteredImages = computed(() =>
  activeCategory.value ? images.value.filter((i) => i.category === activeCategory.value) : images.value
);

function getLocalized(obj: any, field: string) {
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

function openLightbox(img: any) { lightboxImage.value = img; }

onMounted(async () => {
  try { images.value = await get('/gallery'); } catch {}
});
</script>
