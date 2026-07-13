<template>
  <footer class="footer">
    <!-- Gold gradient top border -->
    <div class="footer-border"></div>

    <div class="container mx-auto px-4 py-14">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Company Info -->
        <div>
          <div class="mb-5">
            <img src="/images/logo.png" alt="KHOUNKHAM ENERGY" class="h-14 w-auto mb-3 brightness-110" />
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ $t('footer.company') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="footer-heading">{{ $t('nav.services') }}</h3>
          <div class="space-y-2.5">
            <NuxtLink v-for="s in services" :key="s.slug" :to="localePath(`/services/${s.slug}`)"
              class="footer-link">
              <span class="footer-link-dot"></span>
              {{ s.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="footer-heading">{{ $t('nav.contact') }}</h3>
          <div class="space-y-3 text-sm">
            <p class="flex items-center gap-2 text-gray-400">
              <span class="footer-icon">📍</span> {{ $t('contact.headquarters') }}
            </p>
            <p class="flex items-center gap-2 text-gray-400">
              <span class="footer-icon">📧</span> info@khounkham.com
            </p>
            <p class="flex items-center gap-2 text-gray-400">
              <span class="footer-icon">📞</span> +856 20 xxxx xxxx
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} {{ $t('footer.company') }}. {{ $t('footer.rights') }}.</span>
        <NuxtLink to="/admin/login" class="footer-login">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          {{ $t('admin.login') }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const services = [
  { slug: 'mining', label: t('nav.mining') },
  { slug: 'plywood', label: t('nav.plywood') },
  { slug: 'gas-stations', label: t('nav.gas_stations') },
  { slug: 'electrical', label: t('nav.electrical') },
  { slug: 'logistics', label: t('nav.logistics') },
];
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #06093d 0%, #040636 100%);
  color: white;
  position: relative;
}

.footer-border {
  height: 4px;
  background: linear-gradient(90deg, #C9A227 0%, #e8d48b 30%, #f5ecd0 50%, #e8d48b 70%, #C9A227 100%);
}

.footer-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.15rem;
  background: linear-gradient(135deg, #C9A227 0%, #e8d48b 40%, #f5ecd0 60%, #e8d48b 80%, #C9A227 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-heading {
  font-family: 'Phetsarath', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #C9A227 0%, #e8d48b 50%, #C9A227 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #999;
  transition: all 0.3s;
}
.footer-link:hover {
  color: #e8d48b;
  padding-left: 4px;
}

.footer-link-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A227, #e8d48b);
  flex-shrink: 0;
}

.footer-icon {
  font-size: 1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(201, 162, 39, 0.15);
  margin-top: 32px;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.footer-login {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  transition: color 0.3s;
}
.footer-login:hover {
  color: #e8d48b;
}
</style>
