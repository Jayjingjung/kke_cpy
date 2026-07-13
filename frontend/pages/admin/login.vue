<template>
  <div class="min-h-screen bg-[#040636] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <img src="/images/logo.png" alt="KHOUNKHAM ENERGY" class="h-16 w-auto mx-auto mb-4" />
        <h1 class="text-2xl font-heading font-bold">Admin Login</h1>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input v-model="username" type="text" required class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary">
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button type="submit" :disabled="loading" class="btn-primary w-full disabled:opacity-50">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({ layout: false });

const auth = useAuthStore();
const router = useRouter();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true;
  error.value = '';
  try {
    const data = await $fetch<any>(`${config.public.apiBase}/api/v1/auth/login`, {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });
    auth.setTokens(data.accessToken, data.refreshToken, data.user);
    router.push(localePath('/admin'));
  } catch {
    error.value = 'Invalid credentials';
  }
  loading.value = false;
}
</script>
