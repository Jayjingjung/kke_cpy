<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('about.org_title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="max-w-[1400px] mx-auto px-4">
        <OrgChart v-if="orgNodes.length" :nodes="orgNodes" :locale="locale" />
        <div v-else class="text-center text-gray-400 py-20">{{ $t('common.loading') }}</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const { get } = useApi();

const orgNodes = ref<any[]>([]);

onMounted(async () => {
  try { orgNodes.value = await get('/org-structure'); } catch {}
});
</script>
