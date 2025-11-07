<template>
  <div class="min-h-screen bg-[#07121a] relative overflow-hidden">
    <!-- Animated Matrix Background -->
    <div class="fixed inset-0 z-0">
      <canvas ref="matrixCanvas" class="w-full h-full opacity-15"></canvas>
    </div>

    <!-- Interactive Particle Network -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <canvas ref="particleCanvas" class="w-full h-full"></canvas>
    </div>

    <!-- Grid Background -->
    <div class="fixed inset-0 z-0 opacity-5">
      <div class="grid-background"></div>
    </div>

    <!-- Floating Tech Icons -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div v-for="(icon, i) in techIcons" :key="i" 
           class="tech-icon absolute opacity-10"
           :style="getTechIconStyle(i)">
        <div v-html="icon" class="text-[#3dd2cc]"></div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 px-4 pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center space-y-8">
          <!-- 3D Rotating Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer group perspective-1000"
               @mouseenter="badgeHovered = true"
               @mouseleave="badgeHovered = false">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
            <span class="text-[#3dd2cc] text-sm font-semibold relative">
              Für Unternehmen
              <!-- Glitch Effect -->
              <span class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="text-shadow: 2px 0 #66dcd7, -2px 0 #29b3ad;">Für Unternehmen</span>
            </span>
          </div>

          <!-- Main Headline with Typing Effect -->
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold text-white max-w-5xl mx-auto leading-tight">
            <span class="typing-container">{{ typedText }}</span>
            <span class="cursor-blink">|</span>
            <span class="block mt-2 bg-gradient-to-r from-[#66dcd7] via-[#3dd2cc] to-[#29b3ad] bg-clip-text text-transparent animate-gradient">
              in Rekordzeit
            </span>
          </h1>

          <!-- Subheadline with Reveal Animation -->
          <p class="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed reveal-text">
            Wir sind keine klassischen Recruiter. Wir sind ein Tech-Unternehmen mit eigenem Entwicklerteam. 
            <span class="text-[#3dd2cc] font-semibold glow-text">Das macht den Unterschied.</span>
          </p>

          <!-- CTA Buttons with Advanced Effects -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button class="group relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-105">
              <!-- Animated Border -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100">
                <div class="absolute inset-0 border-2 border-white rounded-lg animate-border-spin"></div>
              </div>
              <!-- Circuit Animation -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-30">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path class="circuit-path" d="M0,50 L20,50 L30,30 L70,70 L80,50 L100,50" 
                        stroke="rgba(7,18,26,0.5)" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              <span class="relative z-10 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Beratungsgespräch vereinbaren
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            <button class="group relative px-8 py-4 bg-transparent border-2 border-[#3dd2cc] text-[#3dd2cc] font-bold rounded-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105">
              <!-- Scanning Lines -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="scan-lines"></div>
              </div>
              <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <span class="relative z-10 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Unverbindliche Anfrage
              </span>
            </button>
          </div>

          <!-- Trust Indicators with 3D Hover Effect -->
          <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-[#3dd2cc]/20">
            <div class="text-center group cursor-pointer perspective-1000"
                 @mouseenter="hoveredStat = 0"
                 @mouseleave="hoveredStat = null">
              <div class="relative inline-block transform-gpu transition-all duration-500"
                   :class="{ 'scale-110 rotate-y-12': hoveredStat === 0 }">
                <div class="text-3xl lg:text-4xl font-bold text-[#3dd2cc] mb-2 relative">
                  {{ animatedStats.candidates }}+
                  <!-- Orbital Ring -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div class="orbital-ring"></div>
                  </div>
                  <!-- Data Particles -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100">
                    <div v-for="n in 4" :key="n" class="stat-particle" :style="getStatParticleStyle(n)"></div>
                  </div>
                </div>
                <div class="text-sm text-gray-400 transition-colors duration-300"
                     :class="{ 'text-[#66dcd7]': hoveredStat === 0 }">
                  Aktive Kandidaten
                </div>
              </div>
            </div>
            <div class="text-center border-x border-[#3dd2cc]/20 group cursor-pointer perspective-1000"
                 @mouseenter="hoveredStat = 1"
                 @mouseleave="hoveredStat = null">
              <div class="relative inline-block transform-gpu transition-all duration-500"
                   :class="{ 'scale-110 rotate-y-12': hoveredStat === 1 }">
                <div class="text-3xl lg:text-4xl font-bold text-[#3dd2cc] mb-2 relative">
                  &lt;{{ animatedStats.hours }}h
                  <!-- Progress Ring -->
                  <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3dd2cc" stroke-width="2" opacity="0.2"/>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#3dd2cc" stroke-width="2" 
                            stroke-dasharray="282.7" stroke-dashoffset="70"
                            transform="rotate(-90 50 50)" class="transition-all duration-1000"/>
                  </svg>
                  <!-- Binary Rain -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden pointer-events-none">
                    <div v-for="n in 3" :key="n" class="binary-drop" :style="getBinaryDropStyle(n)">
                      {{ Math.random() > 0.5 ? '1' : '0' }}
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray-400 transition-colors duration-300"
                     :class="{ 'text-[#66dcd7]': hoveredStat === 1 }">
                  Reaktionszeit
                </div>
              </div>
            </div>
            <div class="text-center group cursor-pointer perspective-1000"
                 @mouseenter="hoveredStat = 2"
                 @mouseleave="hoveredStat = null">
              <div class="relative inline-block transform-gpu transition-all duration-500"
                   :class="{ 'scale-110 rotate-y-12': hoveredStat === 2 }">
                <div class="text-3xl lg:text-4xl font-bold text-[#3dd2cc] mb-2 relative">
                  {{ animatedStats.software }}%
                  <!-- Clock Animation -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div class="clock-hands">
                      <div class="clock-hand"></div>
                    </div>
                  </div>
                </div>
                <div class="text-sm text-gray-400 transition-colors duration-300"
                     :class="{ 'text-[#66dcd7]': hoveredStat === 2 }">
                  Softwaregestützt
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section with 3D Cards -->
    <section id="services" class="relative z-10 py-20 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-4">
            So arbeiten wir <span class="text-[#3dd2cc]" data-text="mit Ihnen">mit Ihnen</span>
          </h2>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Sie suchen nicht irgendwen. Sie suchen jemanden, der Ihr Tech-Problem versteht. Dafür gibt es uns.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Service Card 1: Talente finden -->
          <div id="talente-finden" class="service-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3dd2cc]/30 overflow-hidden cursor-pointer perspective-1000"
               @mouseenter="hoveredService = 0"
               @mouseleave="hoveredService = null"
               :class="{ 'transform-3d': hoveredService === 0 }">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <!-- Glow Effect -->
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <!-- Scan Line -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="scan-line-vertical"></div>
            </div>
            
            <div class="relative z-10">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                  <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <!-- Icon Pulse -->
                  <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 rounded-xl"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300 relative">
                    Talente finden
                    <!-- Underline Animation -->
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3dd2cc] group-hover:w-full transition-all duration-500"></span>
                  </h3>
                  <p class="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Active Sourcing mit technischem Tiefgang. Wir sprechen die Sprache Ihrer Kandidaten – 
                    weil unser Team selbst aus Entwicklern besteht. Kein Buzzword-Bingo, echtes Verständnis.
                  </p>
                  
                  <ul class="space-y-3 mb-6">
                    <li v-for="(feature, idx) in servicesData[0].features" :key="idx"
                        class="flex items-center gap-3 text-gray-300 transform transition-all duration-300"
                        :style="{ transitionDelay: `${idx * 50}ms` }"
                        :class="{ 'translate-x-2': hoveredService === 0 }">
                      <div class="relative flex-shrink-0">
                        <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <!-- Check Glow -->
                        <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <span class="group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                    </li>
                  </ul>

                  <button class="text-[#3dd2cc] font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all duration-300 relative">
                    <span class="relative z-10">Mehr erfahren</span>
                    <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    <!-- Button Glow -->
                    <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover/btn:opacity-10 blur-sm rounded transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Card Number -->
            <div class="absolute top-4 right-4 text-8xl font-bold text-[#3dd2cc] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              01
            </div>
          </div>

          <!-- Service Card 2: Executive Search -->
          <div id="executive-search" class="service-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3dd2cc]/30 overflow-hidden cursor-pointer perspective-1000"
               @mouseenter="hoveredService = 1"
               @mouseleave="hoveredService = null"
               :class="{ 'transform-3d': hoveredService === 1 }">
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M10,0 L10,10 M0,10 L10,10" stroke="#3dd2cc" stroke-width="0.5" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#circuit)"/>
              </svg>
            </div>
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#29b3ad] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="scan-line-vertical" style="animation-delay: 0.2s;"></div>
            </div>
            
            <div class="relative z-10">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                  <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 rounded-xl"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300 relative">
                    Executive Search
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3dd2cc] group-hover:w-full transition-all duration-500"></span>
                  </h3>
                  <p class="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Führungskräfte für Tech-Rollen brauchen mehr als HR-Floskeln. Sie brauchen Gesprächspartner 
                    auf Augenhöhe. Unsere Entwickler verstehen, was ein CTO wirklich tut.
                  </p>
                  
                  <ul class="space-y-3 mb-6">
                    <li v-for="(feature, idx) in servicesData[1].features" :key="idx"
                        class="flex items-center gap-3 text-gray-300 transform transition-all duration-300"
                        :style="{ transitionDelay: `${idx * 50}ms` }"
                        :class="{ 'translate-x-2': hoveredService === 1 }">
                      <div class="relative flex-shrink-0">
                        <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <span class="group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                    </li>
                  </ul>

                  <button class="text-[#3dd2cc] font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all duration-300 relative">
                    <span class="relative z-10">Mehr erfahren</span>
                    <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover/btn:opacity-10 blur-sm rounded transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="absolute top-4 right-4 text-8xl font-bold text-[#3dd2cc] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              02
            </div>
          </div>

          <!-- Service Card 3: Team-Building -->
          <div id="team-building" class="service-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3dd2cc]/30 overflow-hidden cursor-pointer perspective-1000"
               @mouseenter="hoveredService = 2"
               @mouseleave="hoveredService = null"
               :class="{ 'transform-3d': hoveredService === 2 }">
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="network-pattern"></div>
            </div>
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="scan-line-vertical" style="animation-delay: 0.4s;"></div>
            </div>
            
            <div class="relative z-10">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                  <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 rounded-xl"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300 relative">
                    Team-Building
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3dd2cc] group-hover:w-full transition-all duration-500"></span>
                  </h3>
                  <p class="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Komplette Projektteams schneller aufbauen als je zuvor. Softwaregestützt, datengetrieben 
                    und mit Fokus auf Skill-Komplementarität. Weil wir wissen, wie Teams wirklich funktionieren.
                  </p>
                  
                  <ul class="space-y-3 mb-6">
                    <li v-for="(feature, idx) in servicesData[2].features" :key="idx"
                        class="flex items-center gap-3 text-gray-300 transform transition-all duration-300"
                        :style="{ transitionDelay: `${idx * 50}ms` }"
                        :class="{ 'translate-x-2': hoveredService === 2 }">
                      <div class="relative flex-shrink-0">
                        <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <span class="group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                    </li>
                  </ul>

                  <button class="text-[#3dd2cc] font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all duration-300 relative">
                    <span class="relative z-10">Mehr erfahren</span>
                    <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover/btn:opacity-10 blur-sm rounded transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="absolute top-4 right-4 text-8xl font-bold text-[#3dd2cc] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              03
            </div>
          </div>

          <!-- Service Card 4: Employer Branding -->
          <div id="employer-branding" class="service-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:shadow-2xl hover:shadow-[#3dd2cc]/30 overflow-hidden cursor-pointer perspective-1000"
               @mouseenter="hoveredService = 3"
               @mouseleave="hoveredService = null"
               :class="{ 'transform-3d': hoveredService === 3 }">
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="stars-pattern"></div>
            </div>
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#29b3ad] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="scan-line-vertical" style="animation-delay: 0.6s;"></div>
            </div>
            
            <div class="relative z-10">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden">
                  <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all duration-500 rounded-xl"></div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300 relative">
                    Employer Branding
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3dd2cc] group-hover:w-full transition-all duration-500"></span>
                  </h3>
                  <p class="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    IT-Talente gewinnen Sie nicht mit Stock-Fotos. Authentizität zählt. Wir zeigen, 
                    was Entwickler wirklich sehen wollen – weil wir selbst welche sind.
                  </p>
                  
                  <ul class="space-y-3 mb-6">
                    <li v-for="(feature, idx) in servicesData[3].features" :key="idx"
                        class="flex items-center gap-3 text-gray-300 transform transition-all duration-300"
                        :style="{ transitionDelay: `${idx * 50}ms` }"
                        :class="{ 'translate-x-2': hoveredService === 3 }">
                      <div class="relative flex-shrink-0">
                        <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      </div>
                      <span class="group-hover:text-white transition-colors duration-300">{{ feature }}</span>
                    </li>
                  </ul>

                  <button class="text-[#3dd2cc] font-semibold flex items-center gap-2 group/btn hover:gap-3 transition-all duration-300 relative">
                    <span class="relative z-10">Mehr erfahren</span>
                    <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover/btn:opacity-10 blur-sm rounded transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="absolute top-4 right-4 text-8xl font-bold text-[#3dd2cc] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              04
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section - Advanced Interactive Timeline -->
    <section id="prozess" class="relative z-10 py-20 px-4 bg-gradient-to-br from-[#122d42]/30 to-[#1d486a]/30 backdrop-blur-sm overflow-hidden">
      <!-- Animated Background Grid -->
      <div class="absolute inset-0 opacity-5">
        <div class="animated-grid"></div>
      </div>
      
      <!-- Floating Data Nodes -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div v-for="n in 8" :key="n" 
             class="data-node absolute w-2 h-2 bg-[#3dd2cc] rounded-full"
             :style="getDataNodeStyle(n)"></div>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm mb-6 animate-pulse-subtle">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
            <span class="text-[#3dd2cc] text-sm font-semibold">5-Schritte-Methode</span>
          </div>
          
          <h2 class="text-3xl lg:text-6xl font-bold text-white mb-6">
            So läuft's <span class="text-[#3dd2cc]" data-text="konkret">konkret</span>
          </h2>
          <p class="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            <span class="text-[#3dd2cc] font-semibold">Keine Black Box.</span> Transparente Schritte, 
            messbare Ergebnisse, maximale Effizienz.
          </p>
        </div>

        <div class="relative">
          <!-- Animated Connection Line -->
          <div class="hidden lg:block absolute top-[80px] left-[10%] right-[10%] h-1 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc]/20 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7] origin-left scale-x-0 transition-transform duration-2000 process-line-fill"
                 :style="{ transform: hoveredStep !== null ? 'scaleX(1)' : 'scaleX(0)' }"></div>
            <!-- Moving Data Packet -->
            <div class="data-packet absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#3dd2cc] rounded-full shadow-lg shadow-[#3dd2cc]"></div>
          </div>

          <div class="grid md:grid-cols-5 gap-8 lg:gap-4">
            <div v-for="(step, index) in processSteps" :key="index" 
                 class="group relative text-center perspective-1000 cursor-pointer"
                 @mouseenter="hoveredStep = index"
                 @mouseleave="hoveredStep = null">
              
              <!-- Card Container with 3D Effect -->
              <div class="relative p-6 rounded-2xl transition-all duration-500 transform-gpu"
                   :class="{ 
                     'scale-110 -translate-y-4': hoveredStep === index,
                     'scale-95 opacity-50': hoveredStep !== null && hoveredStep !== index
                   }">
                
                <!-- Holographic Background -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#122d42] to-[#1d486a] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute inset-0 border border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-2xl transition-all duration-500"></div>
                
                <!-- Animated Corner Brackets -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-10 group-hover:h-10"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-10 group-hover:h-10"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-10 group-hover:h-10"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-10 group-hover:h-10"></div>

                <!-- Step Number Circle with Advanced Animation -->
                <div class="relative inline-flex items-center justify-center w-24 h-24 mb-6 mx-auto transform-gpu transition-all duration-500"
                     :class="{ 'rotate-360': hoveredStep === index }">
                  
                  <!-- Outer Rotating Ring -->
                  <div class="absolute inset-0 rounded-full border-2 border-dashed border-[#3dd2cc]/30 group-hover:border-[#3dd2cc] transition-all duration-500"
                       :class="{ 'animate-spin-slow': hoveredStep === index }"></div>
                  
                  <!-- Middle Glow Ring -->
                  <div class="absolute inset-2 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-full opacity-10 group-hover:opacity-30 transition-all duration-500 blur-sm group-hover:blur-md"></div>
                  
                  <!-- Inner Circle -->
                  <div class="absolute inset-3 bg-gradient-to-br from-[#122d42] to-[#1d486a] rounded-full border-2 border-[#3dd2cc] group-hover:border-[#66dcd7] transition-all duration-500 shadow-lg group-hover:shadow-[#3dd2cc]/50"></div>
                  
                  <!-- Progress Ring (SVG) -->
                  <svg class="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="47" fill="none" stroke="#3dd2cc" stroke-width="2" 
                            stroke-dasharray="295" 
                            :stroke-dashoffset="hoveredStep === index ? 0 : 295"
                            class="transition-all duration-1000 ease-out"/>
                  </svg>
                  
                  <!-- Number -->
                  <span class="relative z-10 text-3xl font-bold bg-gradient-to-br from-[#66dcd7] via-[#3dd2cc] to-[#29b3ad] bg-clip-text text-transparent group-hover:scale-125 transition-transform duration-500">
                    {{ index + 1 }}
                  </span>
                  
                  <!-- Pulse Rings -->
                  <div v-for="p in 2" :key="p" 
                       class="absolute inset-0 border-2 border-[#3dd2cc] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000"
                       :style="{ 
                         animationDelay: `${p * 0.3}s`,
                         animation: hoveredStep === index ? 'pulse-ring 2s ease-out infinite' : 'none'
                       }"></div>
                  
                  <!-- Particle Burst -->
                  <div v-if="hoveredStep === index" class="absolute inset-0">
                    <div v-for="n in 8" :key="n" 
                         class="particle-burst absolute w-1 h-1 bg-[#3dd2cc] rounded-full"
                         :style="getParticleBurstStyle(n)"></div>
                  </div>
                </div>

                <!-- Icon Container -->
                <div class="relative w-16 h-16 mx-auto mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                     :class="{ 'scale-100': hoveredStep === index }">
                  <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-xl flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:rotate-12 transition-transform duration-500">
                    <svg class="w-8 h-8 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="getProcessIcon(index)"></svg>
                  </div>
                </div>

                <!-- Content -->
                <div class="relative z-10">
                  <h3 class="text-xl font-bold text-white mb-3 group-hover:text-[#3dd2cc] transition-all duration-300 transform group-hover:scale-105">
                    {{ step.title }}
                  </h3>
                  <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed min-h-[60px]">
                    {{ step.description }}
                  </p>
                  
                  <!-- Progress Indicator -->
                  <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div class="flex items-center justify-center gap-1">
                      <div v-for="d in 3" :key="d" 
                           class="w-1.5 h-1.5 bg-[#3dd2cc] rounded-full"
                           :style="{ animationDelay: `${d * 0.15}s` }"
                           :class="{ 'animate-pulse': hoveredStep === index }"></div>
                    </div>
                  </div>
                </div>

                <!-- Scan Effect -->
                <div class="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div class="scan-beam"></div>
                </div>

                <!-- Step Duration Badge -->
                <div class="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full text-[#07121a] text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  {{ getStepDuration(index) }}
                </div>
              </div>

              <!-- Connection Arrow (between steps) -->
              <div v-if="index < processSteps.length - 1" 
                   class="hidden lg:block absolute top-[80px] -right-[calc(50%-40px)] w-[calc(100%-80px)] z-20">
                <svg class="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#3dd2cc" 
                               :class="{ 'opacity-100': hoveredStep === index || hoveredStep === index + 1, 'opacity-20': hoveredStep !== index && hoveredStep !== index + 1 }"/>
                    </marker>
                  </defs>
                  <line x1="0" y1="10" x2="100" y2="10" 
                        stroke="#3dd2cc" 
                        :stroke-width="hoveredStep === index || hoveredStep === index + 1 ? '2' : '1'"
                        :opacity="hoveredStep === index || hoveredStep === index + 1 ? '1' : '0.2'"
                        marker-end="url(#arrowhead)"
                        class="transition-all duration-500"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Process Stats -->
          <div class="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div class="text-center p-4 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl backdrop-blur-sm hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div class="text-2xl font-bold text-[#3dd2cc] mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Transparenz</div>
            </div>
            <div class="text-center p-4 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl backdrop-blur-sm hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div class="text-2xl font-bold text-[#3dd2cc] mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Softwaregestützt</div>
            </div>
            <div class="text-center p-4 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl backdrop-blur-sm hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div class="text-2xl font-bold text-[#3dd2cc] mb-1 group-hover:scale-110 transition-transform duration-300">5</div>
              <div class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Schritte</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="warum-binarion" class="relative z-10 py-20 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-bold text-white mb-4">
            Vier Gründe für <span class="text-[#3dd2cc]">Binarion</span>
          </h2>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Was uns von klassischen Recruitern unterscheidet
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(benefit, index) in benefits" :key="index"
               class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 p-8 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-[#3dd2cc]/10 rounded-lg flex items-center justify-center group-hover:bg-[#3dd2cc]/20 transition-colors duration-300">
                <div v-html="benefit.icon" class="text-[#3dd2cc]"></div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 py-24 px-4">
      <div class="container mx-auto max-w-5xl">
        <div class="relative bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-3xl p-12 lg:p-16 overflow-hidden shadow-2xl shadow-[#3dd2cc]/30">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div class="relative z-10 text-center">
            <h3 class="text-4xl lg:text-5xl font-bold text-[#07121a] mb-6">
              Lassen Sie uns sprechen
            </h3>
            <p class="text-xl text-[#122d42] mb-10 max-w-2xl mx-auto">
              Sie haben eine offene Position? Wir haben Kandidaten, die wirklich passen. 
              Kostenloses Erstgespräch – Sie entscheiden dann.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button class="px-10 py-4 bg-[#07121a] text-[#3dd2cc] font-bold rounded-lg text-lg hover:bg-[#122d42] transition-all duration-300 hover:scale-105 shadow-xl">
                Erstgespräch vereinbaren
              </button>
              <button class="px-10 py-4 bg-transparent border-2 border-[#07121a] text-[#07121a] font-bold rounded-lg text-lg hover:bg-[#07121a] hover:text-[#3dd2cc] transition-all duration-300 hover:scale-105">
                Mehr über uns
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Für Unternehmen - Binarion',
  meta: [
    { name: 'description', content: 'IT-Recruiting Services für Unternehmen. Talente finden, Executive Search, Team-Building und Employer Branding.' }
  ]
})

const matrixCanvas = ref(null)
const particleCanvas = ref(null)
const hoveredStep = ref(null)
const hoveredService = ref(null)
const badgeHovered = ref(false)
const typedText = ref('')

const techIcons = [
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87C2.904 21.067 0 16.873 0 12zm23.956 5.753l-15.87 15.87C21.067 21.096 24 16.873 24 12c0-1.097-.145-2.183-.427-3.222z"/></svg>',
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>'
]

const servicesData = [
  {
    features: [
      'Active Sourcing über alle Kanäle',
      'Professionelle Kandidatenansprache',
      'Detailliertes Skill-Matching',
      'Vorqualifizierung der Kandidaten'
    ]
  },
  {
    features: [
      'CTO, CIO, IT-Director Suche',
      'Vertrauliche Direktansprache',
      'Executive Assessment',
      'Gehalts- & Vertragsberatung'
    ]
  },
  {
    features: [
      'Projektteam-Aufbau',
      'Entwicklungsabteilungen',
      'Skill-Komplementarität',
      'Cultural-Fit Assessment'
    ]
  },
  {
    features: [
      'Arbeitgeber-Positionierung',
      'Karriereseiten-Optimierung',
      'Social Media Strategie',
      'Candidate Experience Design'
    ]
  }
]

const getTechIconStyle = (i) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '60%', left: '85%' },
    { top: '80%', left: '10%' },
    { top: '25%', left: '90%' },
    { top: '70%', left: '15%' }
  ]
  return {
    ...positions[i % positions.length],
    animationDelay: `${i * 1.5}s`,
    animationDuration: `${20 + i * 2}s`
  }
}

const getStatParticleStyle = (n) => {
  const angles = [0, 90, 180, 270]
  return {
    transform: `rotate(${angles[n - 1]}deg) translateX(30px)`,
    animationDelay: `${n * 0.2}s`
  }
}

const getBinaryDropStyle = (n) => {
  return {
    left: `${20 + n * 30}%`,
    animationDelay: `${n * 0.3}s`,
    animationDuration: `${2 + n * 0.5}s`
  }
}

const getDataNodeStyle = (n) => {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${n * 0.5}s`,
    animationDuration: `${10 + n * 2}s`,
    animation: 'data-node-float 20s ease-in-out infinite'
  }
}

const getParticleBurstStyle = (n) => {
  const angle = (n * 45) * (Math.PI / 180)
  return {
    transform: `translate(-50%, -50%) rotate(${n * 45}deg) translateX(40px)`,
    animationDelay: `${n * 0.05}s`,
    animation: 'particle-burst 0.6s ease-out forwards'
  }
}

const getProcessIcon = (index) => {
  const icons = [
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>',
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>',
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>',
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>'
  ]
  return icons[index]
}

const getStepDuration = (index) => {
  const durations = ['1-2 Tage', '5-7 Tage', '3-5 Tage', '2-3 Tage', '1-2 Tage']
  return durations[index]
}

const hoveredStat = ref(null)

const animatedStats = ref({
  candidates: 0,
  hours: 0,
  software: 0
})

const processSteps = [
  {
    title: 'Briefing',
    description: 'Wir verstehen Ihren Stack, Ihre Kultur, Ihre Schmerzpunkte – nicht nur die Job Description'
  },
  {
    title: 'Sourcing',
    description: 'Softwaregestützte Kandidatensuche + persönliche Ansprache auf Augenhöhe'
  },
  {
    title: 'Screening',
    description: 'Technisches Pre-Screening durch unser Entwicklerteam – wir erkennen echte Skills'
  },
  {
    title: 'Präsentation',
    description: 'Sie bekommen nur Kandidaten, die wirklich passen. Qualität über Quantität.'
  },
  {
    title: 'Prozessbetreuung',
    description: 'Interviewkoordination, Terminabstimmung und Begleitung bis zur erfolgreichen Besetzung'
  }
]

const benefits = [
  {
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
    title: 'Technisches Tiefenwissen',
    description: 'Wir verstehen den Unterschied zwischen Microservices und Monolithen, zwischen React und Vue, zwischen Junior und Senior. Keine Buzzwords – echtes Verständnis.'
  },
  {
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
    title: 'Kommunikation auf Augenhöhe',
    description: 'Kandidaten merken: Hier sitzt kein HR-Generalist, sondern jemand, der ihre Welt kennt. Das schafft Vertrauen. Das überzeugt.'
  },
  {
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    title: 'Schnelle, moderne Prozesse',
    description: 'Datengetrieben, automatisiert wo sinnvoll – menschlich wo nötig. Softwaregestützte Prozesse für maximale Effizienz.'
  },
  {
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
    title: 'Nur relevante Kandidaten',
    description: 'Sie bekommen keine 50 Profile zum Durchforsten. Sie bekommen 3-5 Kandidaten, die wirklich passen. Vorqualifiziert durch unser Tech-Team.'
  }
]

const getParticleStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

const animateCounter = (target, current, key, increment) => {
  if (current < target) {
    animatedStats.value[key] = Math.min(current + increment, target)
    setTimeout(() => animateCounter(target, current + increment, key, increment), 30)
  }
}

const drawMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const binary = '01'
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height
  }

  const draw = () => {
    ctx.fillStyle = 'rgba(7, 18, 26, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#3dd2cc'
    ctx.font = fontSize + 'px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = binary[Math.floor(Math.random() * binary.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const matrixInterval = setInterval(draw, 50)
  return matrixInterval
}

onMounted(() => {
  // Typing effect
  const fullText = 'Top-Talente finden'
  let currentIndex = 0
  const typingInterval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      typedText.value = fullText.slice(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(typingInterval)
    }
  }, 100)

  // Animate stats
  setTimeout(() => {
    animateCounter(150, 0, 'candidates', 2)
    animateCounter(12, 0, 'hours', 1)
    animateCounter(100, 0, 'software', 2)
  }, 500)

  // Start matrix animation
  const matrixInterval = drawMatrix()

  // Particle Canvas Animation
  const canvas = particleCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      })
    }

    const drawParticles = () => {
      ctx.fillStyle = 'rgba(7, 18, 26, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#3dd2cc'
      ctx.strokeStyle = '#3dd2cc'
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.globalAlpha = (100 - distance) / 100 * 0.2
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      requestAnimationFrame(drawParticles)
    }

    drawParticles()
  }

  const handleResize = () => {
    if (matrixCanvas.value) {
      matrixCanvas.value.width = window.innerWidth
      matrixCanvas.value.height = window.innerHeight
    }
    if (particleCanvas.value) {
      particleCanvas.value.width = window.innerWidth
      particleCanvas.value.height = window.innerHeight
    }
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    clearInterval(matrixInterval)
    clearInterval(typingInterval)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* Grid Background */
.grid-background {
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  width: 100%;
  height: 100%;
}

/* Particles */
.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #3dd2cc;
  border-radius: 50%;
  box-shadow: 0 0 10px #3dd2cc;
  animation: float 20s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-40px) translateX(-10px);
  }
  75% {
    transform: translateY(-20px) translateX(5px);
  }
}

/* Pulse Glow */
.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 10px #3dd2cc, 0 0 20px #3dd2cc;
  }
  50% {
    box-shadow: 0 0 20px #3dd2cc, 0 0 30px #3dd2cc, 0 0 40px #3dd2cc;
  }
}

/* Typing Effect */
.typing-container {
  display: inline-block;
  min-width: 20px;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Animated Gradient */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}

/* 3D Transform Effects */
.perspective-1000 {
  perspective: 1000px;
}

.transform-3d {
  transform: rotateX(5deg) rotateY(-5deg) scale(1.02);
  transition: transform 0.5s ease;
}

/* Service Card Patterns */
.hexagon-pattern {
  background-image: 
    repeating-linear-gradient(0deg, #3dd2cc 0 2px, transparent 2px 20px),
    repeating-linear-gradient(90deg, #3dd2cc 0 2px, transparent 2px 20px);
  opacity: 0.1;
}

.network-pattern {
  background-image: 
    radial-gradient(circle at 20px 20px, #3dd2cc 1px, transparent 1px),
    radial-gradient(circle at 60px 60px, #3dd2cc 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: 0 0, 40px 40px;
}

.stars-pattern {
  background-image: 
    radial-gradient(circle, #3dd2cc 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Scan Line Vertical */
.scan-line-vertical {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(61, 210, 204, 0.1) 50%, 
    transparent 100%);
  animation: scan-vertical 3s ease-in-out infinite;
}

@keyframes scan-vertical {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

/* Tech Icons Float */
.tech-icon {
  animation: tech-float 20s ease-in-out infinite;
}

@keyframes tech-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) rotate(5deg);
  }
  50% {
    transform: translateY(-60px) rotate(-5deg);
  }
  75% {
    transform: translateY(-30px) rotate(3deg);
  }
}

/* Glitch Text */
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  color: #66dcd7;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  color: #29b3ad;
  z-index: -2;
}

@keyframes glitch-1 {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes glitch-2 {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(2px, -2px);
  }
  40% {
    transform: translate(2px, 2px);
  }
  60% {
    transform: translate(-2px, -2px);
  }
  80% {
    transform: translate(-2px, 2px);
  }
  100% {
    transform: translate(0);
  }
}

/* Stat Particles */
.stat-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #3dd2cc;
  border-radius: 50%;
  animation: stat-particle-float 2s ease-in-out infinite;
}

@keyframes stat-particle-float {
  0%, 100% {
    opacity: 0;
    transform: translateX(0) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateX(20px) scale(1);
  }
}

/* Binary Drop */
.binary-drop {
  position: absolute;
  color: #3dd2cc;
  font-size: 10px;
  font-family: monospace;
  animation: binary-drop-fall 3s linear infinite;
  opacity: 0.7;
}

@keyframes binary-drop-fall {
  0% {
    top: -20%;
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    top: 120%;
    opacity: 0;
  }
}

/* Orbital Ring */
.orbital-ring {
  width: 120%;
  height: 120%;
  position: absolute;
  top: -10%;
  left: -10%;
  border: 2px solid #3dd2cc;
  border-radius: 50%;
  animation: orbital-ring-spin 4s linear infinite;
  opacity: 0.3;
}

@keyframes orbital-ring-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Clock Hands */
.clock-hands {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.clock-hand {
  position: absolute;
  width: 2px;
  height: 40%;
  background: #3dd2cc;
  top: 10%;
  left: 50%;
  transform-origin: bottom center;
  animation: clock-hand-rotate 3s linear infinite;
}

@keyframes clock-hand-rotate {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

/* 3D Rotate Y */
.rotate-y-12 {
  transform: rotateY(12deg);
}

/* Scan Lines for Buttons */
.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(61, 210, 204, 0.1) 50%,
    transparent 100%
  );
  animation: scan-line-move 2s linear infinite;
}

@keyframes scan-line-move {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Border Spin Animation */
@keyframes border-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-border-spin {
  animation: border-spin 3s linear infinite;
}

/* Circuit Path */
.circuit-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: circuit-path-draw 2s ease-in-out infinite;
}

@keyframes circuit-path-draw {
  0% {
    stroke-dashoffset: 200;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -200;
  }
}

/* Grid Background */
.grid-background {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Glow Text */
.glow-text {
  text-shadow: 0 0 10px rgba(61, 210, 204, 0.5),
               0 0 20px rgba(61, 210, 204, 0.3);
}

/* Reveal Text Animation */
.reveal-text {
  animation: reveal-text 1s ease-out;
}

@keyframes reveal-text {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Process Section Animations */
.animated-grid {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.03) 2px, transparent 2px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.03) 2px, transparent 2px);
  background-size: 100px 100px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px);
  }
}

.data-node {
  animation: data-node-float 20s ease-in-out infinite;
}

@keyframes data-node-float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -50px);
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, -100px);
    opacity: 0.3;
  }
  75% {
    transform: translate(-50px, -50px);
    opacity: 0.8;
  }
}

.data-packet {
  animation: data-packet-move 4s linear infinite;
}

@keyframes data-packet-move {
  0% {
    left: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.rotate-360 {
  transform: rotate(360deg);
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.particle-burst {
  animation: particle-burst 0.6s ease-out forwards;
}

@keyframes particle-burst {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) translateX(60px);
    opacity: 0;
  }
}

.scan-beam {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(61, 210, 204, 0.1) 50%, 
    transparent 100%);
  animation: scan-beam-move 2s ease-in-out infinite;
}

@keyframes scan-beam-move {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}

@keyframes pulse-subtle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}

/* Process Line Fill */
.process-line-fill {
  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>