<template>
  <div>
    <AdminCrudTable title="Executives" :columns="columns" :items="items"
      @create="openForm()" @edit="openForm($event)" @delete="handleDelete" />

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="showForm = false">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">{{ editing ? 'Edit' : 'Add' }} Executive</h2>
          <form @submit.prevent="handleSave" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Name (Lao)</label><input v-model="form.name_lo" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Name (EN)</label><input v-model="form.name_en" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Name (ZH)</label><input v-model="form.name_zh" class="input" required></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Position (Lao)</label><input v-model="form.position_lo" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Position (EN)</label><input v-model="form.position_en" class="input" required></div>
              <div><label class="block text-xs font-medium mb-1">Position (ZH)</label><input v-model="form.position_zh" class="input" required></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label class="block text-xs font-medium mb-1">Bio (Lao)</label><textarea v-model="form.bio_lo" class="input" rows="3"></textarea></div>
              <div><label class="block text-xs font-medium mb-1">Bio (EN)</label><textarea v-model="form.bio_en" class="input" rows="3"></textarea></div>
              <div><label class="block text-xs font-medium mb-1">Bio (ZH)</label><textarea v-model="form.bio_zh" class="input" rows="3"></textarea></div>
            </div>
            <div><label class="block text-xs font-medium mb-1">Order</label><input v-model.number="form.order" type="number" class="input w-24"></div>
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
const form = reactive({ name_lo: '', name_en: '', name_zh: '', position_lo: '', position_en: '', position_zh: '', bio_lo: '', bio_en: '', bio_zh: '', order: 0 });

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name_en', label: 'Name' },
  { key: 'position_en', label: 'Position' },
  { key: 'order', label: 'Order' },
];

async function load() {
  auth.loadFromStorage();
  try { items.value = await authGet('/admin/executives', auth.accessToken); } catch {}
}

function openForm(item?: any) {
  if (item) {
    editing.value = item.id;
    Object.assign(form, item);
  } else {
    editing.value = null;
    Object.assign(form, { name_lo: '', name_en: '', name_zh: '', position_lo: '', position_en: '', position_zh: '', bio_lo: '', bio_en: '', bio_zh: '', order: 0 });
  }
  showForm.value = true;
}

async function handleSave() {
  if (editing.value) {
    await authPut(`/admin/executives/${editing.value}`, { ...form }, auth.accessToken);
  } else {
    await authPost('/admin/executives', { ...form }, auth.accessToken);
  }
  showForm.value = false;
  await load();
}

async function handleDelete(id: number) {
  if (confirm('Delete this executive?')) {
    await authDelete(`/admin/executives/${id}`, auth.accessToken);
    await load();
  }
}

onMounted(load);
</script>

<style scoped>
.input { @apply w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary; }
</style>
