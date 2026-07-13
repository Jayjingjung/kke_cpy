<template>
  <div>
    <AdminCrudTable title="Services" :columns="columns" :items="items"
      @create="openForm()" @edit="openForm($event)" @delete="handleDelete" />
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="showForm = false">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">{{ editing ? 'Edit' : 'Add' }} Service</h2>
          <form @submit.prevent="handleSave" class="space-y-4">
            <div><label class="block text-xs font-medium mb-1">Slug</label><input v-model="form.slug" class="input" required></div>
            <div class="grid grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Title (LO)</label><input v-model="form.title_lo" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Title (EN)</label><input v-model="form.title_en" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Title (ZH)</label><input v-model="form.title_zh" class="input" required></div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Description (LO)</label><textarea v-model="form.description_lo" class="input" rows="4"></textarea></div>
              <div><label class="block text-xs font-medium mb-1">Description (EN)</label><textarea v-model="form.description_en" class="input" rows="4"></textarea></div>
              <div><label class="block text-xs font-medium mb-1">Description (ZH)</label><textarea v-model="form.description_zh" class="input" rows="4"></textarea></div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div><label class="block text-xs font-medium mb-1">Icon</label><input v-model="form.icon" class="input"></div>
              <div><label class="block text-xs font-medium mb-1">Order</label><input v-model.number="form.order" type="number" class="input"></div>
            </div>
            <div class="flex gap-2 justify-end">
              <button type="button" @click="showForm = false" class="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" class="btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
definePageMeta({ layout: 'admin', middleware: 'auth' });
const auth = useAuthStore();
const { authGet, authPost, authPut, authDelete } = useApi();
const items = ref<any[]>([]);
const showForm = ref(false);
const editing = ref<number | null>(null);
const form = reactive({ slug: '', title_lo: '', title_en: '', title_zh: '', description_lo: '', description_en: '', description_zh: '', icon: '', order: 0 });
const columns = [{ key: 'id', label: 'ID' }, { key: 'slug', label: 'Slug' }, { key: 'title_en', label: 'Title' }, { key: 'order', label: 'Order' }];
async function load() { auth.loadFromStorage(); try { items.value = await authGet('/admin/services', auth.accessToken); } catch {} }
function openForm(item?: any) {
  editing.value = item ? item.id : null;
  if (item) Object.assign(form, item); else Object.assign(form, { slug: '', title_lo: '', title_en: '', title_zh: '', description_lo: '', description_en: '', description_zh: '', icon: '', order: 0 });
  showForm.value = true;
}
async function handleSave() {
  if (editing.value) await authPut(`/admin/services/${editing.value}`, { ...form }, auth.accessToken);
  else await authPost('/admin/services', { ...form }, auth.accessToken);
  showForm.value = false; await load();
}
async function handleDelete(id: number) { if (confirm('Delete?')) { await authDelete(`/admin/services/${id}`, auth.accessToken); await load(); } }
onMounted(load);
</script>
<style scoped>.input { @apply w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary; }</style>
