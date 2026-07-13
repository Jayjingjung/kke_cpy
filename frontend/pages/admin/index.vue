<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-lg shadow p-6">
        <div class="text-3xl font-bold" :class="stat.color">{{ stat.count }}</div>
        <div class="text-gray-500 text-sm mt-1">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'admin', middleware: 'auth' });

const auth = useAuthStore();
const { authGet } = useApi();

const stats = ref([
  { label: 'Executives', count: 0, color: 'text-primary' },
  { label: 'Services', count: 0, color: 'text-gold' },
  { label: 'Projects', count: 0, color: 'text-blue-600' },
  { label: 'Messages', count: 0, color: 'text-green-600' },
]);

onMounted(async () => {
  auth.loadFromStorage();
  if (!auth.isLoggedIn) return;
  try {
    const [execs, services, projects, messages] = await Promise.all([
      authGet('/admin/executives', auth.accessToken),
      authGet('/admin/services', auth.accessToken),
      authGet('/admin/projects', auth.accessToken),
      authGet('/admin/contact-messages', auth.accessToken),
    ]);
    stats.value[0].count = execs.length;
    stats.value[1].count = services.length;
    stats.value[2].count = projects.length;
    stats.value[3].count = messages.length;
  } catch {}
});
</script>
