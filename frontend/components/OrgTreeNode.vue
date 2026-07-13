<template>
  <div class="flex flex-col items-center">
    <div v-for="node in nodes" :key="node.id" class="flex flex-col items-center mb-4">
      <div class="bg-primary text-white px-6 py-3 rounded-lg shadow-md text-center min-w-[150px]">
        <span class="font-semibold">{{ node[`name_${locale}`] || node.name_en }}</span>
      </div>
      <div v-if="getChildren(node.id).length" class="mt-2">
        <div class="w-px h-6 bg-gold mx-auto"></div>
        <div class="flex gap-4 items-start">
          <div v-for="child in getChildren(node.id)" :key="child.id" class="flex flex-col items-center">
            <div class="w-px h-4 bg-gold"></div>
            <div class="bg-[#040636] text-white px-4 py-2 rounded shadow text-sm text-center min-w-[120px]">
              {{ child[`name_${locale}`] || child.name_en }}
            </div>
            <OrgTreeNode v-if="getChildren(child.id).length"
              :nodes="getChildren(child.id)" :all-nodes="allNodes" :locale="locale" class="mt-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nodes: any[];
  allNodes: any[];
  locale: string;
}>();

function getChildren(parentId: number) {
  return props.allNodes.filter((n) => n.parent_id === parentId).sort((a, b) => a.order - b.order);
}
</script>
