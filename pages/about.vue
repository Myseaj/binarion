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
        <div v-for="n in 30" :key="`particle-${n}`" 
             class="particle absolute w-2 h-2 bg-[#3dd2cc] rounded-full opacity-50"
             :style="getParticleStyle(n)"></div>
        
        <!-- Scan Lines -->
        <div class="scan-line"></div>
        <div class="scan-line-horizontal"></div>
        
        <!-- Orbital Rings -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
          <div class="orbital-ring"></div>
          <div class="orbital-ring" style="animation-delay: -4s; animation-duration: 18s;"></div>
          <div class="orbital-ring" style="animation-delay: -8s; animation-duration: 22s;"></div>
        </div>

        <!-- Data Streams -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div v-for="n in 8" :key="`stream-${n}`" 
               class="data-stream"
               :style="{ left: `${n * 12}%`, animationDelay: `${n * 0.6}s`, animationDuration: `${3 + n * 0.3}s` }"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Animated Title -->
          <div class="mb-8 inline-block">
            <div class="flex items-center gap-4 mb-4">
              <div class="h-px flex-1 bg-gradient-to-r from-transparent to-[#3dd2cc]"></div>
              <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// ABOUT_US.EXE</span>
              <div class="h-px flex-1 bg-gradient-to-l from-transparent to-[#3dd2cc]"></div>
            </div>
          </div>

          <h1 class="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Die <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7] animate-gradient">1</span> im <br/>
            digitalen Recruiting
          </h1>

          <p class="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Wir sind <span class="text-[#3dd2cc] font-semibold">Binarion</span> – Ihr spezialisierter Partner für IT-Recruiting. 
            Mit Leidenschaft, Expertise und modernster Technologie bringen wir die besten Talente mit innovativen Unternehmen zusammen.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div v-for="(stat, index) in stats" :key="index" 
                 class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-6 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                 :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc]/0 to-[#3dd2cc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div class="absolute top-0 right-0 w-20 h-20 bg-[#3dd2cc]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="text-3xl lg:text-4xl font-bold text-[#3dd2cc] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ stat.value }}
                </div>
                <div class="text-gray-300 text-xs lg:text-sm">{{ stat.label }}</div>
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

    <!-- Mission & Vision Section -->
    <section class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Mission -->
          <div class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-10 lg:p-12 rounded-3xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 overflow-hidden">
            <!-- Background Effects -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
            
            <!-- Corner Accents -->
            <div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-tl-3xl transition-all duration-500"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-br-3xl transition-all duration-500"></div>

            <div class="relative z-10">
              <div class="mb-6 inline-block p-5 bg-[#3dd2cc]/10 rounded-2xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-12 h-12 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>

              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-[#3dd2cc] transition-colors duration-300">
                Unsere Mission
              </h2>
              <p class="text-gray-300 text-lg leading-relaxed mb-6">
                Wir revolutionieren das IT-Recruiting durch die perfekte Kombination aus menschlicher Expertise und digitaler Innovation. 
                Unser Ziel ist es, nicht nur Positionen zu besetzen, sondern langfristige, erfolgreiche Partnerschaften zu schaffen.
              </p>
              <p class="text-gray-300 text-lg leading-relaxed">
                Jede Vermittlung ist für uns mehr als nur ein Match – es ist der Start einer neuen Erfolgsgeschichte.
              </p>
            </div>

            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent"></div>
          </div>

          <!-- Vision -->
          <div class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-10 lg:p-12 rounded-3xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 overflow-hidden">
            <!-- Background Effects -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
            
            <!-- Corner Accents -->
            <div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-tl-3xl transition-all duration-500"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#3dd2cc]/0 group-hover:border-[#3dd2cc]/50 rounded-br-3xl transition-all duration-500"></div>

            <div class="relative z-10">
              <div class="mb-6 inline-block p-5 bg-[#3dd2cc]/10 rounded-2xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-12 h-12 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>

              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-[#3dd2cc] transition-colors duration-300">
                Unsere Vision
              </h2>
              <p class="text-gray-300 text-lg leading-relaxed mb-6">
                Wir wollen die führende Plattform für IT-Recruiting in Europa werden – ein Ort, an dem sich Top-Talente 
                und innovative Unternehmen auf Augenhöhe begegnen.
              </p>
              <p class="text-gray-300 text-lg leading-relaxed">
                Mit KI-gestützten Matching-Algorithmen und persönlichem Service setzen wir neue Standards in der Branche.
              </p>
            </div>

            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// OUR_VALUES</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Unsere Werte
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Diese Prinzipien leiten uns bei allem, was wir tun
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(value, index) in values" :key="index"
               class="group relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc] transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
            
            <!-- Background Effects -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="hexagon-pattern"></div>
            </div>
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
            
            <!-- Number Badge -->
            <div class="absolute top-4 right-4 w-12 h-12 bg-[#3dd2cc]/10 rounded-xl flex items-center justify-center text-[#3dd2cc] font-bold text-xl border border-[#3dd2cc]/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              {{ index + 1 }}
            </div>

            <div class="relative z-10">
              <!-- Icon -->
              <div class="mb-6 inline-block p-4 bg-[#3dd2cc]/10 rounded-xl border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <div v-html="value.icon" class="w-8 h-8 text-[#3dd2cc]"></div>
              </div>

              <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-[#3dd2cc] transition-colors duration-300">
                {{ value.title }}
              </h3>
              <p class="text-gray-300 leading-relaxed">
                {{ value.description }}
              </p>
            </div>

            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section - Gaming Character Selection Style -->
    <section class="py-20 px-4 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center mb-16">
          <div class="inline-block mb-4">
            <span class="text-[#3dd2cc] font-mono text-sm tracking-wider animate-pulse">// LEADERSHIP_TEAM</span>
          </div>
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-6">
            Unser <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7]">Führungsteam</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            [ INNOVATION TRIFFT EXPERTISE ]
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div v-for="(member, index) in team" :key="index"
               class="character-card group relative cursor-pointer flex"
               :style="{ animationDelay: `${index * 0.15}s` }">
            
            <!-- Outer Glow Frame (Gaming Style) -->
            <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] via-[#29b3ad] to-[#3dd2cc] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-pulse-slow"></div>
            
            <!-- Card Container -->
            <div class="relative bg-gradient-to-br from-[#0a1820] to-[#122d42] rounded-3xl border-2 border-[#3dd2cc]/20 group-hover:border-[#3dd2cc] transition-all duration-500 overflow-hidden flex flex-col w-full">
              
              <!-- Corner UI Elements (Gaming HUD Style) -->
              <div class="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div class="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              <!-- Scan Lines Effect -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <div class="character-scanline"></div>
              </div>

              <!-- Character Class Badge -->
              <div class="absolute top-4 right-4 z-20">
                <div class="bg-gradient-to-r from-[#3dd2cc]/20 to-[#29b3ad]/20 border-2 border-[#3dd2cc]/50 rounded-lg px-3 py-1 backdrop-blur-sm group-hover:border-[#3dd2cc] group-hover:scale-110 transition-all duration-300">
                  <span class="text-[#3dd2cc] font-bold text-xs font-mono uppercase tracking-wider">{{ member.class }}</span>
                </div>
              </div>

              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div class="hexagon-pattern"></div>
              </div>

              <!-- Animated Background Glow -->
              <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:animate-pulse"></div>

              <div class="relative z-10 p-8 flex flex-col flex-1">
                <!-- Character Portrait Container -->
                <div class="relative mb-6">
                  <!-- Portrait Glow Effect -->
                  <div class="absolute inset-0 bg-[#3dd2cc] rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  
                  <!-- Portrait Frame -->
                  <div class="relative mx-auto w-40 h-40 rounded-2xl overflow-hidden">
                    <!-- Animated Border -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] via-[#66dcd7] to-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                    
                    <!-- Inner Frame -->
                    <div class="relative w-full h-full bg-[#07121a] rounded-2xl p-1">
                      <div class="w-full h-full rounded-xl overflow-hidden border-2 border-[#3dd2cc]/30 group-hover:border-[#3dd2cc] transition-all duration-500">
                        <img :src="member.image" :alt="member.name" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                        
                        <!-- Hologram Effect Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-b from-[#3dd2cc]/20 via-transparent to-[#3dd2cc]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Character Status Indicator -->
                  <div class="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <div class="bg-[#07121a] rounded-full p-1 border-2 border-[#3dd2cc]/50 group-hover:border-[#3dd2cc] transition-all duration-300">
                      <div class="w-3 h-3 bg-[#3dd2cc] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <!-- Character Info -->
                <div class="text-center mb-6">
                  <h3 class="text-2xl font-bold text-white mb-1 group-hover:text-[#3dd2cc] transition-colors duration-300 font-mono uppercase tracking-wide">
                    {{ member.name.split(' ')[0] }}
                  </h3>
                  <p class="text-lg text-white/60 mb-2 font-mono">{{ member.name.split(' ')[1] }}</p>
                  <div class="inline-block bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-lg px-4 py-1 group-hover:bg-[#3dd2cc]/20 group-hover:border-[#3dd2cc] transition-all duration-300">
                    <p class="text-[#3dd2cc] font-semibold text-sm uppercase tracking-wider">
                      {{ member.role }}
                    </p>
                  </div>
                </div>

                <!-- Character Stats Bars -->
                <div class="space-y-3 mb-6">
                  <div v-for="(stat, statIndex) in member.stats" :key="statIndex" class="relative">
                    <div class="flex justify-between mb-1">
                      <span class="text-xs font-mono text-gray-400 uppercase">{{ stat.name }}</span>
                      <span class="text-xs font-mono text-[#3dd2cc] font-bold">{{ stat.value }}%</span>
                    </div>
                    <div class="h-2 bg-[#122d42] rounded-full overflow-hidden border border-[#3dd2cc]/20">
                      <div class="stat-bar h-full bg-gradient-to-r from-[#3dd2cc] to-[#66dcd7] rounded-full relative overflow-hidden"
                           :style="{ width: '0%' }"
                           :data-width="`${stat.value}%`">
                        <!-- Animated Shine on Stat Bar -->
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Character Special Ability -->
                <div class="bg-gradient-to-r from-[#122d42]/50 to-[#1d486a]/50 rounded-xl p-4 border border-[#3dd2cc]/20 group-hover:border-[#3dd2cc]/50 transition-all duration-300 mb-4 flex-1">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-[#3dd2cc]/20 rounded-lg flex items-center justify-center border border-[#3dd2cc]/30 group-hover:bg-[#3dd2cc]/30 group-hover:border-[#3dd2cc] transition-all duration-300">
                      <svg class="w-4 h-4 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-xs font-mono text-gray-400 mb-1 uppercase">Special Ability</p>
                      <p class="text-sm text-gray-300 leading-relaxed">{{ member.bio }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Hologram Scan Effect -->
              <div class="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1500 bg-gradient-to-b from-transparent via-[#3dd2cc]/10 to-transparent pointer-events-none"></div>
            </div>
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
              Bereit, mit uns zu arbeiten?
            </h2>
            <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ob Sie ein Unternehmen auf der Suche nach Top-Talenten oder ein IT-Experte auf der Suche nach neuen Herausforderungen sind – 
              <span class="text-[#3dd2cc] font-semibold">wir freuen uns auf Sie!</span>
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <NuxtLink to="/partner" class="group/cta relative px-10 py-5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <div class="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <div class="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                  <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
                  <div class="absolute bottom-1/4 left-3/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.4s;"></div>
                </div>
                <span class="relative z-10 flex items-center gap-3 justify-center">
                  <svg class="w-6 h-6 group-hover/cta:rotate-12 group-hover/cta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Für Unternehmen
                </span>
              </NuxtLink>

              <NuxtLink to="/kandidaten" class="group/cta2 relative px-10 py-5 bg-[#122d42]/50 border-2 border-[#3dd2cc]/30 text-white font-bold rounded-xl text-lg overflow-hidden hover:bg-[#3dd2cc]/10 hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent opacity-0 group-hover/cta2:opacity-100 group-hover/cta2:animate-pulse"></div>
                <span class="relative z-10 flex items-center gap-3 justify-center">
                  <svg class="w-6 h-6 group-hover/cta2:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Für Kandidaten
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
  title: 'Über uns - Binarion IT-Recruiting',
  meta: [
    { name: 'description', content: 'Erfahren Sie mehr über Binarion - Ihr spezialisierter Partner für IT-Recruiting. Mission, Vision, Werte und unser engagiertes Team.' }
  ]
})

// Stats Data
const stats = [
  { value: '500+', label: 'Erfolgreiche Vermittlungen' },
  { value: '150+', label: 'Partner-Unternehmen' },
  { value: '95%', label: 'Erfolgsquote' },
  { value: '5+', label: 'Jahre Erfahrung' }
]

// Values Data
const values = [
  {
    title: 'Qualität',
    description: 'Wir setzen auf höchste Standards bei der Auswahl und Vermittlung. Jeder Kandidat wird sorgfältig geprüft und persönlich betreut.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  },
  {
    title: 'Transparenz',
    description: 'Offene Kommunikation ist für uns selbstverständlich. Sie wissen immer genau, wo Sie stehen und was als nächstes passiert.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>'
  },
  {
    title: 'Innovation',
    description: 'Wir nutzen modernste Technologien und KI-gestützte Matching-Algorithmen, um die besten Talente zu finden.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'
  },
  {
    title: 'Partnerschaft',
    description: 'Wir sehen uns als langfristiger Partner, nicht nur als Dienstleister. Ihr Erfolg ist unser Erfolg.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
  },
  {
    title: 'Schnelligkeit',
    description: 'Time-to-Hire ist entscheidend. Wir arbeiten effizient und vermitteln innerhalb kürzester Zeit – ohne Kompromisse bei der Qualität.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
  },
  {
    title: 'Nachhaltigkeit',
    description: 'Wir denken langfristig und achten auf nachhaltige Matches, die beiden Seiten dauerhaft Mehrwert bieten.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
]

// Team Data (Gaming Character Style)
const team = [
  {
    name: 'Aaron Ebermann',
    role: 'Founder & CEO',
    bio: 'Visionär und Stratege mit umfassender Erfahrung im IT-Recruiting. Treibt Innovation und Geschäftsentwicklung voran.',
    image: '/persons/aaron-ebermann.1024x1024.jpg',
    level: 99,
    class: 'Strategist',
    stats: [
      { name: 'Leadership', value: 98 },
      { name: 'Vision', value: 95 },
      { name: 'Strategy', value: 97 }
    ]
  },
  {
    name: 'Matthias Hillebrand',
    role: 'Founder & CTO',
    bio: 'Tech-Experte mit Fokus auf digitale Innovation und KI-gestützte Recruiting-Technologien. Verantwortlich für technische Strategie.',
    image: '/persons/matthias-hillebrand.1024x1024.jpg',
    level: 99,
    class: 'Tech Master',
    stats: [
      { name: 'Innovation', value: 99 },
      { name: 'Technology', value: 96 },
      { name: 'Automated Systems', value: 94 }
    ]
  },
  {
    name: 'David Endrulat',
    role: 'Teamleiter IT-Recruiting',
    bio: 'Führt unser Recruiting-Team mit Leidenschaft. Spezialist für IT-Fachkräfte und langfristige Kandidatenbeziehungen.',
    image: '/persons/david-endrulat.1024x1024.jpg',
    level: 95,
    class: 'Talent Hunter',
    stats: [
      { name: 'Recruiting', value: 97 },
      { name: 'Networking', value: 93 },
      { name: 'Team Lead', value: 91 }
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

  // Animate stat bars on mount
  setTimeout(() => {
    const statBars = document.querySelectorAll('.stat-bar')
    statBars.forEach((bar) => {
      const width = bar.getAttribute('data-width')
      if (width && bar instanceof HTMLElement) {
        bar.style.setProperty('--bar-width', width)
        bar.style.width = width
      }
    })
  }, 500)

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

/* Gaming Character Card Animations */
.character-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.character-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, transparent, #3dd2cc, transparent);
  animation: character-scan 2s linear infinite;
}

@keyframes character-scan {
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

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

/* Stat Bar Animation - triggered on mount */
.stat-bar {
  animation: fillBar 1.5s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes fillBar {
  from {
    width: 0%;
  }
  to {
    width: var(--bar-width, 0%);
  }
}

/* Apply width from data attribute */
.stat-bar {
  width: 0%;
}

.character-card:hover .stat-bar {
  width: var(--bar-width, 0%);
  transition: width 0.8s ease-out;
}
</style>