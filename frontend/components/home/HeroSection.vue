<template>
  <section class="hero-section">
    <!-- Video Slides -->
    <div class="slides">
      <div v-for="(slide, i) in slides" :key="i"
        class="slide"
        :class="{ 'slide-active': i === currentSlide }">
        <video v-if="slide.video"
          :src="slide.video"
          autoplay muted loop playsinline
          class="slide-video">
        </video>
        <div v-else class="slide-img" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        <div class="slide-overlay"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div class="hero-logo">
        <img src="/images/logo.png" alt="KHOUNKHAM ENERGY" class="hero-logo-img" />
      </div>
      <h1 class="hero-title">{{ slides[currentSlide].title }}</h1>
      <p class="hero-subtitle">{{ slides[currentSlide].subtitle }}</p>
      <div class="scroll-indicator" @click="scrollDown">
        <svg class="animate-bounce" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </div>
    </div>

    <!-- Arrows -->
    <button class="slide-arrow slide-prev" @click="prevSlide">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
    </button>
    <button class="slide-arrow slide-next" @click="nextSlide">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
    </button>

    <!-- Dots -->
    <div class="slide-dots">
      <button v-for="(_, i) in slides" :key="i"
        @click="currentSlide = i"
        :class="['dot', { active: i === currentSlide }]">
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

const slides = computed(() => [
  {
    video: '/video/energy.mp4',
    title: t('home.hero_title'),
    subtitle: t('home.hero_subtitle'),
  },
  {
    video: '/video/hero-mining.mp4',
    title: t('services.mining_desc').substring(0, 60) + '...',
    subtitle: t('home.hero_subtitle'),
  },
  {
    video: '/video/more_cars.mp4',
    title: t('about.vision_content').substring(0, 60) + '...',
    subtitle: t('home.hero_subtitle'),
  },
]);

const currentSlide = ref(0);
let timer: ReturnType<typeof setInterval>;

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
}

function scrollDown() {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
}

onMounted(() => {
  timer = setInterval(nextSlide, 8000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 500px;
  max-height: 850px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slides {
  position: absolute;
  inset: 0;
}

.slide {
  position: absolute;
  inset: 0;
  background-color: #040636;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.slide-active {
  opacity: 1;
}

.slide-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.slide-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg,
    rgba(4, 6, 54, 0.4) 0%,
    rgba(4, 6, 54, 0.2) 40%,
    rgba(4, 6, 54, 0.4) 70%,
    rgba(226, 35, 26, 0.2) 100%
  );
}

/* Content */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.hero-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.hero-logo-img {
  height: 100px;
  width: auto;
  filter: drop-shadow(0 0 20px rgba(226, 35, 26, 0.5)) drop-shadow(0 0 40px rgba(201, 162, 39, 0.2));
  animation: logoPulse 3s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(226, 35, 26, 0.5)) drop-shadow(0 0 40px rgba(201, 162, 39, 0.2)); }
  50% { filter: drop-shadow(0 0 30px rgba(226, 35, 26, 0.7)) drop-shadow(0 0 60px rgba(201, 162, 39, 0.4)); }
}

.hero-title {
  font-family: 'Phetsarath', 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 0 2px 20px rgba(4, 6, 54, 0.7);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.3;
}

.hero-subtitle {
  font-family: 'Phetsarath', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
  color: #C9A227;
  margin-bottom: 40px;
  text-shadow: 0 1px 10px rgba(4, 6, 54, 0.7);
}

/* Scroll indicator */
.scroll-indicator {
  cursor: pointer;
  color: #C9A227;
  opacity: 0.8;
  transition: opacity 0.3s;
}
.scroll-indicator:hover { opacity: 1; }

/* Arrows */
.slide-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(201, 162, 39, 0.15);
  border: 1px solid rgba(201, 162, 39, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
}
.slide-arrow:hover {
  background: rgba(226, 35, 26, 0.6);
  border-color: #C9A227;
}
.slide-prev { left: 20px; }
.slide-next { right: 20px; }

/* Dots */
.slide-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  gap: 10px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}
.dot.active {
  background: #C9A227;
  border-color: #C9A227;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .slide-arrow { display: none; }
  .hero-logo-img { height: 70px; }
}
</style>
