<template>
  <div>
    <section class="page-banner text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold">{{ $t('contact.title') }}</h1>
        <div class="w-24 h-1 bg-gold mx-auto mt-4"></div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <!-- Contact Form -->
          <div>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.name') }} *</label>
                <input v-model="form.name" type="text" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold focus:border-gold outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.email') }} *</label>
                <input v-model="form.email" type="email" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold focus:border-gold outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.phone') }}</label>
                <input v-model="form.phone" type="tel"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold focus:border-gold outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('contact.message') }} *</label>
                <textarea v-model="form.message" rows="5" required
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gold focus:border-gold outline-none resize-none"></textarea>
              </div>
              <button type="submit" :disabled="sending" class="btn-primary w-full disabled:opacity-50">
                {{ sending ? '...' : $t('contact.send') }}
              </button>
              <p v-if="success" class="text-green-600 font-medium text-center">{{ $t('contact.success') }}</p>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div>
              <h3 class="text-xl font-heading font-bold mb-4">{{ $t('contact.headquarters') }}</h3>
              <div class="space-y-3 text-gray-700">
                <p>📍 {{ $t('contact.address') }}: Vientiane Capital, Lao PDR</p>
                <p>📧 info@khounkham.com</p>
                <p>📞 +856 20 xxxx xxxx</p>
              </div>
            </div>
            <!-- Map placeholder -->
            <div class="bg-gray-200 rounded-lg h-64 flex items-center justify-center text-gray-400">
              <span>Google Maps — ໃສ່ API Key ເພື່ອສະແດງແຜນທີ່</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { post } = useApi();

const form = reactive({ name: '', email: '', phone: '', message: '' });
const sending = ref(false);
const success = ref(false);

async function submitForm() {
  sending.value = true;
  success.value = false;
  try {
    await post('/contact', { ...form });
    success.value = true;
    Object.assign(form, { name: '', email: '', phone: '', message: '' });
  } catch {}
  sending.value = false;
}
</script>
