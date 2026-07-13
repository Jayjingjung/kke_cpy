<template>
  <div class="sub-node-col">
    <div class="vline-sm"></div>
    <div class="org-node node-sm">
      <span class="n-lo">{{ node[`name_${locale}`] || node.name_en }}</span>
      <span class="n-en">{{ node.name_en }}</span>
    </div>
    <template v-if="children.length">
      <OrgSubNode v-for="child in children" :key="child.id"
        :node="child" :all-nodes="allNodes" :locale="locale" />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  node: any;
  allNodes: any[];
  locale: string;
}>();

const children = computed(() =>
  props.allNodes.filter((n) => n.parent_id === props.node.id).sort((a, b) => a.order - b.order)
);
</script>

<style scoped>
.sub-node-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vline-sm {
  width: 2px;
  height: 18px;
  background: #C9A227;
  margin: 0 auto;
}

.org-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.org-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(201, 162, 39, 0.4);
}

.node-sm {
  background: linear-gradient(180deg, #0d1052 0%, #080b45 50%, #06093d 100%);
  color: white;
  padding: 10px 10px;
  border-radius: 20px;
  min-width: 115px;
  max-width: 145px;
  border: 1.5px solid #C9A227;
  box-shadow: 0 2px 8px rgba(4, 6, 54, 0.3);
}

.n-lo {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  line-height: 1.4;
}

.n-en {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  opacity: 0.7;
  font-style: italic;
  margin-top: 2px;
  color: #C9A227;
}
</style>
