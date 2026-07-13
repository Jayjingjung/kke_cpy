<template>
  <div class="laos-map-container">
    <svg viewBox="0 0 500 800" xmlns="http://www.w3.org/2000/svg" class="laos-map">
      <defs>
        <linearGradient id="provinceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2a6fa8" />
          <stop offset="100%" style="stop-color:#1a4f7a" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.3" />
        </filter>
      </defs>

      <!-- Provinces -->
      <g filter="url(#shadow)">
        <!-- ຜົ້ງສາລີ Phongsali -->
        <path d="M180,30 L210,20 L240,35 L250,60 L235,85 L210,90 L185,80 L170,55 Z"
          :class="['province', { active: activeProvince === 'phongsali' }]"
          @mouseenter="activeProvince='phongsali'" @mouseleave="activeProvince=''"/>
        <text x="205" y="58" class="prov-label">ຜົ້ງສາລີ</text>

        <!-- ຫຼວງນ້ຳທາ Luang Namtha -->
        <path d="M130,50 L170,55 L185,80 L175,105 L150,110 L125,95 L120,70 Z"
          :class="['province', { active: activeProvince === 'luangnamtha' }]"
          @mouseenter="activeProvince='luangnamtha'" @mouseleave="activeProvince=''"/>
        <text x="148" y="85" class="prov-label">ຫຼວງນ້ຳທາ</text>

        <!-- ບໍ່ແກ້ວ Bokeo -->
        <path d="M90,75 L120,70 L125,95 L115,115 L90,115 L80,95 Z"
          :class="['province', { active: activeProvince === 'bokeo' }]"
          @mouseenter="activeProvince='bokeo'" @mouseleave="activeProvince=''"/>
        <text x="100" y="98" class="prov-label">ບໍ່ແກ້ວ</text>

        <!-- ອຸດົມໄຊ Oudomxay -->
        <path d="M125,95 L150,110 L175,105 L190,120 L180,150 L150,155 L130,140 L115,115 Z"
          :class="['province', { active: activeProvince === 'oudomxay' }]"
          @mouseenter="activeProvince='oudomxay'" @mouseleave="activeProvince=''"/>
        <text x="148" y="130" class="prov-label">ອຸດົມໄຊ</text>

        <!-- ຫົວພັນ Houaphan -->
        <path d="M250,60 L290,55 L320,75 L330,110 L310,135 L275,130 L250,110 L235,85 Z"
          :class="['province', { active: activeProvince === 'houaphan' }]"
          @mouseenter="activeProvince='houaphan'" @mouseleave="activeProvince=''"/>
        <text x="280" y="100" class="prov-label">ຫົວພັນ</text>

        <!-- ຫຼວງພະບາງ Luang Prabang -->
        <path d="M150,155 L180,150 L210,90 L250,110 L275,130 L260,170 L230,190 L190,185 L160,170 Z"
          :class="['province', { active: activeProvince === 'luangprabang' }]"
          @mouseenter="activeProvince='luangprabang'" @mouseleave="activeProvince=''"/>
        <text x="210" y="155" class="prov-label">ຫຼວງພະບາງ</text>

        <!-- ໄຊຍະບູລີ Xaignabouli -->
        <path d="M80,95 L90,115 L115,115 L130,140 L150,155 L160,170 L140,200 L120,220 L95,210 L75,180 L65,140 L70,110 Z"
          :class="['province', { active: activeProvince === 'xaignabouli' }]"
          @mouseenter="activeProvince='xaignabouli'" @mouseleave="activeProvince=''"/>
        <text x="105" y="165" class="prov-label">ໄຊຍະບູລີ</text>

        <!-- ຊຽງຂວາງ Xiangkhouang -->
        <path d="M260,170 L310,135 L340,150 L345,185 L320,210 L280,205 L260,195 Z"
          :class="['province', { active: activeProvince === 'xiangkhouang' }]"
          @mouseenter="activeProvince='xiangkhouang'" @mouseleave="activeProvince=''"/>
        <text x="300" y="178" class="prov-label">ຊຽງຂວາງ</text>

        <!-- ວຽງຈັນ (ແຂວງ) Vientiane Province -->
        <path d="M160,170 L190,185 L230,190 L260,195 L250,230 L220,250 L185,245 L150,230 L120,220 L140,200 Z"
          :class="['province', { active: activeProvince === 'vientianeprov' }]"
          @mouseenter="activeProvince='vientianeprov'" @mouseleave="activeProvince=''"/>
        <text x="190" y="220" class="prov-label">ວຽງຈັນ</text>

        <!-- ນະຄອນຫຼວງ Vientiane Capital -->
        <path d="M150,230 L185,245 L195,270 L175,285 L145,275 L135,250 Z"
          :class="['province', { active: activeProvince === 'vientiane' }]"
          @mouseenter="activeProvince='vientiane'" @mouseleave="activeProvince=''"/>
        <text x="165" y="262" class="prov-label">ນ.ຫຼວງ</text>

        <!-- ບໍລິຄຳໄຊ Bolikhamxai -->
        <path d="M220,250 L280,205 L320,210 L350,240 L340,280 L300,300 L260,290 L230,275 L195,270 L185,245 Z"
          :class="['province', { active: activeProvince === 'bolikhamxai' }]"
          @mouseenter="activeProvince='bolikhamxai'" @mouseleave="activeProvince=''"/>
        <text x="275" y="260" class="prov-label">ບໍລິຄຳໄຊ</text>

        <!-- ຄຳມ່ວນ Khammouane -->
        <path d="M230,275 L260,290 L300,300 L340,280 L370,310 L360,360 L320,380 L270,370 L240,340 L220,310 Z"
          :class="['province', { active: activeProvince === 'khammouane' }]"
          @mouseenter="activeProvince='khammouane'" @mouseleave="activeProvince=''"/>
        <text x="290" y="335" class="prov-label">ຄຳມ່ວນ</text>

        <!-- ສະຫວັນນະເຂດ Savannakhet -->
        <path d="M240,340 L270,370 L320,380 L360,360 L390,390 L400,440 L370,470 L330,480 L290,460 L260,430 L250,390 Z"
          :class="['province', { active: activeProvince === 'savannakhet' }]"
          @mouseenter="activeProvince='savannakhet'" @mouseleave="activeProvince=''"/>
        <text x="320" y="425" class="prov-label">ສະຫວັນນະເຂດ</text>

        <!-- ສາລະວັນ Salavan -->
        <path d="M290,460 L330,480 L370,470 L390,500 L380,540 L350,555 L310,545 L285,510 Z"
          :class="['province', { active: activeProvince === 'salavan' }]"
          @mouseenter="activeProvince='salavan'" @mouseleave="activeProvince=''"/>
        <text x="335" y="515" class="prov-label">ສາລະວັນ</text>

        <!-- ເຊກອງ Sekong -->
        <path d="M350,555 L380,540 L420,555 L430,590 L405,610 L370,600 L355,575 Z"
          :class="['province', { active: activeProvince === 'sekong' }]"
          @mouseenter="activeProvince='sekong'" @mouseleave="activeProvince=''"/>
        <text x="390" y="580" class="prov-label">ເຊກອງ</text>

        <!-- ຈຳປາສັກ Champasak -->
        <path d="M285,510 L310,545 L350,555 L355,575 L340,620 L310,650 L280,640 L260,600 L265,550 Z"
          :class="['province', { active: activeProvince === 'champasak' }]"
          @mouseenter="activeProvince='champasak'" @mouseleave="activeProvince=''"/>
        <text x="305" y="590" class="prov-label">ຈຳປາສັກ</text>

        <!-- ອັດຕະປື Attapeu -->
        <path d="M370,600 L405,610 L430,590 L450,620 L440,660 L410,680 L380,670 L355,640 L340,620 L355,575 Z"
          :class="['province', { active: activeProvince === 'attapeu' }]"
          @mouseenter="activeProvince='attapeu'" @mouseleave="activeProvince=''"/>
        <text x="400" y="645" class="prov-label">ອັດຕະປື</text>

        <!-- ໄຊສົມບູນ Xaisomboun -->
        <path d="M230,190 L260,195 L280,205 L270,230 L250,230 L235,215 Z"
          :class="['province', { active: activeProvince === 'xaisomboun' }]"
          @mouseenter="activeProvince='xaisomboun'" @mouseleave="activeProvince=''"/>
        <text x="252" y="215" class="prov-label" style="font-size:6px">ໄຊສົມບູນ</text>
      </g>

      <!-- Location pins -->
      <g v-for="pin in pins" :key="pin.label">
        <circle :cx="pin.x" :cy="pin.y" r="8" :fill="pin.color" stroke="white" stroke-width="2" class="pin-circle"/>
        <circle :cx="pin.x" :cy="pin.y" r="3" fill="white"/>
      </g>
    </svg>

    <!-- Tooltip -->
    <div v-if="activeProvince" class="map-tooltip">
      {{ provinceNames[activeProvince] || activeProvince }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pins?: Array<{ x: number; y: number; label: string; color: string }>;
}>();

const activeProvince = ref('');

const provinceNames: Record<string, string> = {
  phongsali: 'ແຂວງ ຜົ້ງສາລີ',
  luangnamtha: 'ແຂວງ ຫຼວງນ້ຳທາ',
  bokeo: 'ແຂວງ ບໍ່ແກ້ວ',
  oudomxay: 'ແຂວງ ອຸດົມໄຊ',
  houaphan: 'ແຂວງ ຫົວພັນ',
  luangprabang: 'ແຂວງ ຫຼວງພະບາງ',
  xaignabouli: 'ແຂວງ ໄຊຍະບູລີ',
  xiangkhouang: 'ແຂວງ ຊຽງຂວາງ',
  vientianeprov: 'ແຂວງ ວຽງຈັນ',
  vientiane: 'ນະຄອນຫຼວງ ວຽງຈັນ',
  bolikhamxai: 'ແຂວງ ບໍລິຄຳໄຊ',
  khammouane: 'ແຂວງ ຄຳມ່ວນ',
  savannakhet: 'ແຂວງ ສະຫວັນນະເຂດ',
  salavan: 'ແຂວງ ສາລະວັນ',
  sekong: 'ແຂວງ ເຊກອງ',
  champasak: 'ແຂວງ ຈຳປາສັກ',
  attapeu: 'ແຂວງ ອັດຕະປື',
  xaisomboun: 'ແຂວງ ໄຊສົມບູນ',
};
</script>

<style scoped>
.laos-map-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.laos-map {
  width: 100%;
  height: auto;
}

.province {
  fill: url(#provinceGrad);
  stroke: white;
  stroke-width: 1.5;
  cursor: pointer;
  transition: all 0.3s;
}
.province:hover,
.province.active {
  fill: #3498db;
  stroke: #C9A227;
  stroke-width: 2;
  filter: brightness(1.2);
}

.prov-label {
  font-family: 'Phetsarath', sans-serif;
  font-size: 7px;
  fill: white;
  text-anchor: middle;
  pointer-events: none;
  font-weight: 600;
}

.pin-circle {
  animation: pinPulse 2s ease-in-out infinite;
}
.pin-circle:nth-child(odd) { animation-delay: 0.5s; }

@keyframes pinPulse {
  0%, 100% { r: 8; opacity: 1; }
  50% { r: 10; opacity: 0.8; }
}

.map-tooltip {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(4, 6, 54, 0.9);
  color: #C9A227;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(201, 162, 39, 0.3);
  white-space: nowrap;
  font-family: 'Phetsarath', sans-serif;
}
</style>
