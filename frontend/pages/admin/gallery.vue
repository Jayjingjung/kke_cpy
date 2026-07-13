<template>
  <div>
    <AdminCrudTable title="Gallery" :columns="columns" :items="items"
      @create="openForm()" @edit="openForm($event)" @delete="handleDelete" />
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="showForm = false">
        <div class="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 class="text-xl font-bold mb-4">{{ editing ? 'Edit' : 'Add' }} Image</h2>
          <form @submit.prevent="handleSave" class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Title (LO)</label><input v-model="form.title_lo" class="input"></div>
              <div><label class="block text-xs font-medium mb-1">Title (EN)</label><input v-model="form.title_en" class="input"></div>
              <div><label class="block text-xs font-medium mb-1">Title (ZH)</label><input v-model="form.title_zh" class="input"></div>
            </div>
            <div><label class="block text-xs font-medium mb-1">Category</label><input v-model="form.category" class="input"></div>
            <div><label class="block text-xs font-medium mb-1">Image URL</label><input v-model="form.image_url" class="input" required></div>
            <div><label class="block text-xs font-medium mb-1">Project ID (optional)</label><input v-model.number="form.project_id" type="number" class="input"></div>
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
const form = reactive({ title_lo: '', title_en: '', title_zh: '', category: '', image_url: '', project_id: null as number | null });
const columns = [{ key: 'id', label: 'ID' }, { key: 'title_en', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'image_url', label: 'URL' }];
async function load() { auth.loadFromStorage(); try { items.value = await authGet('/admin/gallery', auth.accessToken); } catch {} }
function openForm(item?: any) { editing.value = item?.id || null; if (item) Object.assign(form, item); else Object.assign(form, { title_lo: '', title_en: '', title_zh: '', category: '', image_url: '', project_id: null }); showForm.value = true; }
async function handleSave() { if (editing.value) await authPut(`/admin/gallery/${editing.value}`, { ...form }, auth.accessToken); else await authPost('/admin/gallery', { ...form }, auth.accessToken); showForm.value = false; await load(); }
async function handleDelete(id: number) { if (confirm('Delete?')) { await authDelete(`/admin/gallery/${id}`, auth.accessToken); await load(); } }
onMounted(load);
</script>
<style scoped>.input { @apply w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary; }</style>
