<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ getLocalized(service, 'title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section v-if="service" class="py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <div v-if="service.cover_image" class="mb-8 rounded-lg overflow-hidden">
          <img :src="`${apiBase}${service.cover_image}`" :alt="getLocalized(service, 'title')" class="w-full h-64 object-cover">
        </div>

        <div class="prose prose-lg max-w-none text-gray-700">
          <p>{{ getLocalized(service, 'description') }}</p>
        </div>

        <!-- Branches (for gas stations) -->
        <div v-if="service.branches && service.branches.length" class="mt-12">
          <h2 class="text-2xl font-heading font-bold mb-6">{{ $t('services.branches') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="branch in service.branches" :key="branch.id"
              class="bg-white border rounded-lg p-6 shadow-sm">
              <h3 class="font-semibold text-lg mb-2">{{ getLocalized(branch, 'name') }}</h3>
              <p class="text-sm text-gray-600 mb-1">📍 {{ getLocalized(branch, 'address') }}</p>
              <p v-if="branch.phone" class="text-sm text-gray-600">📞 {{ branch.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="py-32 text-center text-gray-400">Loading...</div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const { get, base: apiBase } = useApi();

const service = ref<any>(null);

function getLocalized(obj: any, field: string) {
  if (!obj) return '';
  return obj[`${field}_${locale.value}`] || obj[`${field}_en`] || '';
}

onMounted(async () => {
  try { service.value = await get(`/services/${route.params.slug}`); } catch {}
});

watch(() => route.params.slug, async (slug) => {
  if (slug) {
    try { service.value = await get(`/services/${slug}`); } catch {}
  }
});
</script>
