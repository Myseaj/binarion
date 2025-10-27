<template>
  <div class="min-h-screen bg-[#07121a] text-white relative overflow-hidden">
    <!-- Matrix Background -->
    <canvas ref="matrixCanvas" class="fixed inset-0 w-full h-full opacity-20 pointer-events-none"></canvas>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <!-- Gradient Orbs -->
        <div class="absolute top-20 left-10 w-96 h-96 bg-[#3dd2cc] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#3dd2cc] rounded-full blur-3xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
        
        <!-- Floating Particles -->
        <div v-for="n in 25" :key="`particle-${n}`" 
             class="particle absolute w-2 h-2 bg-[#3dd2cc] rounded-full opacity-50"
             :style="getParticleStyle(n)"></div>
        
        <!-- Scan Lines -->
        <div class="scan-line"></div>
        <div class="scan-line-horizontal"></div>
        
        <!-- Orbital Rings -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
          <div class="orbital-ring"></div>
          <div class="orbital-ring" style="animation-delay: -3s; animation-duration: 15s;"></div>
        </div>

        <!-- Data Streams -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div v-for="n in 6" :key="`stream-${n}`" 
               class="data-stream"
               :style="{ left: `${n * 15}%`, animationDelay: `${n * 0.7}s`, animationDuration: `${4 + n * 0.4}s` }"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Animated Title -->
          <div class="mb-8 inline-block">
            <div class="flex items-center gap-4 mb-4">
              <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#3dd2cc]"></div>
              <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// KARRIERE_BOOST.EXE</span>
              <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#3dd2cc]"></div>
            </div>
          </div>

          <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Ihre Karriere im <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7] animate-gradient">
              IT-Bereich startet hier
            </span>
          </h1>

          <p class="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Wir verbinden <span class="text-[#3dd2cc] font-semibold">Top-IT-Talente</span> mit den besten Unternehmen. 
            Ihre Zukunft beginnt mit dem perfekten Match.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <NuxtLink to="/jobs" class="group/cta relative px-10 py-5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <div class="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              <div class="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
              </div>
              <span class="relative z-10 flex items-center gap-3 justify-center">
                <svg class="w-6 h-6 group-hover/cta:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Jobs entdecken
              </span>
            </NuxtLink>

            <a href="#process" class="group/cta2 relative px-10 py-5 bg-[#122d42]/50 border-2 border-[#3dd2cc]/30 text-white font-bold rounded-xl text-lg overflow-hidden hover:bg-[#3dd2cc]/10 hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent opacity-0 group-hover/cta2:opacity-100 group-hover/cta2:animate-pulse"></div>
              <span class="relative z-10 flex items-center gap-3 justify-center">
                <svg class="w-6 h-6 group-hover/cta2:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                So funktioniert's
              </span>
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div v-for="(stat, index) in stats" :key="index" 
                 class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                 :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc]/0 to-[#3dd2cc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div class="absolute top-0 right-0 w-20 h-20 bg-[#3dd2cc]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="text-4xl lg:text-5xl font-bold text-[#3dd2cc] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ stat.value }}
                </div>
                <div class="text-gray-300 text-sm lg:text-base">{{ stat.label }}</div>
              </div>
              
              <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3dd2cc] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-[#3dd2cc]/50 rounded-full p-1">
          <div class="w-1 h-3 bg-[#3dd2cc] rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Vorteile Section -->
    <section id="vorteile" class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// YOUR_BENEFITS</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Warum mit uns?
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Wir bieten mehr als nur Jobvermittlung – wir sind Ihr Partner für die perfekte Karriere
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(benefit, index) in benefits" :key="index"
               class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
            
            <!-- Background Effects -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <!-- Corner Accents -->
            <div class="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-tr-2xl transition-all duration-500"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-bl-2xl transition-all duration-500"></div>

            <div class="relative z-10">
              <!-- Icon -->
              <div class="mb-6 inline-block p-4 bg-[#3dd2cc]/10 rounded-xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <div v-html="benefit.icon" class="w-8 h-8 text-[#3dd2cc]"></div>
              </div>

              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300">
                {{ benefit.title }}
              </h3>
              <p class="text-gray-300 leading-relaxed">
                {{ benefit.description }}
              </p>
            </div>

            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// PROCESS_FLOW</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            So einfach geht's
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            In nur 4 Schritten zu Ihrem Traumjob in der IT-Branche
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <!-- Connection Line -->
          <div class="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#3dd2cc]/20 via-[#3dd2cc]/50 to-[#3dd2cc]/20"></div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div v-for="(step, index) in processSteps" :key="index"
                 class="group relative pt-8">
              
              <!-- Step Number -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#07121a] shadow-lg shadow-[#3dd2cc]/50 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 z-20">
                {{ index + 1 }}
              </div>
              
              <!-- Step Card -->
              <div class="relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-8 pt-12 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 hover:-translate-y-4 perspective-card overflow-hidden h-full flex flex-col">
                
                <!-- Background Effects -->
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <div class="hexagon-pattern"></div>
                </div>

                <div class="relative z-10 flex-1 flex flex-col">
                  <!-- Icon -->
                  <div class="mb-6 flex justify-center">
                    <div class="p-4 bg-[#3dd2cc]/10 rounded-xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] transition-all duration-500">
                      <div v-html="step.icon" class="w-10 h-10 text-[#3dd2cc]"></div>
                    </div>
                  </div>

                  <h3 class="text-xl font-bold text-white mb-4 text-center group-hover:text-[#3dd2cc] transition-colors duration-300">
                    {{ step.title }}
                  </h3>
                  <p class="text-gray-300 text-center leading-relaxed text-sm">
                    {{ step.description }}
                  </p>
                </div>

                <!-- Glow on Hover -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc]/0 to-[#3dd2cc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </div>

              <!-- Arrow (Desktop) -->
              <div v-if="index < processSteps.length - 1" class="hidden lg:block absolute top-24 -right-4 z-30">
                <svg class="w-8 h-8 text-[#3dd2cc] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// OUR_SERVICES</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Unsere Leistungen
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Umfassende Unterstützung auf Ihrem Karriereweg
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div v-for="(service, index) in services" :key="index"
               class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-10 rounded-3xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 overflow-hidden">
            
            <!-- Background Effects -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>

            <div class="relative z-10">
              <div class="flex items-start gap-6 mb-6">
                <div class="p-5 bg-[#3dd2cc]/10 rounded-2xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <div v-html="service.icon" class="w-12 h-12 text-[#3dd2cc]"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300">
                    {{ service.title }}
                  </h3>
                  <p class="text-gray-300 leading-relaxed mb-6">
                    {{ service.description }}
                  </p>
                </div>
              </div>

              <!-- Features List -->
              <ul class="space-y-3">
                <li v-for="(feature, fIndex) in service.features" :key="fIndex"
                    class="flex items-start gap-3 text-gray-300 group/item hover:text-white transition-colors duration-300">
                  <div class="mt-1 w-2 h-2 bg-[#3dd2cc] rounded-full flex-shrink-0 group-hover/item:scale-150 group-hover/item:shadow-lg group-hover/item:shadow-[#3dd2cc] transition-all duration-300"></div>
                  <span class="group-hover/item:translate-x-2 transition-transform duration-300">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 relative">
      <div class="container mx-auto max-w-5xl">
        <div class="relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-12 lg:p-16 rounded-3xl border border-[#3dd2cc]/30 overflow-hidden group hover:border-[#3dd2cc]/60 transition-all duration-500">
          
          <!-- Background Effects -->
          <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <div class="network-pattern"></div>
          </div>
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          <!-- Corner Accents -->
          <div class="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#3dd2cc]/50 rounded-tl-3xl"></div>
          <div class="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#3dd2cc]/50 rounded-br-3xl"></div>
          
          <!-- Pulse Rings -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
            <div class="absolute inset-0 rounded-full border-2 border-[#3dd2cc]/20 animate-ping"></div>
            <div class="absolute inset-0 rounded-full border-2 border-[#3dd2cc]/10 animate-ping" style="animation-delay: 1s; animation-duration: 3s;"></div>
          </div>

          <div class="relative z-10 text-center">
            <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6 group-hover:text-[#3dd2cc] transition-colors duration-300">
              Bereit für den nächsten Karriereschritt?
            </h2>
            <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Entdecken Sie jetzt unsere aktuellen <span class="text-[#3dd2cc] font-semibold">IT-Positionen</span> und finden Sie den Job, der perfekt zu Ihnen passt!
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <NuxtLink to="/jobs" class="group/cta relative px-10 py-5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <div class="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <div class="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                  <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
                  <div class="absolute bottom-1/4 left-3/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.4s;"></div>
                </div>
                <span class="relative z-10 flex items-center gap-3 justify-center">
                  <svg class="w-6 h-6 group-hover/cta:rotate-12 group-hover/cta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Jobs durchsuchen
                </span>
              </NuxtLink>

              <NuxtLink to="/partner" class="group/cta2 relative px-10 py-5 bg-[#122d42]/50 border-2 border-[#3dd2cc]/30 text-white font-bold rounded-xl text-lg overflow-hidden hover:bg-[#3dd2cc]/10 hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent opacity-0 group-hover/cta2:opacity-100 group-hover/cta2:animate-pulse"></div>
                <span class="relative z-10 flex items-center gap-3 justify-center">
                  <svg class="w-6 h-6 group-hover/cta2:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  { value: '500+', label: 'Vermittelte IT-Experten' },
  { value: '95%', label: 'Erfolgsquote' },
  { value: '150+', label: 'Partner-Unternehmen' }
]

// Benefits Data
const benefits = [
  {
    title: 'Persönliche Beratung',
    description: 'Individuelle Karriereberatung durch erfahrene IT-Recruiter, die Ihre Stärken und Ziele kennen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
  },
  {
    title: 'Exklusive Positionen',
    description: 'Zugang zu Top-Jobs, die nicht öffentlich ausgeschrieben sind – direkt von unseren Partner-Unternehmen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
  },
  {
    title: 'Schneller Prozess',
    description: 'Effiziente Vermittlung ohne lange Wartezeiten. Von der ersten Kontaktaufnahme bis zum Vertragsangebot.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
  },
  {
    title: 'Kostenlos für Sie',
    description: 'Unsere Dienstleistungen sind für Kandidaten komplett kostenfrei – ohne versteckte Gebühren.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  },
  {
    title: 'Vertraulichkeit',
    description: 'Absolute Diskretion bei der Jobsuche – Ihre Daten und Bewerbung bleiben vertraulich.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
  },
  {
    title: 'Langfristige Betreuung',
    description: 'Auch nach erfolgreicher Vermittlung bleiben wir Ihr Ansprechpartner für Ihre Karriere.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>'
  }
]

// Process Steps
const processSteps = [
  {
    title: 'Profil erstellen',
    description: 'Teilen Sie uns Ihre Qualifikationen, Erfahrungen und Karriereziele mit.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
  },
  {
    title: 'Matching',
    description: 'Wir finden die passenden Positionen, die zu Ihren Skills und Wünschen passen.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>'
  },
  {
    title: 'Bewerbung',
    description: 'Wir bereiten Ihre Unterlagen optimal auf und stellen Sie bei Unternehmen vor.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
  },
  {
    title: 'Job Start',
    description: 'Nach erfolgreicher Vermittlung begleiten wir Sie beim Onboarding.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>'
  }
]

// Services Data
const services = [
  {
    title: 'Karriereberatung',
    description: 'Professionelle Unterstützung für Ihre IT-Karriere',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>',
    features: [
      'Individuelle Stärken-Analyse',
      'Karriereplanung & Zielsetzung',
      'CV & Portfolio Optimierung',
      'Interview-Vorbereitung'
    ]
  },
  {
    title: 'Jobvermittlung',
    description: 'Direkte Vermittlung zu Top-Unternehmen',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    features: [
      'Zugang zu exklusiven Positionen',
      'Direkte Kontakte zu Entscheidern',
      'Schneller Bewerbungsprozess',
      'Gehaltsverhandlungen'
    ]
  },
  {
    title: 'Vertragsberatung',
    description: 'Unterstützung bei Vertragsverhandlungen',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
    features: [
      'Gehalts-Benchmarking',
      'Benefits-Analyse',
      'Vertragscheck',
      'Verhandlungs-Support'
    ]
  },
  {
    title: 'Onboarding-Support',
    description: 'Begleitung in den ersten Wochen',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>',
    features: [
      'Einarbeitungs-Feedback',
      'Ansprechpartner bei Fragen',
      'Langfristige Betreuung',
      'Karriere-Follow-up'
    ]
  }
]

// Canvas & Animation
const matrixCanvas = ref<HTMLCanvasElement | null>(null)

const getParticleStyle = (n: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`
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
/* Particle Animation */
.particle {
  animation: float linear infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  50% {
    transform: translate(20px, -20px);
    opacity: 0.8;
  }
}

/* Scan Lines */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, #3dd2cc, transparent);
  animation: scan 4s linear infinite;
}

.scan-line-horizontal {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #3dd2cc, transparent);
  animation: scan-horizontal 6s linear infinite;
}

@keyframes scan {
  0% {
    top: 0%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes scan-horizontal {
  0% {
    left: 0%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

/* Orbital Rings */
.orbital-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(61, 210, 204, 0.2);
  border-radius: 50%;
  animation: orbit 10s linear infinite;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: rotate(180deg) scale(1.1);
    opacity: 0.6;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.3;
  }
}

/* Data Streams */
.data-stream {
  position: absolute;
  top: -100%;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #3dd2cc, transparent);
  animation: stream-flow linear infinite;
}

@keyframes stream-flow {
  0% {
    top: -100%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Gradient Animation */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Perspective Card */
.perspective-card {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.perspective-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(10px);
}

/* Hexagon Pattern */
.hexagon-pattern {
  background-image: 
    linear-gradient(30deg, transparent 40%, rgba(61, 210, 204, 0.1) 40%, rgba(61, 210, 204, 0.1) 60%, transparent 60%),
    linear-gradient(-30deg, transparent 40%, rgba(61, 210, 204, 0.1) 40%, rgba(61, 210, 204, 0.1) 60%, transparent 60%);
  background-size: 40px 70px;
  background-position: 0 0, 20px 35px;
  width: 100%;
  height: 100%;
}

/* Network Pattern */
.network-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(61, 210, 204, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(61, 210, 204, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  width: 100%;
  height: 100%;
}
</style>