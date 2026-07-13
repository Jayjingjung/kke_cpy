<template>
  <section class="relative py-20 overflow-hidden">
    <div class="absolute inset-0 bg-dark"></div>
    <div class="absolute inset-0 opacity-5" style="background-image: url('/images/hero-factory.jpg'); background-size: cover;"></div>
    <div class="relative z-10 container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="text-5xl md:text-6xl font-heading font-bold text-gold mb-3">
            {{ stat.prefix }}{{ useCounter(stat.value) }}{{ stat.suffix }}
          </div>
          <div class="w-12 h-0.5 bg-primary mx-auto mb-3"></div>
          <div class="text-gray-400 text-sm uppercase tracking-wider">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const stats = [
  { value: 19, prefix: '', suffix: '+', label: t('home.stats_years') },
  { value: 5, prefix: '', suffix: '', label: t('home.stats_branches') },
  { value: 500, prefix: '', suffix: '+', label: t('home.stats_employees') },
  { value: 50, prefix: '', suffix: '+', label: t('home.stats_projects') },
];

function useCounter(target: number) {
  const count = ref(0);
  const started = ref(false);
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.value) {
        started.value = true;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          count.value += step;
          if (count.value >= target) {
            count.value = target;
            clearInterval(timer);
          }
        }, 16);
      }
    });
    const el = document.querySelector('.stat-item');
    if (el) observer.observe(el);
  });
  return computed(() => Math.floor(count.value));
}
</script>

<style scoped>
.stat-item {
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(201, 162, 39, 0.1);
  transition: all 0.3s;
}
.stat-item:hover {
  background: rgba(201, 162, 39, 0.05);
  border-color: rgba(201, 162, 39, 0.3);
  transform: translateY(-4px);
}
</style>
