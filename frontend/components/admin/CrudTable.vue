<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <button @click="$emit('create')" class="btn-primary text-sm">+ Add New</button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th v-for="col in columns" :key="col.key" class="text-left px-4 py-3 font-medium text-gray-600">{{ col.label }}</th>
            <th class="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b hover:bg-gray-50">
            <td v-for="col in columns" :key="col.key" class="px-4 py-3">
              <img v-if="col.type === 'image' && item[col.key]" :src="item[col.key]" class="w-10 h-10 object-cover rounded">
              <span v-else>{{ item[col.key] }}</span>
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="$emit('edit', item)" class="text-blue-600 hover:underline">Edit</button>
              <button @click="$emit('delete', item.id)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
          <tr v-if="!items.length">
            <td :colspan="columns.length + 1" class="px-4 py-8 text-center text-gray-400">No data</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  columns: Array<{ key: string; label: string; type?: string }>;
  items: any[];
}>();

defineEmits<{
  create: [];
  edit: [item: any];
  delete: [id: number];
}>();
</script>
