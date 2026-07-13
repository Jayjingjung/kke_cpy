<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Org Structure Management</h1>
      <button @click="openForm()" class="btn-primary text-sm">+ Add Node</button>
    </div>

    <!-- Visual Tree Preview -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Preview</h2>
      <div class="overflow-x-auto">
        <OrgChart v-if="items.length" :nodes="items" locale="lo" />
        <p v-else class="text-gray-400 text-center py-8">No data</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="text-left px-4 py-3 font-medium text-gray-600">ID</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600">Name (LO)</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600">Name (EN)</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600">Parent</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600">Level</th>
            <th class="text-left px-4 py-3 font-medium text-gray-600">Order</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedItems" :key="item.id" class="border-b hover:bg-gray-50"
            :class="{ 'bg-red-50': item.level === 0, 'bg-orange-50': item.level === 1 }">
            <td class="px-4 py-3 text-gray-500">{{ item.id }}</td>
            <td class="px-4 py-3">
              <span :style="{ paddingLeft: item.level * 20 + 'px' }">
                <span v-if="item.level > 0" class="text-gray-400 mr-1">{{ '└'.repeat(1) }}</span>
                {{ item.name_lo }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ item.name_en }}</td>
            <td class="px-4 py-3 text-gray-500">{{ getParentName(item.parent_id) }}</td>
            <td class="px-4 py-3">
              <span :class="levelBadge(item.level)">L{{ item.level }}</span>
            </td>
            <td class="px-4 py-3">{{ item.order }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="openForm(item)" class="text-blue-600 hover:underline text-xs">Edit</button>
              <button @click="handleDelete(item.id)" class="text-red-600 hover:underline text-xs">Delete</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td colspan="7" class="px-4 py-8 text-center text-gray-400">No data</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" @click.self="showForm = false">
        <div class="bg-white rounded-lg p-6 w-full max-w-lg">
          <h2 class="text-xl font-bold mb-4">{{ editing ? 'Edit' : 'Add' }} Node</h2>
          <form @submit.prevent="handleSave" class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium mb-1">Name (LO)</label>
                <input v-model="form.name_lo" class="input" required>
              </div>
              <div>
                <label class="block text-xs font-medium mb-1">Name (EN)</label>
                <input v-model="form.name_en" class="input" required>
              </div>
              <div>
                <label class="block text-xs font-medium mb-1">Name (ZH)</label>
                <input v-model="form.name_zh" class="input" required>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium mb-1">Parent Node</label>
                <select v-model="form.parent_id" class="input">
                  <option :value="null">-- None (Root) --</option>
                  <option v-for="node in parentOptions" :key="node.id" :value="node.id">
                    {{ '—'.repeat(node.level) }} {{ node.name_lo }} ({{ node.name_en }})
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium mb-1">Level</label>
                <input v-model.number="form.level" type="number" class="input" min="0">
              </div>
              <div>
                <label class="block text-xs font-medium mb-1">Order</label>
                <input v-model.number="form.order" type="number" class="input" min="1">
              </div>
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
const form = reactive({
  name_lo: '', name_en: '', name_zh: '',
  parent_id: null as number | null,
  level: 0, order: 1,
});

const sortedItems = computed(() =>
  [...items.value].sort((a, b) => a.level - b.level || a.order - b.order)
);

const parentOptions = computed(() =>
  items.value
    .filter((n) => !editing.value || n.id !== editing.value)
    .sort((a, b) => a.level - b.level || a.order - b.order)
);

function getParentName(parentId: number | null) {
  if (!parentId) return '—';
  const p = items.value.find((n) => n.id === parentId);
  return p ? p.name_en : `#${parentId}`;
}

function levelBadge(level: number) {
  const colors: Record<number, string> = {
    0: 'bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs',
    1: 'bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs',
    2: 'bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs',
    3: 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs',
  };
  return colors[level] || 'bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs';
}

async function load() {
  auth.loadFromStorage();
  try { items.value = await authGet('/admin/org-structure', auth.accessToken); } catch {}
}

function openForm(item?: any) {
  if (item) {
    editing.value = item.id;
    Object.assign(form, {
      name_lo: item.name_lo, name_en: item.name_en, name_zh: item.name_zh,
      parent_id: item.parent_id, level: item.level, order: item.order,
    });
  } else {
    editing.value = null;
    Object.assign(form, { name_lo: '', name_en: '', name_zh: '', parent_id: null, level: 0, order: 1 });
  }
  showForm.value = true;
}

async function handleSave() {
  const data = { ...form };
  if (editing.value) {
    await authPut(`/admin/org-structure/${editing.value}`, data, auth.accessToken);
  } else {
    await authPost('/admin/org-structure', data, auth.accessToken);
  }
  showForm.value = false;
  await load();
}

async function handleDelete(id: number) {
  if (confirm('Delete this node and its children?')) {
    await authDelete(`/admin/org-structure/${id}`, auth.accessToken);
    await load();
  }
}

onMounted(load);
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary;
}
</style>
