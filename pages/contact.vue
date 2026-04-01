<template>
  <div class="min-h-screen bg-[#07121a] text-white relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-96 h-96 bg-[#3dd2cc] rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#3dd2cc] rounded-full blur-3xl opacity-10 animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <section class="relative pt-32 pb-20 px-4">
      <div class="container mx-auto max-w-3xl relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-block mb-4">
            <div class="flex items-center gap-4 mb-4">
              <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#3dd2cc]"></div>
              <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// CONTACT.EXE</span>
              <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#3dd2cc]"></div>
            </div>
          </div>
          <h1 class="text-4xl lg:text-5xl font-bold mb-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7]">Kontaktieren</span> Sie uns
          </h1>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Haben Sie Fragen oder möchten Sie mit uns zusammenarbeiten? Füllen Sie das Formular aus und wir melden uns bei Ihnen.
          </p>
        </div>

        <!-- Contact Form Card -->
        <div class="relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm rounded-3xl border border-[#3dd2cc]/30 overflow-hidden">
          <!-- Corner Accents -->
          <div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#3dd2cc]/50 rounded-tl-3xl"></div>
          <div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#3dd2cc]/50 rounded-br-3xl"></div>

          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="hexagon-pattern"></div>
          </div>

          <form @submit.prevent="submitForm" class="relative z-10 p-8 lg:p-12 space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-mono text-[#3dd2cc] uppercase tracking-wider mb-2">Name *</label>
              <div class="relative group">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Ihr vollständiger Name"
                  class="w-full bg-[#07121a]/60 border-2 border-[#3dd2cc]/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:ring-0 focus:outline-none transition-all duration-300 group-hover:border-[#3dd2cc]/40"
                />
                <div class="absolute inset-0 rounded-xl bg-[#3dd2cc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-mono text-[#3dd2cc] uppercase tracking-wider mb-2">E-Mail *</label>
              <div class="relative group">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="ihre@email.de"
                  class="w-full bg-[#07121a]/60 border-2 border-[#3dd2cc]/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:ring-0 focus:outline-none transition-all duration-300 group-hover:border-[#3dd2cc]/40"
                />
                <div class="absolute inset-0 rounded-xl bg-[#3dd2cc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-mono text-[#3dd2cc] uppercase tracking-wider mb-2">Telefon</label>
              <div class="relative group">
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+49 123 456789"
                  class="w-full bg-[#07121a]/60 border-2 border-[#3dd2cc]/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:ring-0 focus:outline-none transition-all duration-300 group-hover:border-[#3dd2cc]/40"
                />
                <div class="absolute inset-0 rounded-xl bg-[#3dd2cc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-mono text-[#3dd2cc] uppercase tracking-wider mb-2">Nachricht</label>
              <div class="relative group">
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Ihre Nachricht an uns..."
                  class="w-full bg-[#07121a]/60 border-2 border-[#3dd2cc]/20 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:ring-0 focus:outline-none transition-all duration-300 resize-none group-hover:border-[#3dd2cc]/40"
                ></textarea>
                <div class="absolute inset-0 rounded-xl bg-[#3dd2cc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="group/btn relative w-full px-8 py-5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/30 hover:shadow-2xl hover:shadow-[#3dd2cc]/60 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div class="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <span class="relative z-10 flex items-center justify-center gap-3">
                  <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  {{ isSubmitting ? 'Wird gesendet...' : 'Nachricht senden' }}
                </span>
              </button>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
              {{ errorMessage }}
            </div>
          </form>
        </div>

        <!-- Success State -->
        <Transition name="fade">
          <div v-if="isSuccess" class="fixed inset-0 z-50 flex items-center justify-center bg-[#07121a]/90 backdrop-blur-sm">
            <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-12 rounded-3xl border border-[#3dd2cc]/50 text-center max-w-md mx-4 shadow-2xl shadow-[#3dd2cc]/20">
              <div class="w-20 h-20 bg-[#3dd2cc]/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#3dd2cc]">
                <svg class="w-10 h-10 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3">Nachricht gesendet!</h3>
              <p class="text-gray-300 mb-6">Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze bei Ihnen.</p>
              <button @click="resetForm" class="px-8 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl hover:shadow-lg hover:shadow-[#3dd2cc]/50 transition-all duration-300">
                Schließen
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Kontakt - Binarion',
  meta: [
    { name: 'description', content: 'Kontaktieren Sie Binarion – Ihr spezialisierter Partner für IT-Recruiting. Wir freuen uns auf Ihre Nachricht.' }
  ]
})

const WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAQAQtXMCik/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=nmBuW9WfUvjXFBWof_fXSGtQHupE3q5fwK1hUA1wl9A'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const text = [
      '📩 *Neue Kontaktanfrage über Binarion Website*',
      '─────────────────────────',
      `👤 *Name:* ${form.value.name}`,
      `📧 *E-Mail:* ${form.value.email}`,
      form.value.phone ? `📞 *Telefon:* ${form.value.phone}` : '',
      form.value.message ? `💬 *Nachricht:* ${form.value.message}` : '',
      '─────────────────────────',
      `🕐 *Zeitpunkt:* ${new Date().toLocaleString('de-DE')}`
    ].filter(Boolean).join('\n')

    await $fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { text }
    })

    isSuccess.value = true
  } catch (error) {
    console.error('Webhook error:', error)
    errorMessage.value = 'Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = { name: '', email: '', phone: '', message: '' }
  isSuccess.value = false
}
</script>

<style scoped>
.hexagon-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%233dd2cc' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 60px 60px;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
