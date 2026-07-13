<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSave" class="space-y-6">
        <div v-for="item in items" :key="item.id" class="border-b pb-4">
          <label class="block text-sm font-bold text-gray-700 mb-2">{{ item.key }}</label>
          <div class="grid grid-cols-3 gap-4">
            <div><label class="block text-xs text-gray-500 mb-1">Lao</label><input v-model="item.value_lo" class="input"></div>
            <div><label class="block text-xs text-gray-500 mb-1">English</label><input v-model="item.value_en" class="input"></div>
            <div><label class="block text-xs text-gray-500 mb-1">Chinese</label><input v-model="item.value_zh" class="input"></div>
          </div>
        </div>
        <button type="submit" class="btn-primary">Save All</button>
        <span v-if="saved" class="text-green-600 ml-4">Saved!</span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
definePageMeta({ layout: 'admin', middleware: 'auth' });
const auth = useAuthStore();
const { authGet, authPut } = useApi();
const items = ref<any[]>([]);
const saved = ref(false);
async function load() { auth.loadFromStorage(); try { items.value = await authGet('/admin/settings', auth.accessToken); } catch {} }
async function handleSave() {
  for (const item of items.value) {
    await authPut(`/admin/settings/${item.id}`, { value_lo: item.value_lo, value_en: item.value_en, value_zh: item.value_zh }, auth.accessToken);
  }
  saved.value = true;
  setTimeout(() => { saved.value = false; }, 3000);
}
onMounted(load);
</script>
<style scoped>.input { @apply w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary; }</style>
