<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="section-title">{{ $t('home.our_services') }}</h2>
      <div class="gold-divider"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <NuxtLink v-for="service in services" :key="service.slug"
          :to="localePath(`/services/${service.slug}`)"
          class="group bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-xl hover:border-primary transition-all duration-300">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
            <span class="text-2xl">{{ service.icon }}</span>
          </div>
          <h3 class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{{ service.title }}</h3>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const services = [
  { slug: 'mining', icon: '⛏️', title: t('nav.mining') },
  { slug: 'plywood', icon: '🏭', title: t('nav.plywood') },
  { slug: 'gas-stations', icon: '⛽', title: t('nav.gas_stations') },
  { slug: 'electrical', icon: '⚡', title: t('nav.electrical') },
  { slug: 'logistics', icon: '🚛', title: t('nav.logistics') },
];
</script>
