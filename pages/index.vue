<template>
  <div class="min-h-screen bg-[#07121a] relative overflow-hidden">
    <!-- Animated Matrix Background -->
    <div class="fixed inset-0 z-0">
      <canvas ref="matrixCanvas" class="w-full h-full opacity-20"></canvas>
    </div>

    <!-- Particle Network Background -->
    <div class="fixed inset-0 z-0">
      <div class="particles-container">
        <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
    </div>

    <!-- Grid Background -->
    <div class="fixed inset-0 z-0 opacity-10">
      <div class="grid-background"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
      <!-- Floating Code Snippets -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(snippet, i) in codeSnippets" :key="i" 
             class="code-float absolute text-[#3dd2cc] font-mono text-xs opacity-30"
             :style="getCodeSnippetStyle(i)">
          {{ snippet }}
        </div>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center space-y-8">
          <!-- Logo/Brand with Hologram Effect -->
          <div class="inline-flex items-center gap-3 mb-4 perspective-1000">
            <div class="logo-3d w-16 h-16 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 relative overflow-hidden group cursor-pointer"
                 @mouseenter="logoHovered = true"
                 @mouseleave="logoHovered = false">
              <span class="text-4xl font-bold text-[#07121a] relative z-10 transition-transform duration-300"
                    :class="{ 'scale-110': logoHovered }">1</span>
              <!-- Scan Line Effect -->
              <div class="scan-line absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"></div>
              <!-- Binary Particles -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div v-for="n in 8" :key="n" class="binary-particle absolute text-[10px] font-mono text-[#07121a] font-bold">
                  {{ Math.random() > 0.5 ? '1' : '0' }}
                </div>
              </div>
            </div>
            <h1 class="text-5xl lg:text-7xl font-bold relative">
              <span class="glitch-text bg-gradient-to-r from-[#66dcd7] to-[#3dd2cc] bg-clip-text text-transparent"
                    data-text="Binarion">
                Binarion
              </span>
            </h1>
          </div>

          <!-- Slogan with Typewriter Effect -->
          <p class="text-2xl lg:text-4xl font-semibold text-[#66dcd7] tracking-wide">
            Die <span class="text-[#3dd2cc] font-bold pulse-glow">1</span> im digitalen Recruiting
          </p>

          <!-- Main Headline with Typing Effect -->
          <h2 class="text-3xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight">
            <span class="typing-text">{{ displayText }}</span>
            <span class="cursor-blink">|</span>
          </h2>

          <!-- Subheadline -->
          <p class="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Wir verbinden Top-IT-Professionals mit innovativen Unternehmen. 
            Präzise. Digital. Erstklassig.
          </p>

          <!-- CTA Buttons with Advanced Effects -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button class="group relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-105"
                    @mouseenter="button1Hovered = true"
                    @mouseleave="button1Hovered = false">
              <!-- Animated Border -->
              <div class="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-50 rounded-lg animate-border-spin"></div>
              <!-- Shimmer Effect -->
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              <span class="relative z-10 flex items-center gap-2">
                Talente finden
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            <button class="group relative px-8 py-4 bg-transparent border-2 border-[#3dd2cc] text-[#3dd2cc] font-bold rounded-lg text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                    @mouseenter="button2Hovered = true"
                    @mouseleave="button2Hovered = false">
              <!-- Scan Effect -->
              <div class="absolute inset-0 bg-[#3dd2cc] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <!-- Corner Accents -->
              <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#66dcd7] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
              <span class="relative z-10 flex items-center gap-2">
                Jobs entdecken
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
            </button>
          </div>

          <!-- Stats with Counter Animation -->
          <div class="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16">
            <div class="text-center group cursor-pointer" @mouseenter="hoveredStat = 0" @mouseleave="hoveredStat = null">
              <div class="relative inline-block">
                <div class="text-4xl lg:text-5xl font-bold text-[#3dd2cc] mb-2 transition-all duration-300"
                     :class="{ 'scale-110': hoveredStat === 0 }">
                  {{ animatedStats.placements }}+
                </div>
                <!-- Orbital Ring -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div class="orbital-ring"></div>
                </div>
              </div>
              <div class="text-sm lg:text-base text-gray-400 transition-colors duration-300"
                   :class="{ 'text-[#66dcd7]': hoveredStat === 0 }">
                Erfolgreiche Vermittlungen
              </div>
            </div>
            <div class="text-center border-x border-[#3dd2cc]/30 group cursor-pointer" @mouseenter="hoveredStat = 1" @mouseleave="hoveredStat = null">
              <div class="relative inline-block">
                <div class="text-4xl lg:text-5xl font-bold text-[#3dd2cc] mb-2 transition-all duration-300"
                     :class="{ 'scale-110': hoveredStat === 1 }">
                  {{ animatedStats.satisfaction }}%
                </div>
                <!-- Progress Circle -->
                <svg class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3dd2cc" stroke-width="2" opacity="0.2"/>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3dd2cc" stroke-width="2" 
                          stroke-dasharray="282.7" :stroke-dashoffset="282.7 * (1 - animatedStats.satisfaction / 100)"
                          transform="rotate(-90 50 50)" class="transition-all duration-1000"/>
                </svg>
              </div>
              <div class="text-sm lg:text-base text-gray-400 transition-colors duration-300"
                   :class="{ 'text-[#66dcd7]': hoveredStat === 1 }">
                Zufriedenheitsrate
              </div>
            </div>
            <div class="text-center group cursor-pointer" @mouseenter="hoveredStat = 2" @mouseleave="hoveredStat = null">
              <div class="relative inline-block">
                <div class="text-4xl lg:text-5xl font-bold text-[#3dd2cc] mb-2 transition-all duration-300"
                     :class="{ 'scale-110': hoveredStat === 2 }">
                  {{ animatedStats.responseTime }}h
                </div>
                <!-- Clock Icon Animation -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div class="clock-hand"></div>
                </div>
              </div>
              <div class="text-sm lg:text-base text-gray-400 transition-colors duration-300"
                   :class="{ 'text-[#66dcd7]': hoveredStat === 2 }">
                Durchschn. Reaktionszeit
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator with Mouse -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div class="mouse-scroll">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <div class="arrow-down">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative z-10 py-20 px-4 bg-gradient-to-br from-[#122d42]/50 to-[#1d486a]/50 backdrop-blur-sm">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Warum <span class="text-[#3dd2cc]">Binarion</span>?
          </h3>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Wir setzen neue Maßstäbe im IT-Recruiting
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="feature-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-8 rounded-2xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#3dd2cc]/20 hover:-translate-y-2 cursor-pointer overflow-hidden"
               @mouseenter="hoveredFeature = 0"
               @mouseleave="hoveredFeature = null">
            <!-- Hexagon Background Pattern -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <!-- Glow Effect -->
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden">
                <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <!-- Icon Pulse -->
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500 rounded-lg"></div>
              </div>
              <h4 class="text-xl font-bold text-white mb-3 group-hover:text-[#3dd2cc] transition-colors duration-300">Blitzschnell</h4>
              <p class="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Digitale Prozesse ermöglichen uns eine Reaktionszeit von unter 24 Stunden. Ihre Anfrage ist unsere Priorität.
              </p>
              <!-- Binary Data Stream -->
              <div class="mt-4 font-mono text-xs text-[#3dd2cc] opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div class="data-stream">{{ binaryStream }}</div>
              </div>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="feature-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-8 rounded-2xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#3dd2cc]/20 hover:-translate-y-2 cursor-pointer overflow-hidden"
               @mouseenter="hoveredFeature = 1"
               @mouseleave="hoveredFeature = null">
            <!-- Circuit Board Pattern -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <path d="M10,10 L30,10 L30,30 M70,10 L90,10 L90,30 M10,70 L10,90 L30,90 M70,90 L90,90 L90,70" 
                      stroke="#3dd2cc" stroke-width="0.5" fill="none"/>
              </svg>
            </div>
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden">
                <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500 rounded-lg"></div>
              </div>
              <h4 class="text-xl font-bold text-white mb-3 group-hover:text-[#3dd2cc] transition-colors duration-300">Präzise</h4>
              <p class="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                KI-gestützte Matching-Algorithmen finden die perfekte Übereinstimmung zwischen Kandidaten und Unternehmen.
              </p>
              <!-- AI Processing Indicator -->
              <div class="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="flex gap-1">
                  <div class="w-2 h-2 bg-[#3dd2cc] rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-[#3dd2cc] rounded-full animate-pulse delay-100"></div>
                  <div class="w-2 h-2 bg-[#3dd2cc] rounded-full animate-pulse delay-200"></div>
                </div>
                <span class="text-xs text-[#3dd2cc] font-mono">AI Processing...</span>
              </div>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="feature-card group relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-8 rounded-2xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#3dd2cc]/20 hover:-translate-y-2 cursor-pointer overflow-hidden"
               @mouseenter="hoveredFeature = 2"
               @mouseleave="hoveredFeature = null">
            <!-- Network Nodes Pattern -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle cx="20" cy="20" r="2" fill="#3dd2cc"/>
                <circle cx="80" cy="20" r="2" fill="#3dd2cc"/>
                <circle cx="50" cy="50" r="2" fill="#3dd2cc"/>
                <circle cx="20" cy="80" r="2" fill="#3dd2cc"/>
                <circle cx="80" cy="80" r="2" fill="#3dd2cc"/>
                <line x1="20" y1="20" x2="50" y2="50" stroke="#3dd2cc" stroke-width="0.5"/>
                <line x1="80" y1="20" x2="50" y2="50" stroke="#3dd2cc" stroke-width="0.5"/>
                <line x1="20" y1="80" x2="50" y2="50" stroke="#3dd2cc" stroke-width="0.5"/>
                <line x1="80" y1="80" x2="50" y2="50" stroke="#3dd2cc" stroke-width="0.5"/>
              </svg>
            </div>
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden">
                <svg class="w-8 h-8 text-[#07121a] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500 rounded-lg"></div>
              </div>
              <h4 class="text-xl font-bold text-white mb-3 group-hover:text-[#3dd2cc] transition-colors duration-300">Persönlich</h4>
              <p class="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Trotz digitaler Excellence bleibt der Mensch im Mittelpunkt. Persönliche Betreuung ist unser Versprechen.
              </p>
              <!-- Connection Status -->
              <div class="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
                <span class="text-xs text-[#3dd2cc] font-mono">Online & Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="relative z-10 py-20 px-4">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Unsere <span class="text-[#3dd2cc]">Leistungen</span>
          </h3>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Maßgeschneiderte Recruiting-Lösungen für die IT-Branche
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Service 1 -->
          <div class="bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0 w-12 h-12 bg-[#3dd2cc] rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold text-[#07121a]">1</span>
              </div>
              <div>
                <h4 class="text-2xl font-bold text-white mb-4">Für Unternehmen</h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Executive Search für IT-Führungskräfte</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Direktvermittlung von IT-Spezialisten</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Team-Building & Projektbesetzung</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Employer Branding Beratung</span>
                  </li>
                </ul>
                <button class="mt-6 px-6 py-3 bg-[#3dd2cc] text-[#07121a] font-bold rounded-lg hover:bg-[#66dcd7] transition-colors duration-300">
                  Talente finden →
                </button>
              </div>
            </div>
          </div>

          <!-- Service 2 -->
          <div class="bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 p-10 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0 w-12 h-12 bg-[#29b3ad] rounded-lg flex items-center justify-center">
                <span class="text-2xl font-bold text-[#07121a]">0</span>
              </div>
              <div>
                <h4 class="text-2xl font-bold text-white mb-4">Für IT-Professionals</h4>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Karriereberatung & Positionierung</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Zugang zu exklusiven IT-Positionen</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gehalts- & Vertragsverhandlung</span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-[#3dd2cc] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Kostenloser Service für Kandidaten</span>
                  </li>
                </ul>
                <button class="mt-6 px-6 py-3 bg-[#29b3ad] text-[#07121a] font-bold rounded-lg hover:bg-[#66dcd7] transition-colors duration-300">
                  Jobs entdecken →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack Section -->
    <section class="relative z-10 py-20 px-4 bg-gradient-to-br from-[#122d42]/50 to-[#1d486a]/50">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">
            Unsere <span class="text-[#3dd2cc]">Expertise</span>
          </h3>
          <p class="text-gray-300 text-lg max-w-2xl mx-auto">
            Wir vermitteln Talente in allen relevanten Tech-Bereichen
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">💻</div>
            <h5 class="text-white font-bold mb-2">Software Development</h5>
            <p class="text-sm text-gray-400">Full Stack, Backend, Frontend</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">☁️</div>
            <h5 class="text-white font-bold mb-2">Cloud & DevOps</h5>
            <p class="text-sm text-gray-400">AWS, Azure, Kubernetes</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">🤖</div>
            <h5 class="text-white font-bold mb-2">AI & Data Science</h5>
            <p class="text-sm text-gray-400">ML, Analytics, Big Data</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">🔒</div>
            <h5 class="text-white font-bold mb-2">Cybersecurity</h5>
            <p class="text-sm text-gray-400">Security, Compliance, Risk</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">📱</div>
            <h5 class="text-white font-bold mb-2">Mobile Development</h5>
            <p class="text-sm text-gray-400">iOS, Android, React Native</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">🎨</div>
            <h5 class="text-white font-bold mb-2">UX/UI Design</h5>
            <p class="text-sm text-gray-400">Product Design, Research</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">📊</div>
            <h5 class="text-white font-bold mb-2">Product Management</h5>
            <p class="text-sm text-gray-400">PO, PM, Agile Lead</p>
          </div>
          <div class="bg-[#122d42]/60 p-6 rounded-xl border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/60 transition-all duration-300 text-center group hover:scale-105">
            <div class="text-4xl mb-3">⚙️</div>
            <h5 class="text-white font-bold mb-2">IT Infrastructure</h5>
            <p class="text-sm text-gray-400">System Admin, Network</p>
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
              Bereit für den nächsten Schritt?
            </h3>
            <p class="text-xl text-[#122d42] mb-10 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam die perfekte Lösung für Ihre IT-Recruiting-Herausforderung finden.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button class="px-10 py-4 bg-[#07121a] text-[#3dd2cc] font-bold rounded-lg text-lg hover:bg-[#122d42] transition-all duration-300 hover:scale-105 shadow-xl">
                Kontakt aufnehmen
              </button>
              <button class="px-10 py-4 bg-transparent border-2 border-[#07121a] text-[#07121a] font-bold rounded-lg text-lg hover:bg-[#07121a] hover:text-[#3dd2cc] transition-all duration-300 hover:scale-105">
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Preview -->
    <footer class="relative z-10 py-12 px-4 bg-[#07121a] border-t border-[#3dd2cc]/20">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center">
              <span class="text-2xl font-bold text-[#07121a]">1</span>
            </div>
            <span class="text-2xl font-bold text-[#3dd2cc]">Binarion</span>
          </div>
          <p class="text-gray-400 mb-6">Die 1 im digitalen Recruiting</p>
          <div class="flex justify-center gap-6 mb-8">
            <a href="#" class="text-gray-400 hover:text-[#3dd2cc] transition-colors">LinkedIn</a>
            <a href="#" class="text-gray-400 hover:text-[#3dd2cc] transition-colors">Xing</a>
            <a href="#" class="text-gray-400 hover:text-[#3dd2cc] transition-colors">Instagram</a>
          </div>
          <p class="text-sm text-gray-500">© 2025 Binarion. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Page configuration
useHead({
  title: 'Binarion - Die 1 im digitalen Recruiting',
  meta: [
    { name: 'description', content: 'Binarion - Digitale Talente für Ihre IT-Zukunft. Top IT-Recruiting mit blitzschneller Vermittlung und präzisem Matching.' }
  ]
})

// Refs
const matrixCanvas = ref(null)
const logoHovered = ref(false)
const button1Hovered = ref(false)
const button2Hovered = ref(false)
const hoveredStat = ref(null)
const hoveredFeature = ref(null)

// Typewriter Effect
const fullText = 'Digitale Talente für Ihre IT-Zukunft'
const displayText = ref('')
const currentIndex = ref(0)

// Animated Stats
const animatedStats = ref({
  placements: 0,
  satisfaction: 0,
  responseTime: 0
})

// Binary Stream
const binaryStream = ref('')

// Code Snippets floating
const codeSnippets = [
  'const talent = await find();',
  'if (skill.matches(requirement))',
  'return perfectMatch;',
  'AI.analyze(candidate)',
  '{ status: "hired" }',
  'function recruit() {...}',
  'npm install success',
  'git commit -m "perfect fit"',
  'console.log("matched!");'
]

// Particle Positions
const getParticleStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

const getCodeSnippetStyle = (i) => {
  return {
    left: `${Math.random() * 90}%`,
    top: `${10 + Math.random() * 80}%`,
    animationDelay: `${i * 0.5}s`,
    animationDuration: `${20 + Math.random() * 10}s`
  }
}

// Typewriter Animation
const typeWriter = () => {
  if (currentIndex.value < fullText.length) {
    displayText.value += fullText.charAt(currentIndex.value)
    currentIndex.value++
    setTimeout(typeWriter, 100)
  }
}

// Counter Animation
const animateCounter = (target, current, key, increment) => {
  if (current < target) {
    animatedStats.value[key] = Math.min(current + increment, target)
    setTimeout(() => animateCounter(target, current + increment, key, increment), 30)
  }
}

// Generate Binary Stream
const generateBinaryStream = () => {
  let stream = ''
  for (let i = 0; i < 32; i++) {
    stream += Math.random() > 0.5 ? '1' : '0'
    if ((i + 1) % 8 === 0) stream += ' '
  }
  binaryStream.value = stream
}

// Matrix Rain Effect
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

// Mouse Movement Effect
const handleMouseMove = (e) => {
  const particles = document.querySelectorAll('.particle')
  const mouseX = e.clientX
  const mouseY = e.clientY

  particles.forEach((particle) => {
    const rect = particle.getBoundingClientRect()
    const particleX = rect.left + rect.width / 2
    const particleY = rect.top + rect.height / 2

    const deltaX = mouseX - particleX
    const deltaY = mouseY - particleY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < 150) {
      const force = (150 - distance) / 150
      particle.style.transform = `translate(${deltaX * force * 0.1}px, ${deltaY * force * 0.1}px)`
    } else {
      particle.style.transform = 'translate(0, 0)'
    }
  })
}

onMounted(() => {
  // Start typewriter
  setTimeout(typeWriter, 500)
  
  // Animate counters
  setTimeout(() => {
    animateCounter(500, 0, 'placements', 8)
    animateCounter(98, 0, 'satisfaction', 2)
    animateCounter(24, 0, 'responseTime', 1)
  }, 1000)

  // Generate binary stream
  generateBinaryStream()
  setInterval(generateBinaryStream, 3000)

  // Start matrix effect
  const matrixInterval = drawMatrix()

  // Mouse move effect
  window.addEventListener('mousemove', handleMouseMove)

  // Handle resize
  const handleResize = () => {
    if (matrixCanvas.value) {
      matrixCanvas.value.width = window.innerWidth
      matrixCanvas.value.height = window.innerHeight
    }
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    clearInterval(matrixInterval)
    window.removeEventListener('mousemove', handleMouseMove)
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
.particles-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #3dd2cc;
  border-radius: 50%;
  box-shadow: 0 0 10px #3dd2cc;
  animation: float 20s infinite ease-in-out;
  transition: transform 0.3s ease;
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

/* Code Snippets Floating */
.code-float {
  animation: code-drift 30s infinite linear;
}

@keyframes code-drift {
  0% {
    transform: translateY(100vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0;
  }
}

/* Logo 3D Effect */
.logo-3d {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.logo-3d:hover {
  transform: rotateY(15deg) rotateX(10deg);
}

/* Scan Line */
.scan-line {
  animation: scan 2s infinite;
}

@keyframes scan {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(100%);
  }
}

/* Binary Particles */
.binary-particle {
  animation: binary-float 2s infinite ease-in-out;
}

.binary-particle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.binary-particle:nth-child(2) { top: 20%; right: 30%; animation-delay: 0.2s; }
.binary-particle:nth-child(3) { bottom: 30%; left: 15%; animation-delay: 0.4s; }
.binary-particle:nth-child(4) { bottom: 20%; right: 25%; animation-delay: 0.6s; }
.binary-particle:nth-child(5) { top: 40%; left: 10%; animation-delay: 0.8s; }
.binary-particle:nth-child(6) { top: 60%; right: 20%; animation-delay: 1s; }
.binary-particle:nth-child(7) { bottom: 40%; left: 30%; animation-delay: 1.2s; }
.binary-particle:nth-child(8) { bottom: 50%; right: 15%; animation-delay: 1.4s; }

@keyframes binary-float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

/* Glitch Text Effect */
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text:hover::before,
.glitch-text:hover::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  background: linear-gradient(to right, #66dcd7, #3dd2cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glitch-text:hover::before {
  animation: glitch-1 0.3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}

.glitch-text:hover::after {
  animation: glitch-2 0.3s infinite;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  33% { transform: translate(-2px, 2px); }
  66% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  33% { transform: translate(2px, -2px); }
  66% { transform: translate(-2px, 2px); }
}

/* Typing Effect */
.typing-text {
  background: linear-gradient(to right, #66dcd7, #3dd2cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cursor-blink {
  color: #3dd2cc;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Pulse Glow */
.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    text-shadow: 0 0 10px #3dd2cc, 0 0 20px #3dd2cc;
  }
  50% {
    text-shadow: 0 0 20px #3dd2cc, 0 0 30px #3dd2cc, 0 0 40px #3dd2cc;
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

/* Mouse Scroll Indicator */
.mouse-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid #3dd2cc;
  border-radius: 15px;
  position: relative;
  box-shadow: 0 0 10px rgba(61, 210, 204, 0.3);
}

.wheel {
  width: 4px;
  height: 8px;
  background: #3dd2cc;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-wheel 2s infinite;
  box-shadow: 0 0 5px #3dd2cc;
}

@keyframes scroll-wheel {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
}

.arrow-down {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.arrow-down span {
  width: 12px;
  height: 2px;
  background: #3dd2cc;
  display: block;
  animation: arrow-move 2s infinite;
}

.arrow-down span:nth-child(2) {
  animation-delay: 0.2s;
}

.arrow-down span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes arrow-move {
  0%, 100% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Orbital Ring */
.orbital-ring {
  width: 80px;
  height: 80px;
  border: 2px solid #3dd2cc;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
  box-shadow: 0 0 20px rgba(61, 210, 204, 0.5);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Clock Hand */
.clock-hand {
  width: 2px;
  height: 30px;
  background: #3dd2cc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  animation: clock-tick 2s linear infinite;
  box-shadow: 0 0 10px #3dd2cc;
}

@keyframes clock-tick {
  from {
    transform: translate(-50%, -100%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -100%) rotate(360deg);
  }
}

/* Hexagon Pattern */
.hexagon-pattern {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 20px,
    rgba(61, 210, 204, 0.1) 20px,
    rgba(61, 210, 204, 0.1) 21px
  ),
  repeating-linear-gradient(
    60deg,
    transparent,
    transparent 20px,
    rgba(61, 210, 204, 0.1) 20px,
    rgba(61, 210, 204, 0.1) 21px
  ),
  repeating-linear-gradient(
    -60deg,
    transparent,
    transparent 20px,
    rgba(61, 210, 204, 0.1) 20px,
    rgba(61, 210, 204, 0.1) 21px
  );
  width: 100%;
  height: 100%;
}

/* Data Stream */
.data-stream {
  overflow: hidden;
  white-space: nowrap;
  animation: stream 3s linear infinite;
}

@keyframes stream {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Animation Delays */
.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-700 {
  animation-delay: 700ms;
}

/* Perspective */
.perspective-1000 {
  perspective: 1000px;
}

/* Feature Card Enhancement */
.feature-card {
  backdrop-filter: blur(10px);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3dd2cc, transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.feature-card:hover::before {
  transform: translateX(100%);
}
</style>
