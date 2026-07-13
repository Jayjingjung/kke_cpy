<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-dark text-white px-6 py-4 flex items-center justify-between">
      <NuxtLink :to="localePath('/admin')" class="text-xl font-bold text-gold">KHOUNKHAM Admin</NuxtLink>
      <div class="flex items-center gap-4">
        <NuxtLink :to="localePath('/')" target="_blank" class="text-sm text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          {{ locale === 'lo' ? 'ເບິ່ງໜ້າເວັບໄຊ' : locale === 'zh' ? '查看网站' : 'View Website' }}
        </NuxtLink>
        <div class="h-4 w-[1px] bg-gray-600"></div>
        <span class="text-sm text-gray-300 font-semibold">{{ auth.user?.username }}</span>
        <button @click="handleLogout" class="text-sm text-red-400 hover:text-red-300">Logout</button>
      </div>
    </nav>
    <div class="flex">
      <aside class="w-56 bg-white shadow-md min-h-[calc(100vh-64px)]">
        <nav class="py-4">
          <NuxtLink v-for="item in menuItems" :key="item.to" :to="localePath(item.to)"
            class="block px-6 py-3 text-sm hover:bg-gray-50 hover:text-gold-dark transition-colors"
            active-class="text-gold-dark bg-amber-50 border-r-2 border-gold">
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>
      <div class="flex-1 p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: 'admin' });

const auth = useAuthStore();
const router = useRouter();
const localePath = useLocalePath();
const { locale } = useI18n();

const menuItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/executives', label: 'Executives' },
  { to: '/admin/org-structure', label: 'Org Structure' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/contacts', label: 'Contact Messages' },
  { to: '/admin/settings', label: 'Settings' },
];

function handleLogout() {
  auth.logout();
  router.push(localePath('/admin/login'));
}

onMounted(() => {
  auth.loadFromStorage();
  if (!auth.isLoggedIn) {
    router.push('/admin/login');
  }
});
</script>
