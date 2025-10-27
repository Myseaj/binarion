<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" :class="[
    isScrolled ? 'bg-[#07121a]/95 backdrop-blur-xl shadow-2xl shadow-[#3dd2cc]/20 border-b border-[#3dd2cc]/20' : 'bg-transparent'
  ]">
    <!-- Animated Border Line -->
    <div class="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
      <div class="scan-line-header absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc] to-transparent"></div>
    </div>

    <!-- Binary Rain in Header -->
    <div class="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <div v-for="i in 20" :key="i" class="header-binary" :style="getHeaderBinaryStyle(i)">
        {{ Math.random() > 0.5 ? '1' : '0' }}
      </div>
    </div>

    <nav class="container mx-auto px-4 lg:px-6 relative z-10">
      <div class="flex items-center justify-between h-20">
        <!-- Logo with Advanced Effects -->
        <NuxtLink to="/" class="flex items-center gap-3 group relative">
          <!-- Hologram Scanner -->
          <div class="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="hologram-scanner"></div>
          </div>
          
          <div class="logo-container relative w-10 h-10 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 group-hover:shadow-2xl group-hover:shadow-[#3dd2cc]/80 transition-all duration-500 overflow-hidden"
               @mouseenter="logoHovered = true"
               @mouseleave="logoHovered = false">
            <!-- Rotating Border -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="rotating-border"></div>
            </div>
            
            <!-- Digital Particles -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div v-for="n in 6" :key="n" class="logo-particle absolute w-1 h-1 bg-[#07121a] rounded-full"
                   :style="getLogoParticleStyle(n)"></div>
            </div>
            
            <span class="text-2xl font-bold text-[#07121a] relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              1
            </span>
            
            <!-- Scan Effect -->
            <div class="scan-effect absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"></div>
          </div>
          
          <div class="hidden sm:block relative">
            <span class="text-2xl font-bold bg-gradient-to-r from-[#66dcd7] to-[#3dd2cc] bg-clip-text text-transparent group-hover:from-[#3dd2cc] group-hover:to-[#66dcd7] transition-all duration-500">
              Binarion
            </span>
            <!-- Glitch Lines -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="glitch-line glitch-line-1"></div>
              <div class="glitch-line glitch-line-2"></div>
            </div>
            <p class="text-xs text-gray-400 -mt-1 group-hover:text-[#3dd2cc] transition-colors duration-300">
              <span class="typing-cursor">Die 1 im digitalen Recruiting</span>
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink 
            to="/" 
            class="nav-link relative text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 font-medium group py-2"
          >
            <span class="relative z-10">Home</span>
            <!-- Animated Underline -->
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] group-hover:w-full transition-all duration-500 shadow-lg shadow-[#3dd2cc]/50"></span>
            <!-- Hex Background -->
            <div class="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="nav-hex-bg"></div>
            </div>
          </NuxtLink>
          
          <div class="relative group">
            <NuxtLink 
              to="/partner"
              class="nav-link relative text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 font-medium flex items-center gap-1 py-2"
            >
              <span class="relative z-10">Für Unternehmen</span>
              <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <!-- Animated Underline -->
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] group-hover:w-full transition-all duration-500 shadow-lg shadow-[#3dd2cc]/50"></span>
            </NuxtLink>
            
            <!-- Enhanced Dropdown -->
            <div class="absolute top-full left-0 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-500">
              <!-- Connection Line -->
              <div class="absolute -top-2 left-8 w-0.5 h-2 bg-gradient-to-b from-[#3dd2cc] to-transparent"></div>
              
              <div class="bg-[#122d42]/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-[#3dd2cc]/30 overflow-hidden">
                <!-- Tech Grid Background -->
                <div class="absolute inset-0 opacity-5 pointer-events-none">
                  <div class="tech-grid"></div>
                </div>
                
                <div class="p-2 relative z-10">
                  <NuxtLink to="/partner" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Übersicht</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/partner#services" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Unsere Recruiting-Services</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/partner#prozess" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Unser Recruiting-Prozess</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/partner#warum-binarion" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Warum Binarion</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                </div>
                
                <!-- Bottom Glow -->
                <div class="h-1 bg-gradient-to-r from-transparent via-[#3dd2cc] to-transparent opacity-50"></div>
              </div>
            </div>
          </div>

          <NuxtLink 
            to="/jobs" 
            class="nav-link relative text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 font-medium group py-2"
          >
            <span class="relative z-10">Jobs</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] group-hover:w-full transition-all duration-500 shadow-lg shadow-[#3dd2cc]/50"></span>
            <div class="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="nav-hex-bg"></div>
            </div>
          </NuxtLink>

          <div class="relative group">
            <NuxtLink 
              to="/kandidaten"
              class="nav-link relative text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 font-medium flex items-center gap-1 py-2"
            >
              <span class="relative z-10">Für Kandidaten</span>
              <svg class="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <!-- Animated Underline -->
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] group-hover:w-full transition-all duration-500 shadow-lg shadow-[#3dd2cc]/50"></span>
            </NuxtLink>
            
            <!-- Enhanced Dropdown -->
            <div class="absolute top-full left-0 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-500">
              <!-- Connection Line -->
              <div class="absolute -top-2 left-8 w-0.5 h-2 bg-gradient-to-b from-[#3dd2cc] to-transparent"></div>
              
              <div class="bg-[#122d42]/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 border border-[#3dd2cc]/30 overflow-hidden">
                <!-- Tech Grid Background -->
                <div class="absolute inset-0 opacity-5 pointer-events-none">
                  <div class="tech-grid"></div>
                </div>
                
                <div class="p-2 relative z-10">
                  <NuxtLink to="/kandidaten" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Übersicht</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/kandidaten#vorteile" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Warum mit uns?</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/kandidaten#process" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">So einfach geht's</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                  <NuxtLink to="/kandidaten#services" class="dropdown-item group/item relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-[#3dd2cc] hover:bg-[#1d486a]/50 rounded-lg transition-all duration-300 overflow-hidden">
                    <div class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pulse-dot"></div>
                    <span class="relative z-10">Unsere Leistungen</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                  </NuxtLink>
                </div>
                
                <!-- Bottom Glow -->
                <div class="h-1 bg-gradient-to-r from-transparent via-[#3dd2cc] to-transparent opacity-50"></div>
              </div>
            </div>
          </div>

          <NuxtLink 
            to="/about" 
            class="nav-link relative text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 font-medium group py-2"
          >
            <span class="relative z-10">Über uns</span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] group-hover:w-full transition-all duration-500 shadow-lg shadow-[#3dd2cc]/50"></span>
            <div class="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="nav-hex-bg"></div>
            </div>
          </NuxtLink>
        </div>

        <!-- CTA Button Desktop with Advanced Effects -->
        <div class="hidden lg:flex items-center gap-4">
          <button class="cta-button group relative px-6 py-2.5 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/30 hover:shadow-2xl hover:shadow-[#3dd2cc]/60 transition-all duration-500 hover:scale-105">
            <!-- Circuit Lines -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path class="circuit-path" d="M0,50 L20,50 L30,30 L70,70 L80,50 L100,50" 
                      stroke="rgba(7,18,26,0.3)" stroke-width="2" fill="none"/>
              </svg>
            </div>
            
            <!-- Shimmer -->
            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
            
            <!-- Rotating Corners -->
            <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#07121a] opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
            <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#07121a] opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              Kontakt
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
            
            <!-- Binary Background -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none">
              <div class="binary-bg text-[8px] font-mono text-[#07121a] whitespace-nowrap">
                {{ binaryBg }}
              </div>
            </div>
          </button>
        </div>

        <!-- Mobile Menu Button with Animation -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden text-gray-300 hover:text-[#3dd2cc] transition-colors duration-300 p-2 relative group"
          aria-label="Toggle menu"
        >
          <div class="relative w-6 h-6">
            <!-- Hamburger Icon -->
            <span class="hamburger-line absolute left-0 w-full h-0.5 bg-current transition-all duration-300"
                  :class="mobileMenuOpen ? 'top-1/2 rotate-45' : 'top-1'"></span>
            <span class="hamburger-line absolute left-0 top-1/2 w-full h-0.5 bg-current transition-all duration-300"
                  :class="mobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'"></span>
            <span class="hamburger-line absolute left-0 w-full h-0.5 bg-current transition-all duration-300"
                  :class="mobileMenuOpen ? 'top-1/2 -rotate-45' : 'bottom-1'"></span>
          </div>
          
          <!-- Glow Effect on Hover -->
          <div class="absolute inset-0 bg-[#3dd2cc] rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 -translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-8"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden bg-[#122d42]/98 backdrop-blur-xl border-t border-[#3dd2cc]/30 relative overflow-hidden"
      >
        <!-- Tech Grid Background -->
        <div class="absolute inset-0 opacity-5 pointer-events-none">
          <div class="tech-grid-mobile"></div>
        </div>
        
        <!-- Animated Particles in Menu -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div v-for="i in 10" :key="i" class="mobile-menu-particle" :style="getMobileParticleStyle(i)"></div>
        </div>
        
        <div class="container mx-auto px-4 py-6 space-y-2 relative z-10">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="mobile-nav-link group relative block px-4 py-3 text-gray-300 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 font-medium overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3dd2cc] group-hover:h-full transition-all duration-300 shadow-lg shadow-[#3dd2cc]/50"></div>
            <span class="relative z-10 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-dot"></span>
              Home
            </span>
          </NuxtLink>

          <!-- Mobile Dropdown -->
          <div class="relative">
            <button 
              @click="mobileDropdownOpen = !mobileDropdownOpen"
              class="mobile-nav-link group relative w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 font-medium overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3dd2cc] group-hover:h-full transition-all duration-300"></div>
              <span class="relative z-10 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-dot"></span>
                Für Unternehmen
              </span>
              <svg 
                class="w-4 h-4 transition-all duration-500 relative z-10" 
                :class="{ 'rotate-180 text-[#3dd2cc]': mobileDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-64"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-64"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="mobileDropdownOpen" class="ml-4 mt-2 space-y-1 overflow-hidden relative">
                <!-- Connection Line -->
                <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#3dd2cc] via-[#3dd2cc]/50 to-transparent"></div>
                
                <NuxtLink 
                  to="/partner" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Übersicht
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/partner#services" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Unsere Recruiting-Services
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/partner#prozess" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Unser Recruiting-Prozess
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/partner#warum-binarion" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Warum Binarion
                  </span>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink 
            to="/jobs" 
            @click="closeMobileMenu"
            class="mobile-nav-link group relative block px-4 py-3 text-gray-300 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 font-medium overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3dd2cc] group-hover:h-full transition-all duration-300"></div>
            <span class="relative z-10 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-dot"></span>
              Jobs
            </span>
          </NuxtLink>

          <!-- Mobile Dropdown Kandidaten -->
          <div class="relative">
            <button 
              @click="mobileKandidatenDropdownOpen = !mobileKandidatenDropdownOpen"
              class="mobile-nav-link group relative w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 font-medium overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3dd2cc] group-hover:h-full transition-all duration-300"></div>
              <span class="relative z-10 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-dot"></span>
                Für Kandidaten
              </span>
              <svg 
                class="w-4 h-4 transition-all duration-500 relative z-10" 
                :class="{ 'rotate-180 text-[#3dd2cc]': mobileKandidatenDropdownOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-64"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-64"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="mobileKandidatenDropdownOpen" class="ml-4 mt-2 space-y-1 overflow-hidden relative">
                <!-- Connection Line -->
                <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#3dd2cc] via-[#3dd2cc]/50 to-transparent"></div>
                
                <NuxtLink 
                  to="/kandidaten" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Übersicht
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/kandidaten#vorteile" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Warum mit uns?
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/kandidaten#process" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    So einfach geht's
                  </span>
                </NuxtLink>
                <NuxtLink 
                  to="/kandidaten#services" 
                  @click="closeMobileMenu"
                  class="group relative block px-4 py-2 pl-6 text-sm text-gray-400 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 overflow-hidden"
                >
                  <div class="absolute inset-0 bg-[#1d486a]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="relative z-10 flex items-center gap-2">
                    <span class="text-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300">▸</span>
                    Unsere Leistungen
                  </span>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink 
            to="/about" 
            @click="closeMobileMenu"
            class="mobile-nav-link group relative block px-4 py-3 text-gray-300 hover:text-[#3dd2cc] rounded-lg transition-all duration-300 font-medium overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-[#3dd2cc]/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#3dd2cc] group-hover:h-full transition-all duration-300"></div>
            <span class="relative z-10 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-dot"></span>
              Über uns
            </span>
          </NuxtLink>

          <div class="pt-4">
            <button class="group relative w-full px-6 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg shadow-lg shadow-[#3dd2cc]/30 hover:shadow-2xl hover:shadow-[#3dd2cc]/60 transition-all duration-500 overflow-hidden">
              <!-- Animated Background -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#29b3ad] to-[#3dd2cc] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Shimmer -->
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>
              
              <span class="relative z-10 flex items-center justify-center gap-2">
                Kontakt
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Bottom Scanner Line -->
        <div class="h-1 bg-gradient-to-r from-transparent via-[#3dd2cc] to-transparent opacity-50"></div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const mobileDropdownOpen = ref(false)
const mobileKandidatenDropdownOpen = ref(false)
const logoHovered = ref(false)
const desktopDropdownHovered = ref(false)
const binaryBg = ref('')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Generate Binary Background
const generateBinaryBg = () => {
  let binary = ''
  for (let i = 0; i < 100; i++) {
    binary += Math.random() > 0.5 ? '1' : '0'
  }
  binaryBg.value = binary
}

// Header Binary Style
const getHeaderBinaryStyle = (i) => {
  return {
    left: `${i * 5}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${5 + Math.random() * 3}s`
  }
}

// Logo Particle Style
const getLogoParticleStyle = (n) => {
  const angle = (n * 60) * (Math.PI / 180)
  const radius = 20
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
    animationDelay: `${n * 0.1}s`
  }
}

// Mobile Menu Particle Style
const getMobileParticleStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${10 + Math.random() * 5}s`
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    mobileDropdownOpen.value = false
    mobileKandidatenDropdownOpen.value = false
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  mobileDropdownOpen.value = false
  mobileKandidatenDropdownOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  generateBinaryBg()
  
  // Regenerate binary every 5 seconds
  const interval = setInterval(generateBinaryBg, 5000)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearInterval(interval)
  })
})

// Close mobile menu when route changes
watch(() => mobileMenuOpen.value, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    mobileDropdownOpen.value = false
    mobileKandidatenDropdownOpen.value = false
  }
})
</script>

<style scoped>
/* Scan Line Header */
.scan-line-header {
  animation: scan-header 3s linear infinite;
}

@keyframes scan-header {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Header Binary */
.header-binary {
  position: absolute;
  font-family: monospace;
  font-size: 12px;
  color: #3dd2cc;
  animation: binary-fall linear infinite;
}

@keyframes binary-fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}

/* Hologram Scanner */
.hologram-scanner {
  position: absolute;
  inset: 0;
  border: 2px solid #3dd2cc;
  border-radius: 0.5rem;
  animation: hologram-scan 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(61, 210, 204, 0.5);
}

@keyframes hologram-scan {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* Rotating Border */
.rotating-border {
  position: absolute;
  inset: -2px;
  background: conic-gradient(from 0deg, transparent, #3dd2cc, transparent);
  border-radius: 0.5rem;
  animation: rotate-border 3s linear infinite;
}

@keyframes rotate-border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Logo Particles */
.logo-particle {
  animation: logo-particle-float 2s ease-in-out infinite;
}

@keyframes logo-particle-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(var(--x, 0), var(--y, 0)) scale(1.5);
    opacity: 1;
  }
}

.logo-particle:nth-child(1) { --x: -10px; --y: -10px; }
.logo-particle:nth-child(2) { --x: 10px; --y: -10px; }
.logo-particle:nth-child(3) { --x: 10px; --y: 10px; }
.logo-particle:nth-child(4) { --x: -10px; --y: 10px; }
.logo-particle:nth-child(5) { --x: 0; --y: -15px; }
.logo-particle:nth-child(6) { --x: 0; --y: 15px; }

/* Scan Effect */
.scan-effect {
  animation: logo-scan 2s ease-in-out infinite;
}

@keyframes logo-scan {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(100%);
  }
}

/* Glitch Lines */
.glitch-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3dd2cc, transparent);
  opacity: 0;
}

.glitch-line-1 {
  top: 30%;
  animation: glitch-line-1 0.4s infinite;
}

.glitch-line-2 {
  top: 70%;
  animation: glitch-line-2 0.4s infinite;
  animation-delay: 0.2s;
}

@keyframes glitch-line-1 {
  0%, 100% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(3px);
  }
}

@keyframes glitch-line-2 {
  0%, 100% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-3px);
  }
}

/* Nav Hex Background */
.nav-hex-bg {
  background-image: repeating-linear-gradient(
    60deg,
    rgba(61, 210, 204, 0.05) 0px,
    rgba(61, 210, 204, 0.05) 1px,
    transparent 1px,
    transparent 10px
  ),
  repeating-linear-gradient(
    -60deg,
    rgba(61, 210, 204, 0.05) 0px,
    rgba(61, 210, 204, 0.05) 1px,
    transparent 1px,
    transparent 10px
  );
  width: 100%;
  height: 100%;
}

/* Tech Grid */
.tech-grid {
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
  width: 100%;
  height: 100%;
}

.tech-grid-mobile {
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  width: 100%;
  height: 100%;
}

/* Pulse Dot */
.pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(61, 210, 204, 0.7);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(61, 210, 204, 0);
  }
}

/* Circuit Path */
.circuit-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: circuit-draw 2s ease-in-out infinite;
}

@keyframes circuit-draw {
  0%, 100% {
    stroke-dashoffset: 200;
  }
  50% {
    stroke-dashoffset: 0;
  }
}

/* Binary Background in Button */
.binary-bg {
  animation: binary-scroll 10s linear infinite;
}

@keyframes binary-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Hamburger Line */
.hamburger-line {
  transform-origin: center;
}

/* Mobile Menu Particles */
.mobile-menu-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #3dd2cc;
  border-radius: 50%;
  animation: mobile-particle-float 15s ease-in-out infinite;
}

@keyframes mobile-particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-30px) translateX(20px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-60px) translateX(-20px);
    opacity: 0.3;
  }
  75% {
    transform: translateY(-30px) translateX(20px);
    opacity: 0.6;
  }
}

/* Smooth transitions for dropdown */
.max-h-0 {
  max-height: 0;
}

.max-h-64 {
  max-height: 16rem;
}

/* Typing Cursor */
.typing-cursor {
  position: relative;
}

.typing-cursor::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 60%;
  background: currentColor;
  animation: cursor-blink 1s infinite;
  opacity: 0;
}

.typing-cursor:hover::after {
  opacity: 1;
}

@keyframes cursor-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
</style>
