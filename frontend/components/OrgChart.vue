<template>
  <div class="org-chart-wrapper">
    <div class="org-chart">
      <!-- Level 0: Shareholders -->
      <div v-for="top in topNodes" :key="top.id" class="chart-column">
        <div class="org-node node-xl">
          <span class="n-lo">{{ getL(top, 'name') }}</span>
          <span class="n-en">{{ top.name_en }}</span>
        </div>
        <div class="vline"></div>

        <!-- Level 1: Board of Directors -->
        <div v-for="board in getChildren(top.id)" :key="board.id" class="chart-column">
          <div class="org-node node-lg">
            <span class="n-lo">{{ getL(board, 'name') }}</span>
            <span class="n-en">{{ board.name_en }}</span>
          </div>
          <div class="vline"></div>

          <!-- Level 2: Committees row -->
          <div class="committees-section" v-if="getCommittees(board.id).length">
            <div class="hline-bar"></div>
            <div class="committees-row">
              <div v-for="comm in getCommittees(board.id)" :key="comm.id" class="comm-item">
                <div class="vline-sm"></div>
                <div class="org-node node-md">
                  <span class="n-lo">{{ getL(comm, 'name') }}</span>
                  <span class="n-en">{{ comm.name_en }}</span>
                </div>
                <!-- Sub-nodes under committee (recursive) -->
                <div v-for="sub in getChildren(comm.id)" :key="sub.id" class="sub-col">
                  <div class="vline-sm"></div>
                  <div class="org-node node-sm">
                    <span class="n-lo">{{ getL(sub, 'name') }}</span>
                    <span class="n-en">{{ sub.name_en }}</span>
                  </div>
                  <!-- Level deeper -->
                  <div v-for="sub2 in getChildren(sub.id)" :key="sub2.id" class="sub-col">
                    <div class="vline-sm"></div>
                    <div class="org-node node-sm">
                      <span class="n-lo">{{ getL(sub2, 'name') }}</span>
                      <span class="n-en">{{ sub2.name_en }}</span>
                    </div>
                    <div v-for="sub3 in getChildren(sub2.id)" :key="sub3.id" class="sub-col">
                      <div class="vline-sm"></div>
                      <div class="org-node node-sm">
                        <span class="n-lo">{{ getL(sub3, 'name') }}</span>
                        <span class="n-en">{{ sub3.name_en }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Managing Director -->
          <div v-if="getMD(board.id)" class="chart-column">
            <div class="vline"></div>
            <div class="org-node node-lg">
              <span class="n-lo">{{ getL(getMD(board.id)!, 'name') }}</span>
              <span class="n-en">{{ getMD(board.id)!.name_en }}</span>
            </div>
            <div class="vline"></div>

            <!-- Level 3: Departments row -->
            <div class="departments-section" v-if="getChildren(getMD(board.id)!.id).length">
              <div class="hline-bar"></div>
              <div class="departments-row">
                <div v-for="dept in getChildren(getMD(board.id)!.id)" :key="dept.id" class="dept-item">
                  <div class="vline-sm"></div>
                  <div class="org-node node-sm">
                    <span class="n-lo">{{ getL(dept, 'name') }}</span>
                    <span class="n-en">{{ dept.name_en }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nodes: any[];
  locale: string;
}>();

function getL(obj: any, field: string) {
  return obj[`${field}_${props.locale}`] || obj[`${field}_en`] || '';
}

const topNodes = computed(() =>
  props.nodes.filter((n) => !n.parent_id).sort((a, b) => a.order - b.order)
);

function getChildren(parentId: number) {
  return props.nodes.filter((n) => n.parent_id === parentId).sort((a, b) => a.order - b.order);
}

function getCommittees(boardId: number) {
  return getChildren(boardId).filter((n) => n.name_en !== 'Managing Director');
}

function getMD(boardId: number) {
  return getChildren(boardId).find((n) => n.name_en === 'Managing Director') || null;
}
</script>

<style scoped>
.org-chart-wrapper {
  background: linear-gradient(180deg, #1a0a0a 0%, #2a0e0e 30%, #1f0808 100%);
  padding: 50px 30px;
  border-radius: 12px;
  overflow-x: auto;
  width: 100%;
  border: 2px solid #C9A227;
  position: relative;
}

.org-chart-wrapper::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, #C9A227, transparent);
}

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1100px;
  width: 100%;
}

.chart-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ===== Nodes ===== */
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

.node-xl {
  background: linear-gradient(180deg, #E2231A 0%, #B91C14 50%, #8B1510 100%);
  color: white;
  padding: 20px 60px;
  border-radius: 40px;
  min-width: 260px;
  border: 3px solid #C9A227;
  box-shadow: 0 4px 15px rgba(226, 35, 26, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.node-lg {
  background: linear-gradient(180deg, #d42019 0%, #a51812 50%, #7a110d 100%);
  color: white;
  padding: 16px 45px;
  border-radius: 35px;
  min-width: 230px;
  border: 2px solid #C9A227;
  box-shadow: 0 3px 12px rgba(226, 35, 26, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.node-md {
  background: linear-gradient(180deg, #0a0d4a 0%, #06093d 50%, #040636 100%);
  color: white;
  padding: 10px 12px;
  border-radius: 22px;
  min-width: 130px;
  max-width: 175px;
  border: 2px solid #C9A227;
  box-shadow: 0 2px 8px rgba(4, 6, 54, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
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

/* Text */
.n-lo {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  line-height: 1.4;
}

.n-en {
  font-family: 'Inter', sans-serif;
  opacity: 0.7;
  font-style: italic;
  margin-top: 2px;
  color: #C9A227;
}

.node-xl .n-lo { font-size: 1.4rem; }
.node-xl .n-en { font-size: 0.9rem; opacity: 0.9; }
.node-lg .n-lo { font-size: 1.1rem; }
.node-lg .n-en { font-size: 0.8rem; }
.node-md .n-lo { font-size: 0.75rem; }
.node-md .n-en { font-size: 0.6rem; }
.node-sm .n-lo { font-size: 0.7rem; }
.node-sm .n-en { font-size: 0.55rem; }

/* ===== Lines ===== */
.vline {
  width: 2px;
  height: 30px;
  background: linear-gradient(180deg, #C9A227, #a68520);
}

.vline-sm {
  width: 2px;
  height: 18px;
  background: #C9A227;
  margin: 0 auto;
}

/* Committees */
.committees-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hline-bar {
  height: 2px;
  background: linear-gradient(90deg, transparent 2%, #C9A227 10%, #C9A227 90%, transparent 98%);
  width: 88%;
  max-width: 1050px;
}

.committees-row {
  display: flex;
  justify-content: space-between;
  width: 88%;
  max-width: 1050px;
}

.comm-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

/* Departments */
.departments-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.departments-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 95%;
  max-width: 1100px;
}

.dept-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.sub-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
