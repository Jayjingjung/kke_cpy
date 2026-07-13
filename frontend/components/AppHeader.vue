<template>
  <header :class="['header', { 'header-scrolled': scrolled }]">
    <!-- Top bar -->
    <div class="top-bar" v-if="!scrolled">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center gap-4 text-xs">
          <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> +856 20 xxxx xxxx</span>
          <span class="flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> info@khounkham.com</span>
        </div>

      </div>
    </div>

    <!-- Main nav -->
    <div class="main-nav">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <NuxtLink :to="localePath('/')" class="logo-container group">
            <div class="logo-inner">
              <img src="/images/logo.png" alt="KHOUNKHAM ENERGY" class="logo-img" />
              <div class="logo-text-wrap">
                <div class="logo-name">KHOUNKHAM</div>
                <div class="logo-sub">ENERGY SOLE CO., LTD</div>
              </div>
            </div>
          </NuxtLink>

          <!-- Desktop Nav -->
          <nav class="hidden lg:flex items-center gap-0.5">
            <NuxtLink :to="localePath('/')" class="nav-item" active-class="nav-active">
              {{ $t('nav.home') }}
            </NuxtLink>

            <!-- About dropdown -->
            <div class="relative group">
              <button class="nav-item flex items-center gap-1">
                {{ $t('nav.about') }}
                <svg class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="dropdown-menu">
                <div class="dropdown-arrow"></div>
                <NuxtLink :to="localePath('/about')" class="dropdown-item">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  {{ $t('nav.about_main') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/about/board')" class="dropdown-item">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ $t('nav.board') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/about/org-structure')" class="dropdown-item">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
                  {{ $t('nav.org_structure') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Services dropdown -->
            <div class="relative group">
              <button class="nav-item flex items-center gap-1">
                {{ $t('nav.services') }}
                <svg class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="dropdown-menu dropdown-wide">
                <div class="dropdown-arrow"></div>
                <NuxtLink :to="localePath('/services/mining')" class="dropdown-item">⛏️ {{ $t('nav.mining') }}</NuxtLink>
                <NuxtLink :to="localePath('/services/plywood')" class="dropdown-item">🏭 {{ $t('nav.plywood') }}</NuxtLink>
                <NuxtLink :to="localePath('/services/gas-stations')" class="dropdown-item">⛽ {{ $t('nav.gas_stations') }}</NuxtLink>
                <NuxtLink :to="localePath('/services/electrical')" class="dropdown-item">⚡ {{ $t('nav.electrical') }}</NuxtLink>
                <NuxtLink :to="localePath('/services/logistics')" class="dropdown-item">🚛 {{ $t('nav.logistics') }}</NuxtLink>
              </div>
            </div>

            <NuxtLink :to="localePath('/projects')" class="nav-item" active-class="nav-active">{{ $t('nav.projects') }}</NuxtLink>
            <NuxtLink :to="localePath('/gallery')" class="nav-item" active-class="nav-active">{{ $t('nav.gallery') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="nav-item nav-contact">{{ $t('nav.contact') }}</NuxtLink>

            <!-- Language Dropdown -->
            <div class="relative group ml-2">
              <button class="nav-item flex items-center gap-1 lang-dropdown-btn">
                <span class="text-sm font-semibold uppercase tracking-wider text-white group-hover:text-primary transition-colors">
                  {{ locale === 'lo' ? 'LA' : locale === 'en' ? 'EN' : 'ZH' }}
                </span>
                <svg class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="dropdown-menu dropdown-right">
                <div class="dropdown-arrow"></div>
                <button v-for="loc in locales" :key="loc.code"
                  @click="setLocale(loc.code)"
                  :class="['dropdown-item justify-between w-full text-left', { 'active-lang-item': locale === loc.code }]">
                  <span class="flex items-center gap-2">
                    <span class="text-base">{{ loc.code === 'lo' ? '🇱🇦' : loc.code === 'en' ? '🇬🇧' : '🇨🇳' }}</span>
                    <span>{{ loc.name }}</span>
                  </span>
                  <span v-if="locale === loc.code" class="text-primary font-bold">✓</span>
                </button>
              </div>
            </div>
          </nav>

          <div class="flex items-center gap-3">
            <!-- Mobile menu -->
            <button @click="mobileOpen = !mobileOpen" class="lg:hidden text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide">
      <div v-if="mobileOpen" class="lg:hidden mobile-nav">
        <div class="container mx-auto px-4 py-4 space-y-1">
          <NuxtLink :to="localePath('/')" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.home') }}</NuxtLink>
          <div class="mobile-divider"></div>
          <div class="mobile-label">{{ $t('nav.about') }}</div>
          <NuxtLink :to="localePath('/about')" class="mobile-sub" @click="mobileOpen = false">{{ $t('nav.about_main') }}</NuxtLink>
          <NuxtLink :to="localePath('/about/board')" class="mobile-sub" @click="mobileOpen = false">{{ $t('nav.board') }}</NuxtLink>
          <NuxtLink :to="localePath('/about/org-structure')" class="mobile-sub" @click="mobileOpen = false">{{ $t('nav.org_structure') }}</NuxtLink>
          <div class="mobile-divider"></div>
          <div class="mobile-label">{{ $t('nav.services') }}</div>
          <NuxtLink v-for="s in ['mining','plywood','gas-stations','electrical','logistics']" :key="s"
            :to="localePath(`/services/${s}`)" class="mobile-sub" @click="mobileOpen = false">
            {{ $t(`nav.${s.replace('-', '_')}`) }}
          </NuxtLink>
          <div class="mobile-divider"></div>
          <NuxtLink :to="localePath('/projects')" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink :to="localePath('/gallery')" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.gallery') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="mobile-link" @click="mobileOpen = false">{{ $t('nav.contact') }}</NuxtLink>
          <div class="mobile-divider"></div>
          <div class="flex gap-2 pt-2">
            <button v-for="loc in locales" :key="loc.code"
              @click="setLocale(loc.code)"
              :class="['lang-btn-mobile', { 'lang-active-mobile': locale === loc.code }]">
              {{ loc.code === 'lo' ? '🇱🇦' : loc.code === 'en' ? '🇬🇧' : '🇨🇳' }} {{ loc.name }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const mobileOpen = ref(false);
const scrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 60;
  });
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.3s ease;
}

.header-scrolled {
  box-shadow: 0 4px 20px rgba(4, 6, 54, 0.3);
}

/* Top bar */
.top-bar {
  background: #030529;
  color: #999;
  padding: 6px 0;
  border-bottom: 1px solid rgba(201, 162, 39, 0.15);
  font-size: 12px;
}

/* Main nav */
.main-nav {
  background: linear-gradient(180deg, #06093d 0%, #040636 100%);
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #C9A227, #e8d48b, #f5ecd0, #e8d48b, #C9A227) 1;
}

.header-scrolled .main-nav {
  background: rgba(4, 6, 54, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(4, 6, 54, 0.3);
}

/* Logo */
.logo-mark {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #E2231A 0%, #B91C14 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: white;
  letter-spacing: 1px;
  border: 1.5px solid rgba(201, 162, 39, 0.5);
  transition: all 0.3s;
}
.logo-mark:hover {
  border-color: #C9A227;
  box-shadow: 0 0 12px rgba(201, 162, 39, 0.3);
}

/* Logo container with gold border */
.logo-container {
  display: flex;
  align-items: center;
}

.logo-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 20px 6px 8px;
  border: 1.5px solid rgba(201, 162, 39, 0.4);
  border-radius: 8px;
  background: rgba(201, 162, 39, 0.05);
  transition: all 0.3s;
}
.logo-inner:hover {
  border-color: #C9A227;
  background: rgba(201, 162, 39, 0.1);
  box-shadow: 0 0 15px rgba(201, 162, 39, 0.15);
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text-wrap {
  display: none;
}
@media (min-width: 640px) {
  .logo-text-wrap { display: block; }
}

.logo-name {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #C9A227 0%, #e8d48b 35%, #f5ecd0 50%, #e8d48b 65%, #C9A227 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-sub {
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  color: rgba(201, 162, 39, 0.6);
  font-weight: 500;
}

/* Nav items */
.nav-item {
  position: relative;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.2s;
  font-family: 'Phetsarath', sans-serif;
}
.nav-item:hover {
  color: #C9A227;
}
.nav-item::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #C9A227, #d4af37);
  transition: all 0.3s;
  transform: translateX(-50%);
}
.nav-item:hover::after {
  width: 70%;
}
.nav-active {
  color: #C9A227 !important;
  font-weight: 700;
}
.nav-active::after {
  width: 70% !important;
}

.nav-contact {
  background: linear-gradient(135deg, #C9A227, #d4af37);
  color: white !important;
  border-radius: 6px;
  padding: 8px 18px;
  margin-left: 8px;
  font-weight: 600;
}
.nav-contact:hover {
  background: linear-gradient(135deg, #a68520, #C9A227);
  color: white !important;
}
.nav-contact::after { display: none; }

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: 10px;
  padding: 8px;
  min-width: 220px;
  box-shadow: 0 10px 40px rgba(4, 6, 54, 0.15), 0 0 0 1px rgba(4, 6, 54, 0.05);
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: all 0.25s ease;
}
.dropdown-wide { min-width: 260px; }
.group:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.dropdown-arrow {
  position: absolute;
  top: -6px;
  left: 24px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-size: 0.875rem;
  color: #333;
  border-radius: 6px;
  transition: all 0.2s;
  font-family: 'Phetsarath', sans-serif;
}
.dropdown-item:hover {
  background: #fdf8e8;
  color: #a68520;
}

/* Language buttons */
.lang-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: 2px solid transparent;
  transition: all 0.2s;
  cursor: pointer;
  background: rgba(255,255,255,0.05);
}
.lang-btn:hover { border-color: rgba(201, 162, 39, 0.5); }
.lang-active { border-color: #C9A227; background: rgba(201, 162, 39, 0.15); }

.lang-btn-sm {
  width: 24px; height: 24px; border-radius: 50%; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid transparent; cursor: pointer; transition: all 0.2s;
}
.lang-btn-sm:hover { border-color: rgba(201, 162, 39, 0.5); }
.lang-active-sm { border-color: #C9A227; background: rgba(201, 162, 39, 0.15); }

/* Mobile nav */
.mobile-nav {
  background: #040636;
  border-top: 1px solid rgba(201, 162, 39, 0.15);
  max-height: 80vh;
  overflow-y: auto;
}
.mobile-link {
  display: block;
  padding: 10px 12px;
  color: white;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s;
  font-family: 'Phetsarath', sans-serif;
}
.mobile-link:hover { background: rgba(201, 162, 39, 0.1); color: #C9A227; }
.mobile-label {
  padding: 8px 12px;
  color: #C9A227;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.mobile-sub {
  display: block;
  padding: 8px 12px 8px 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.2s;
  font-family: 'Phetsarath', sans-serif;
}
.mobile-sub:hover { background: rgba(201, 162, 39, 0.1); color: #C9A227; }
.mobile-divider { height: 1px; background: rgba(255, 255, 255, 0.06); margin: 4px 0; }

.lang-btn-mobile {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.2s;
  cursor: pointer;
}
.lang-btn-mobile:hover { border-color: rgba(201, 162, 39, 0.5); }
.lang-active-mobile { border-color: #C9A227; color: #C9A227; background: rgba(201,162,39,0.1); }

/* Language Dropdown Custom Styles */
.dropdown-right {
  left: auto;
  right: 0;
}
.dropdown-right .dropdown-arrow {
  left: auto;
  right: 20px;
}
.active-lang-item {
  background: #fdf8e8;
  color: #C9A227 !important;
  font-weight: 600;
}
.lang-dropdown-btn:hover span {
  color: #C9A227;
}

/* Slide transition */
.slide-enter-active { transition: all 0.3s ease; }
.slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from { opacity: 0; max-height: 0; }
.slide-leave-to { opacity: 0; max-height: 0; }
</style>
