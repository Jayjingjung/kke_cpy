<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Contact Messages</h1>
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-4 py-3">Name</th>
            <th class="text-left px-4 py-3">Email</th>
            <th class="text-left px-4 py-3">Phone</th>
            <th class="text-left px-4 py-3">Message</th>
            <th class="text-left px-4 py-3">Status</th>
            <th class="text-left px-4 py-3">Date</th>
            <th class="text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in items" :key="msg.id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3">{{ msg.name }}</td>
            <td class="px-4 py-3">{{ msg.email }}</td>
            <td class="px-4 py-3">{{ msg.phone }}</td>
            <td class="px-4 py-3 max-w-xs truncate">{{ msg.message }}</td>
            <td class="px-4 py-3">
              <span :class="msg.status === 'unread' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'" class="px-2 py-1 rounded text-xs">{{ msg.status }}</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ new Date(msg.created_at).toLocaleDateString() }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button v-if="msg.status === 'unread'" @click="markRead(msg.id)" class="text-blue-600 hover:underline text-xs">Mark Read</button>
              <button @click="handleDelete(msg.id)" class="text-red-600 hover:underline text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
definePageMeta({ layout: 'admin', middleware: 'auth' });
const auth = useAuthStore();
const { authGet, authPut, authDelete } = useApi();
const items = ref<any[]>([]);
async function load() { auth.loadFromStorage(); try { items.value = await authGet('/admin/contact-messages', auth.accessToken); } catch {} }
async function markRead(id: number) { await authPut(`/admin/contact-messages/${id}`, { status: 'read' }, auth.accessToken); await load(); }
async function handleDelete(id: number) { if (confirm('Delete?')) { await authDelete(`/admin/contact-messages/${id}`, auth.accessToken); await load(); } }
onMounted(load);
</script>
