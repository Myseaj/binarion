<template>
  <div class="min-h-screen bg-[#07121a] text-white relative overflow-hidden">
    <!-- Matrix Background -->
    <canvas ref="matrixCanvas" class="fixed inset-0 w-full h-full opacity-10 pointer-events-none"></canvas>

    <!-- Subtle Grid Background -->
    <div class="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
      <div class="grid-bg"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Elements - reduced clutter -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#3dd2cc] rounded-full blur-[120px] opacity-[0.08]"></div>
        <div class="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#3dd2cc] rounded-full blur-[100px] opacity-[0.06]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3dd2cc] rounded-full blur-[150px] opacity-[0.04]"></div>
        
        <!-- Subtle floating dots -->
        <div v-for="n in 12" :key="`particle-${n}`" 
             class="particle absolute w-1 h-1 bg-[#3dd2cc] rounded-full"
             :style="getParticleStyle(n)"></div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="mb-10 inline-flex items-center gap-2 px-5 py-2 bg-[#3dd2cc]/[0.08] border border-[#3dd2cc]/20 rounded-full backdrop-blur-sm">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full animate-pulse"></div>
            <span class="text-[#3dd2cc] text-sm font-medium tracking-wide">Für IT-Fachkräfte</span>
          </div>

          <h1 class="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
            Der Job, der zu Ihnen<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7]">
              wirklich passt
            </span>
          </h1>

          <p class="text-lg lg:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Endlich ein Recruiter, <span class="text-[#3dd2cc] font-medium">der Ihren Stack kennt.</span> 
            Kein Buzzword-Bingo. Keine generischen Stellenbeschreibungen. Nur Jobs, die passen.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <NuxtLink to="/jobs" class="group relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/30 hover:shadow-xl hover:shadow-[#3dd2cc]/50 transition-all duration-300 hover:scale-105">
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"></div>
              <span class="relative z-10 flex items-center gap-2 justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Jobs entdecken
              </span>
            </NuxtLink>

            <a href="#process" class="group px-8 py-4 bg-white/[0.04] border border-white/10 text-white font-semibold rounded-lg text-lg hover:bg-white/[0.08] hover:border-[#3dd2cc]/40 transition-all duration-300">
              <span class="flex items-center gap-2 justify-center">
                <svg class="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                So funktioniert's
              </span>
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto">
            <div v-for="(stat, index) in stats" :key="index" 
                 class="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#3dd2cc]/30 transition-all duration-500">
              <div class="text-3xl lg:text-4xl font-bold text-[#3dd2cc] mb-1">
                {{ stat.value }}
              </div>
              <div class="text-gray-500 text-xs lg:text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span class="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div class="w-5 h-8 border border-gray-600 rounded-full p-1">
          <div class="w-1 h-2 bg-[#3dd2cc] rounded-full mx-auto animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-[#3dd2cc]/20 to-transparent"></div>

    <!-- Vorteile Section -->
    <section id="vorteile" class="py-24 lg:py-32 px-4 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <span class="inline-block text-[#3dd2cc] text-sm font-semibold tracking-widest uppercase mb-4">Ihre Vorteile</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-5">
            Was uns unterscheidet
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Wir sind keine klassischen Recruiter – wir sind ein Tech-Unternehmen mit eigenem Entwicklerteam.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="(benefit, index) in benefits" :key="index"
               class="group relative bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/[0.06] hover:border-[#3dd2cc]/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
            
            <!-- Subtle glow on hover -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-[#3dd2cc] rounded-full blur-[60px] opacity-0 group-hover:opacity-[0.08] transition-all duration-700"></div>

            <div class="relative z-10">
              <!-- Icon -->
              <div class="mb-5 inline-flex items-center justify-center w-12 h-12 bg-[#3dd2cc]/10 rounded-xl border border-[#3dd2cc]/20 group-hover:bg-[#3dd2cc]/15 group-hover:border-[#3dd2cc]/40 transition-all duration-500">
                <div v-html="benefit.icon" class="w-6 h-6 text-[#3dd2cc]"></div>
              </div>

              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-[#3dd2cc] transition-colors duration-300">
                {{ benefit.title }}
              </h3>
              <p class="text-gray-400 leading-relaxed text-[15px]">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-[#3dd2cc]/20 to-transparent"></div>

    <!-- Process Section -->
    <section id="process" class="py-24 lg:py-32 px-4 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <span class="inline-block text-[#3dd2cc] text-sm font-semibold tracking-widest uppercase mb-4">Ablauf</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-5">
            In 4 Schritten zum neuen Job
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Einfach, transparent und schnell
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <!-- Connection Line (Desktop) -->
          <div class="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#3dd2cc]/10 via-[#3dd2cc]/30 to-[#3dd2cc]/10"></div>
          
          <!-- Connection Line (Mobile) -->
          <div class="lg:hidden absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-[#3dd2cc]/20 via-[#3dd2cc]/10 to-[#3dd2cc]/20"></div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-5">
            <div v-for="(step, index) in processSteps" :key="index"
                 class="group relative lg:text-center">
              
              <!-- Step Number -->
              <div class="flex lg:justify-center mb-5">
                <div class="relative z-20 w-14 h-14 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center text-xl font-bold text-[#07121a] shadow-lg shadow-[#3dd2cc]/20 group-hover:shadow-[#3dd2cc]/40 group-hover:scale-110 transition-all duration-500">
                  {{ index + 1 }}
                </div>
              </div>
              
              <!-- Step Content -->
              <div class="pl-16 lg:pl-0">
                <h3 class="text-lg font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300">
                  {{ step.title }}
                </h3>
                <p class="text-gray-400 leading-relaxed text-sm">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-[#3dd2cc]/20 to-transparent"></div>

    <!-- Services Section -->
    <section id="services" class="py-24 lg:py-32 px-4 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <span class="inline-block text-[#3dd2cc] text-sm font-semibold tracking-widest uppercase mb-4">Leistungen</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-5">
            Rundum-Unterstützung
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Von der Karriereberatung bis zum Onboarding – alles aus einer Hand
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
          <div v-for="(service, index) in services" :key="index"
               class="group relative bg-white/[0.03] backdrop-blur-sm p-8 rounded-2xl border border-white/[0.06] hover:border-[#3dd2cc]/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
            
            <!-- Subtle glow -->
            <div class="absolute -top-32 -right-32 w-64 h-64 bg-[#3dd2cc] rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.06] transition-all duration-700"></div>

            <div class="relative z-10">
              <div class="flex items-start gap-5 mb-5">
                <div class="flex-shrink-0 w-12 h-12 bg-[#3dd2cc]/10 rounded-xl border border-[#3dd2cc]/20 flex items-center justify-center group-hover:bg-[#3dd2cc]/15 group-hover:border-[#3dd2cc]/40 transition-all duration-500">
                  <div v-html="service.icon" class="w-6 h-6 text-[#3dd2cc]"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-1 group-hover:text-[#3dd2cc] transition-colors duration-300">
                    {{ service.title }}
                  </h3>
                  <p class="text-gray-500 text-sm">
                    {{ service.description }}
                  </p>
                </div>
              </div>

              <!-- Features List -->
              <ul class="space-y-2.5 pl-[68px]">
                <li v-for="(feature, fIndex) in service.features" :key="fIndex"
                    class="flex items-center gap-3 text-gray-400 text-sm">
                  <svg class="w-4 h-4 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-[#3dd2cc]/20 to-transparent"></div>

    <!-- Fachbereiche Section -->
    <section id="fachbereiche" class="py-24 lg:py-32 px-4 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <span class="inline-block text-[#3dd2cc] text-sm font-semibold tracking-widest uppercase mb-4">Fachbereiche</span>
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-5">
            Unsere <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7]">Spezialisierungen</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Finden Sie Ihre Nische – wir sprechen Ihre Sprache
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <div v-for="(area, index) in specializations" :key="index"
               class="group relative bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/[0.06] hover:border-[#3dd2cc]/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden text-center">
            
            <div class="absolute inset-0 bg-gradient-to-b from-[#3dd2cc]/0 to-[#3dd2cc]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

            <div class="relative z-10">
              <!-- Emoji -->
              <div class="w-14 h-14 mx-auto mb-4 bg-[#3dd2cc]/[0.08] rounded-2xl border border-[#3dd2cc]/15 flex items-center justify-center text-2xl group-hover:bg-[#3dd2cc]/15 group-hover:border-[#3dd2cc]/30 group-hover:scale-110 transition-all duration-500">
                {{ area.emoji }}
              </div>

              <h3 class="text-base font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300">
                {{ area.title }}
              </h3>
              <p class="text-gray-500 text-xs leading-relaxed mb-4">
                {{ area.shortDesc }}
              </p>

              <NuxtLink to="/jobs" class="inline-flex items-center gap-1.5 text-[#3dd2cc] text-xs font-semibold hover:underline underline-offset-4 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                <span>Jobs ansehen</span>
                <svg class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 lg:py-32 px-4 relative">
      <div class="container mx-auto max-w-4xl">
        <div class="relative p-12 lg:p-20 rounded-3xl overflow-hidden">
          
          <!-- Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#0f2233] to-[#162f45] border border-[#3dd2cc]/15 rounded-3xl"></div>
          <div class="absolute -top-32 -right-32 w-64 h-64 bg-[#3dd2cc] rounded-full blur-[100px] opacity-[0.12]"></div>
          <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-[#3dd2cc] rounded-full blur-[100px] opacity-[0.08]"></div>

          <div class="relative z-10 text-center">
            <h2 class="text-3xl lg:text-5xl font-bold text-white mb-5">
              Bereit für den <span class="text-[#3dd2cc]">Wechsel</span>?
            </h2>
            <p class="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Schauen Sie sich unsere aktuellen IT-Positionen an – 
              oder sprechen Sie direkt mit uns über Ihre Wünsche.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/jobs" class="group relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/30 hover:shadow-xl hover:shadow-[#3dd2cc]/50 transition-all duration-300 hover:scale-105">
                <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"></div>
                <span class="relative z-10 flex items-center gap-2 justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Jobs durchsuchen
                </span>
              </NuxtLink>

              <NuxtLink to="/partner" class="group px-8 py-4 bg-white/[0.04] border border-white/10 text-white font-semibold rounded-lg text-lg hover:bg-white/[0.08] hover:border-[#3dd2cc]/40 transition-all duration-300">
                <span class="flex items-center gap-2 justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Für Unternehmen
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Meta Tags
useHead({
  title: 'Kandidaten - IT-Jobs & Karriere | Binarion',
  meta: [
    { name: 'description', content: 'Finden Sie Ihren Traumjob in der IT-Branche. Binarion vermittelt Top-IT-Talente an die besten Unternehmen. Professionelle Karriereberatung inklusive.' }
  ]
})

// Stats Data
const stats = [
  { value: '150+', label: 'Aktive Kandidaten im Pool' },
  { value: '<12h', label: 'Reaktionszeit' },
  { value: '100%', label: 'Softwaregestützt' }
]

// Benefits Data
const benefits = [
  {
    title: 'Technisches Verständnis',
    description: 'Wir verstehen den Unterschied zwischen React und Vue, zwischen Junior und Senior. Keine Recruiter, die "Java" und "JavaScript" verwechseln.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'
  },
  {
    title: 'Gespräche auf Augenhöhe',
    description: 'Unser Team besteht aus Entwicklern. Wir sprechen Ihre Sprache – kein HR-Jargon, echte Tech-Gespräche.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
  },
  {
    title: 'Schnell & transparent',
    description: 'Softwaregestützte Prozesse, <12h Reaktionszeit, volle Transparenz. Sie wissen immer, wo Sie stehen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
  },
  {
    title: 'Kostenlos für Sie',
    description: 'Unsere Dienstleistungen sind für Kandidaten komplett kostenfrei – keine versteckten Gebühren, kein Kleingedrucktes.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
]

// Process Steps
const processSteps = [
  {
    title: 'Profil & Präferenzen',
    description: 'Sie sagen uns, was Sie können und was Sie suchen. Stack, Gehalt, Remote-Anteil – alles auf den Tisch.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
  },
  {
    title: 'Smart Matching',
    description: 'Unsere Software + unser Tech-Team finden die Positionen, die wirklich zu Ihnen passen. Keine Massenanfragen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>'
  },
  {
    title: 'Vorstellung',
    description: 'Wir bereiten Sie vor, stellen Sie beim Unternehmen vor und koordinieren die Gespräche. Sie konzentrieren sich aufs Kennenlernen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
  },
  {
    title: 'Ihr neuer Job',
    description: 'Vertragsverhandlung, Onboarding-Support – wir bleiben dran, bis Sie erfolgreich gestartet sind.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>'
  }
]

// Services Data
const services = [
  {
    title: 'Karriereberatung',
    description: 'Technische Beratung von Entwicklern für Entwickler',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
    features: [
      'Stack-Analyse & Skill-Bewertung',
      'Karriereplanung auf technischer Ebene',
      'Portfolio & GitHub Review',
      'Interview-Prep mit Tech-Fokus'
    ]
  },
  {
    title: 'Job-Matching',
    description: 'Nur Positionen, die wirklich passen',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    features: [
      'Softwaregestütztes Matching',
      'Direkte Kontakte zu Tech-Leads',
      'Keine Spam-Anfragen',
      'Transparente Gehaltsspannen'
    ]
  },
  {
    title: 'Prozessbegleitung',
    description: 'Von der ersten Anfrage bis zum Vertragsstart',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
    features: [
      'Interviewkoordination',
      'Feedback nach jedem Schritt',
      'Vertragscheck & Gehaltsverhandlung',
      'Reaktionszeit <12h'
    ]
  },
  {
    title: 'Langfristige Partnerschaft',
    description: 'Auch nach dem Job-Start für Sie da',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>',
    features: [
      'Onboarding-Check-ins',
      'Karriere-Follow-up',
      'Netzwerk-Zugang',
      'Ihr Ansprechpartner bleibt derselbe'
    ]
  }
]

// Specializations Data
const specializations = [
  {
    title: 'Datenbanken',
    emoji: '🗄️',
    shortDesc: 'SQL, NoSQL, Data Engineering – von Normalisierung bis Performance-Tuning.'
  },
  {
    title: 'Software­entwicklung',
    emoji: '💻',
    shortDesc: 'Frontend, Backend, Fullstack – alle Sprachen, Frameworks und Paradigmen.'
  },
  {
    title: 'Netzwerk­technik',
    emoji: '🌐',
    shortDesc: 'Router, Switches, Protokolle – die Infrastruktur hinter jeder Verbindung.'
  },
  {
    title: 'Sys­admin',
    emoji: '🖥️',
    shortDesc: 'Server, Patches, Monitoring – IT-Infrastruktur zuverlässig am Laufen halten.'
  },
  {
    title: 'Cloud',
    emoji: '☁️',
    shortDesc: 'AWS, Azure, GCP – skalierbare Architekturen in der Cloud.'
  },
  {
    title: 'Projekt­management',
    emoji: '🎯',
    shortDesc: 'Agile, Scrum, Wasserfall – IT-Projekte erfolgreich zum Ziel führen.'
  },
  {
    title: 'Business Intelligence',
    emoji: '📊',
    shortDesc: 'Datenanalyse, Dashboards, Reporting – aus Daten Entscheidungen machen.'
  },
  {
    title: 'IT Security',
    emoji: '🔐',
    shortDesc: 'Pentesting, SIEM, Compliance – digitale Assets wirksam schützen.'
  }
]

// Canvas & Animation
const matrixCanvas = ref<HTMLCanvasElement | null>(null)

// Deterministic pseudo-random to avoid SSR hydration mismatch
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const getParticleStyle = (n: number) => {
  return {
    left: `${seededRandom(n * 7 + 1) * 100}%`,
    top: `${seededRandom(n * 7 + 2) * 100}%`,
    animationDelay: `${seededRandom(n * 7 + 3) * 3}s`,
    animationDuration: `${3 + seededRandom(n * 7 + 4) * 4}s`
  }
}

// Matrix Animation
const drawMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops: number[] = []

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  const draw = () => {
    ctx.fillStyle = 'rgba(7, 18, 26, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#3dd2cc'
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const interval = setInterval(draw, 50)
  return () => clearInterval(interval)
}

onMounted(() => {
  const cleanup = drawMatrix()

  const handleResize = () => {
    if (matrixCanvas.value) {
      matrixCanvas.value.width = window.innerWidth
      matrixCanvas.value.height = window.innerHeight
    }
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    if (cleanup) cleanup()
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* Subtle Grid Background */
.grid-bg {
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.15) 1px, transparent 1px);
  background-size: 60px 60px;
  width: 100%;
  height: 100%;
}

/* Particle Animation */
.particle {
  animation: float-gentle linear infinite;
}

@keyframes float-gentle {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.15;
  }
  50% {
    transform: translate(15px, -15px);
    opacity: 0.4;
  }
}
</style>