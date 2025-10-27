<template>
  <div class="min-h-screen bg-[#07121a] relative overflow-hidden">
    <!-- Animated Matrix Background -->
    <div class="fixed inset-0 z-0">
      <canvas ref="matrixCanvas" class="w-full h-full opacity-15"></canvas>
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

    <!-- Loading State -->
    <div v-if="loading" class="relative z-10 min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block relative">
          <div class="loading-spinner"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-16 h-16 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <p class="text-xl text-[#3dd2cc] mt-6 font-semibold animate-pulse">Lade Jobdetails...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div class="max-w-2xl w-full bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-xl p-8 rounded-2xl border border-red-500/50 shadow-2xl">
        <div class="text-center">
          <div class="text-6xl mb-4">⚠️</div>
          <h2 class="text-2xl font-bold text-red-400 mb-4">Fehler aufgetreten</h2>
          <p class="text-gray-300 mb-6">{{ error.message }}</p>
          <NuxtLink to="/jobs" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg hover:scale-105 transition-transform duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Zurück zur Jobübersicht
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Job Details -->
    <div v-else-if="job" class="relative z-10">
      <!-- Back Button -->
      <div class="container mx-auto max-w-7xl px-4 pt-24 pb-6">
        <NuxtLink to="/jobs" class="inline-flex items-center gap-2 text-[#3dd2cc] hover:text-[#66dcd7] transition-colors duration-300 group">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span class="font-semibold">Zurück zur Übersicht</span>
        </NuxtLink>
      </div>

      <!-- Hero Section -->
      <section class="relative px-4 py-12 overflow-hidden">
        <div class="container mx-auto max-w-7xl">
          <div class="relative bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-xl rounded-3xl border border-[#3dd2cc]/30 overflow-hidden group">
            <!-- Hero Background Image with Parallax -->
            <div class="absolute inset-0 z-0" :style="{ transform: `translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)` }">
              <img :src="heroImageUrl" @error="heroImageUrl = defaultHeroImageUrl" :alt="job.location" class="w-full h-full object-cover opacity-20 transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-br from-[#07121a]/90 to-[#122d42]/90"></div>
            </div>

            <!-- Animated Particles with Mouse Interaction -->
            <div class="absolute inset-0 z-0 overflow-hidden">
              <div v-for="n in 30" :key="n" 
                   class="floating-particle" 
                   :style="getParticleStyle(n)"
                   :class="{ 'particle-glow': Math.abs(mouseX - n * 50) < 100 && Math.abs(mouseY - n * 50) < 100 }"></div>
            </div>

            <!-- Multiple Scan Lines -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
              <div class="scan-line"></div>
              <div class="scan-line-horizontal"></div>
            </div>

            <!-- Glowing Orbs -->
            <div class="absolute top-20 right-20 w-32 h-32 bg-[#3dd2cc] rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            <div class="absolute bottom-20 left-20 w-40 h-40 bg-[#66dcd7] rounded-full blur-3xl opacity-15 animate-pulse-slower"></div>

            <!-- Orbital Rings -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
              <div class="orbital-ring"></div>
              <div class="orbital-ring" style="animation-delay: -2s; animation-duration: 12s;"></div>
              <div class="orbital-ring" style="animation-delay: -4s; animation-duration: 16s;"></div>
            </div>

            <!-- Data Streams -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div v-for="n in 8" :key="`stream-${n}`" 
                   class="data-stream"
                   :style="{ 
                     left: `${n * 12}%`, 
                     animationDelay: `${n * 0.5}s`,
                     animationDuration: `${3 + n * 0.3}s`
                   }"></div>
            </div>

            <!-- Content -->
            <div class="relative z-20 p-8 lg:p-16">
              <!-- Job Badge -->
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm mb-6">
                <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
                <span class="text-[#3dd2cc] text-sm font-semibold">{{ job.position_type || 'Festanstellung' }}</span>
              </div>

              <!-- Job Title -->
              <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                <span class="bg-gradient-to-r from-[#66dcd7] via-[#3dd2cc] to-[#29b3ad] bg-clip-text text-transparent">
                  {{ job.title }}
                </span>
              </h1>

              <!-- Job Meta -->
              <div class="flex flex-wrap gap-6 mb-8">
                <!-- Company -->
                <div class="flex items-center gap-3 group/meta transform hover:scale-110 transition-all duration-300 cursor-pointer"
                     @mouseenter="hoveredSection = 'company'"
                     @mouseleave="hoveredSection = null">
                  <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30 group-hover/meta:bg-[#3dd2cc]/20 group-hover/meta:rotate-12 transition-all duration-300 relative">
                    <svg class="w-6 h-6 text-[#3dd2cc] group-hover/meta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <div v-if="hoveredSection === 'company'" class="absolute inset-0 bg-[#3dd2cc] opacity-20 rounded-lg animate-ping"></div>
                  </div>
                  <div>
                    <p class="text-white font-semibold group-hover/meta:text-[#3dd2cc] transition-colors duration-300">{{ job.company }}</p>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-center gap-3 group/meta transform hover:scale-110 transition-all duration-300 cursor-pointer"
                     @mouseenter="hoveredSection = 'location'"
                     @mouseleave="hoveredSection = null">
                  <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30 group-hover/meta:bg-[#3dd2cc]/20 group-hover/meta:rotate-12 transition-all duration-300 relative">
                    <svg class="w-6 h-6 text-[#3dd2cc] group-hover/meta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div v-if="hoveredSection === 'location'" class="absolute inset-0 bg-[#3dd2cc] opacity-20 rounded-lg animate-ping"></div>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wider">Standort</p>
                    <p class="text-white font-semibold group-hover/meta:text-[#3dd2cc] transition-colors duration-300">{{ job.location }}</p>
                  </div>
                </div>

                <!-- Salary -->
                <div v-if="job.salary_range" class="flex items-center gap-3 group/meta transform hover:scale-110 transition-all duration-300 cursor-pointer"
                     @mouseenter="hoveredSection = 'salary'"
                     @mouseleave="hoveredSection = null">
                  <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30 group-hover/meta:bg-[#3dd2cc]/20 group-hover/meta:rotate-12 transition-all duration-300 relative">
                    <svg class="w-6 h-6 text-[#3dd2cc] group-hover/meta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div v-if="hoveredSection === 'salary'" class="absolute inset-0 bg-[#3dd2cc] opacity-20 rounded-lg animate-ping"></div>
                  </div>
                  <div>
                    <p class="text-xs text-gray-400 uppercase tracking-wider">Gehalt</p>
                    <p class="text-white font-semibold group-hover/meta:text-[#3dd2cc] transition-colors duration-300">{{ job.salary_range }}</p>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <NuxtLink :to="applyLink" class="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-105 relative">
                <div class="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <span class="relative z-10">Jetzt bewerben</span>
                <svg class="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </NuxtLink>
            </div>

            <!-- Corner Decoration -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#3dd2cc] rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="px-4 py-12">
        <div class="container mx-auto max-w-7xl">
          <div class="grid lg:grid-cols-3 gap-8">
            
            <!-- Left Column - Main Content -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- Introduction -->
              <div v-if="job.jobad_introduction" class="content-card group">
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div class="hexagon-pattern"></div>
                </div>
                <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                <div class="relative z-10 job-content" v-html="job.jobad_introduction"></div>
              </div>

              <!-- Tasks Section -->
              <div v-if="job.jobad_tasks" class="content-card group perspective-card">
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div class="hexagon-pattern"></div>
                </div>
                <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-6 group/header">
                    <div class="w-1 h-8 bg-gradient-to-b from-[#3dd2cc] to-transparent animate-pulse"></div>
                    <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30 group-hover/header:bg-[#3dd2cc]/20 group-hover/header:border-[#3dd2cc]/50 transition-all duration-300 group-hover/header:rotate-12 group-hover/header:scale-110">
                      <svg class="w-6 h-6 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-white group-hover/header:text-[#3dd2cc] transition-colors duration-300">Ihre Aufgaben</h2>
                    <div class="flex-1 h-px bg-gradient-to-r from-[#3dd2cc]/50 to-transparent"></div>
                  </div>
                  <div class="job-content animated-list" v-html="formattedTasks"></div>
                </div>
              </div>

              <!-- Profile Section -->
              <div v-if="job.jobad_candidate_profile" class="content-card group perspective-card">
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div class="hexagon-pattern"></div>
                </div>
                <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-6 group/header">
                    <div class="w-1 h-8 bg-gradient-to-b from-[#3dd2cc] to-transparent animate-pulse" style="animation-delay: 0.1s;"></div>
                    <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30 group-hover/header:bg-[#3dd2cc]/20 group-hover/header:border-[#3dd2cc]/50 transition-all duration-300 group-hover/header:rotate-12 group-hover/header:scale-110">
                      <svg class="w-6 h-6 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <h2 class="text-2xl lg:text-3xl font-bold text-white group-hover/header:text-[#3dd2cc] transition-colors duration-300">Ihr Profil</h2>
                    <div class="flex-1 h-px bg-gradient-to-r from-[#3dd2cc]/50 to-transparent"></div>
                  </div>
                  <div class="job-content animated-list" v-html="formattedProfile"></div>
                </div>
              </div>

            </div>

            <!-- Right Column - Sidebar -->
            <div class="space-y-8">
              
              <!-- Benefits -->
              <div v-if="job.jobad_benefit_array && job.jobad_benefit_array.length > 0" class="content-card group">
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div class="hexagon-pattern"></div>
                </div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30">
                      <svg class="w-6 h-6 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                      </svg>
                    </div>
                    <h2 class="text-xl lg:text-2xl font-bold text-white">Ihre Benefits</h2>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <div v-for="(benefit, index) in job.jobad_benefit_array" :key="index" 
                         class="group/benefit bg-[#07121a]/50 p-3 rounded-lg border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 hover:bg-[#3dd2cc]/10 transition-all duration-300 cursor-pointer relative overflow-hidden perspective-card"
                         :style="{ transitionDelay: `${index * 50}ms` }">
                      <!-- Shine effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/benefit:translate-x-full transition-transform duration-700"></div>
                      
                      <!-- Icon with bounce -->
                      <img v-if="iconMapping[benefit]" 
                           :src="iconMapping[benefit]" 
                           :alt="benefit" 
                           class="h-8 w-8 mx-auto mb-2 group-hover/benefit:scale-125 group-hover/benefit:rotate-12 transition-all duration-300 filter brightness-0 invert opacity-70 group-hover/benefit:opacity-100">
                      
                      <!-- Text with slide up -->
                      <p class="text-xs text-gray-300 text-center font-medium group-hover/benefit:text-[#3dd2cc] transition-colors duration-300">{{ benefit }}</p>
                      
                      <!-- Corner accent -->
                      <div class="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-transparent group-hover/benefit:border-t-[#3dd2cc] group-hover/benefit:border-r-[#3dd2cc] transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Person -->
              <div v-if="job.responseUser" class="content-card group">
                <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
                  <div class="hexagon-pattern"></div>
                </div>
                <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                
                <div class="relative z-10">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="p-3 bg-[#3dd2cc]/10 rounded-lg border border-[#3dd2cc]/30">
                      <svg class="w-6 h-6 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <h2 class="text-xl font-bold text-white">Ihr Ansprechpartner</h2>
                  </div>

                  <div class="text-center">
                    <!-- Avatar -->
                    <div class="relative inline-block mb-4">
                      <img v-if="job.responseUser.imageLink" 
                           :src="job.responseUser.imageLink" 
                           :alt="job.responseUser.full_name" 
                           class="w-32 h-32 rounded-full object-cover border-4 border-[#3dd2cc]/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <div v-else class="w-32 h-32 rounded-full bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] flex items-center justify-center text-[#07121a] font-bold text-4xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {{ job.responseUser.firstName?.charAt(0) }}{{ job.responseUser.lastName?.charAt(0) }}
                      </div>
                      <div class="absolute -bottom-1 -right-1 w-8 h-8 bg-[#3dd2cc] rounded-full border-4 border-[#122d42] flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#07121a]" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>

                    <h3 class="text-xl font-bold text-white mb-1">{{ job.responseUser.full_name }}</h3>
                    <p class="text-gray-400 mb-4">{{ job.responseUser.occupation || 'Recruiting Consultant' }}</p>

                    <!-- Contact Info -->
                    <div class="space-y-3 mb-6">
                      <a v-if="job.responseUser.phone" :href="`tel:${job.responseUser.phone}`" class="flex items-center gap-3 p-3 bg-[#07121a]/50 rounded-lg border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 hover:bg-[#3dd2cc]/10 transition-all duration-300">
                        <svg class="w-5 h-5 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span class="text-white text-sm">{{ job.responseUser.phone }}</span>
                      </a>
                      
                      <a v-if="job.responseUser.email" :href="`mailto:${job.responseUser.email}`" class="flex items-center gap-3 p-3 bg-[#07121a]/50 rounded-lg border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 hover:bg-[#3dd2cc]/10 transition-all duration-300">
                        <svg class="w-5 h-5 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-white text-sm">{{ job.responseUser.email }}</span>
                      </a>
                    </div>

                    <!-- Calendly Button -->
                    <a v-if="job.responseUser.calendlyLink" :href="job.responseUser.calendlyLink" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#3dd2cc]/30">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>Termin vereinbaren</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="px-4 py-20">
        <div class="container mx-auto max-w-5xl">
          <div class="relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-12 rounded-3xl border border-[#3dd2cc]/30 overflow-hidden group hover:border-[#3dd2cc]/60 transition-all duration-500">
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div class="network-pattern"></div>
            </div>
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <!-- Animated Corner Accents -->
            <div class="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#3dd2cc]/50 rounded-tl-3xl"></div>
            <div class="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#3dd2cc]/50 rounded-br-3xl"></div>
            
            <!-- Pulse Rings -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
              <div class="absolute inset-0 rounded-full border-2 border-[#3dd2cc]/20 animate-ping"></div>
              <div class="absolute inset-0 rounded-full border-2 border-[#3dd2cc]/10 animate-ping" style="animation-delay: 1s; animation-duration: 3s;"></div>
            </div>
            
            <div class="relative z-10 text-center">
              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-[#3dd2cc] transition-colors duration-300">
                Perfekt für Sie?
              </h2>
              <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Bewerben Sie sich jetzt und werden Sie Teil eines <span class="text-[#3dd2cc] font-semibold">innovativen Teams</span>!
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink :to="applyLink" class="group/cta relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                  <!-- Shine Effect -->
                  <div class="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  <!-- Particles on Hover -->
                  <div class="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                    <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div class="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.2s;"></div>
                    <div class="absolute bottom-1/4 left-3/4 w-1 h-1 bg-white rounded-full animate-ping" style="animation-delay: 0.4s;"></div>
                  </div>
                  <span class="relative z-10 flex items-center gap-2 justify-center">
                    <svg class="w-5 h-5 group-hover/cta:rotate-12 group-hover/cta:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Jetzt bewerben
                  </span>
                </NuxtLink>
                <NuxtLink to="/jobs" class="group/cta2 relative px-8 py-4 bg-[#122d42]/50 border-2 border-[#3dd2cc]/30 text-white font-bold rounded-lg text-lg overflow-hidden hover:bg-[#3dd2cc]/10 hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105">
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#3dd2cc]/10 to-transparent opacity-0 group-hover/cta2:opacity-100 group-hover/cta2:animate-pulse"></div>
                  <span class="relative z-10 flex items-center gap-2 justify-center">
                    <svg class="w-5 h-5 group-hover/cta2:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Weitere Jobs ansehen
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- No Job Found State -->
    <div v-else-if="!loading && !error" class="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div class="text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h2 class="text-2xl font-bold text-white mb-4">Stellenanzeige nicht gefunden</h2>
        <NuxtLink to="/jobs" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg hover:scale-105 transition-transform duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Zurück zur Jobübersicht
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { useHead } from '#app';

const supabaseUrl = 'https://vccbpwvprepehqxatnuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjY2Jwd3ZwcmVwZWhxeGF0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY3MjQsImV4cCI6MTk5MDY0MjcyNH0.zEG6vuzJyiT0penToBCqyTWJnaHjmjGU0TbM7mQkJVY';
const supabase = createClient(supabaseUrl, supabaseKey);

const route = useRoute();
const jobId = route.params.id;

const job = ref(null);
const loading = ref(true);
const error = ref(null);
const matrixCanvas = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const hoveredSection = ref(null)

const heroImageUrl = ref('/img/Cities/job_ad_header.jpg');
const defaultHeroImageUrl = '/img/Cities/job_ad_header.jpg';

const techIcons = [
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595-.061.116-.108.163-.208.208-.073.03-.14.03-.857.03H7.005l-.103-.058a.463.463 0 0 1-.18-.194l-.044-.118.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>',
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M0 12v12h24V0H0v12zm19.34-.956c.608.027 1.106.314 1.39.72.368.52.423 1.152.22 1.945-.18.696-.572 1.183-1.145 1.423-.302.127-.65.18-1.017.163-.525-.02-.95-.165-1.318-.45-.362-.28-.613-.648-.77-1.13-.19-.58-.145-1.104.135-1.605.335-.597.87-.962 1.632-1.042.228-.024.606-.032.873-.024zm-9.586-.04c.57.027 1.03.297 1.345.788.28.433.353.932.227 1.547-.155.757-.578 1.3-1.245 1.595-.267.117-.544.168-.897.168-.31 0-.583-.047-.843-.143-.53-.2-.96-.578-1.24-1.096-.253-.47-.316-.975-.187-1.49.173-.7.65-1.238 1.37-1.542.25-.106.525-.158.843-.175.155-.008.476-.003.627.016zm8.63 2.184c.157 0 .284.015.376.045.168.053.294.152.374.29.088.15.135.36.135.605 0 .31-.06.552-.178.72-.134.19-.326.3-.56.324-.13.014-.376.014-.505 0-.245-.026-.436-.136-.563-.325-.117-.174-.178-.42-.178-.734 0-.236.037-.433.11-.588.1-.207.268-.337.507-.393.09-.02.31-.034.482-.034v.09zm-9.476.004c.15 0 .27.014.357.04.148.045.256.127.33.247.073.118.11.267.11.446 0 .257-.052.463-.154.61-.105.154-.255.254-.447.297-.083.018-.288.027-.605.027-.315 0-.52-.008-.604-.026-.186-.04-.33-.13-.435-.275-.1-.14-.15-.344-.15-.606 0-.238.033-.422.098-.55.086-.17.22-.28.405-.33.123-.033.38-.05.77-.05z"/></svg>'
]

const getTechIconStyle = (i) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '60%', left: '85%' },
    { top: '30%', right: '10%' },
  ]
  return {
    ...positions[i % positions.length],
    animationDelay: `${i * 1.5}s`,
    animationDuration: `${20 + i * 2}s`
  }
}

const getParticleStyle = (n) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

const iconMapping = {
  "Überdurchschnittlicher Verdienst": "/img/Benefits/sack-dollar-solid.png",
  "Inflationsausgleich ": "/img/Benefits/money-bill-trend-up-solid.png",
  "Home Office": "/img/Benefits/house-user-solid.png",
  "Jobrad": "/img/Benefits/bicycle-solid.png",
  "Firmenwagen": "/img/Benefits/car-solid.png",
  "Fitnessangebot": "/img/Benefits/dumbbell-solid.png",
  "Kinderbetreuung ": "/img/Benefits/hands-holding-child-solid.png",
  "Sabbatical": "/img/Benefits/business-time-solid.png",
  "Unternehmensanteile ": "/img/Benefits/money-check-solid.png",
  "Weihnachts- Urlaubsgeld ": "/img/Benefits/gifts-solid.png",
  "Kostenfreie Weiterbildung": "/img/Benefits/user-graduate-solid.png",
  "Firmenevents": "/img/Benefits/champagne-glasses-solid.png",
  "Mitarbeiterrabatte": "/img/Benefits/percent-solid.png",
  "Jobticket": "/img/Benefits/bus-solid.png",
  "Zentrale Lage": "/img/Benefits/city-solid.png",
  "Kostenfreies Parken": "/img/Benefits/square-parking-solid.png",
  "Kostenfreies E-Auto Laden": "/img/Benefits/charging-station-solid.png",
  "Zuschuss Mittagessen": "/img/Benefits/utensils-solid.png",
  "Zusatzkrankenversicherung": "/img/Benefits/money-bill-trend-up-solid.png",
  "Flexible Arbeitszeiten": "/img/Benefits/calendar-check-solid.png",
  "Massagen": "/img/Benefits/spa-solid.png",
  "Betriebsarzt": "/img/Benefits/user-doctor-solid.png",
  "Vier-Tage_Woche": "/img/Benefits/4-solid.png",
  "Betriebliche Altersvorsorge": "/img/Benefits/person-cane-solid.png",
  "Hunde Willkommen": "/img/Benefits/dog-solid.png",
  "Gutscheine ": "/img/Benefits/receipt-solid.png",
};

const formatContentToList = (content) => {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  const items = content.split('- ')
                      .map(item => item.trim())
                      .filter(item => item.length > 0);

  if (items.length <= 1 && !content.startsWith('- ')) {
      return `<p>${content}</p>`;
  }

  const listItems = items.map(item => `<li>${item}</li>`).join('');
  return `<ul class="custom-list">${listItems}</ul>`;
};

const formattedTasks = computed(() => {
  return formatContentToList(job.value?.jobad_tasks);
});

const formattedProfile = computed(() => {
  return formatContentToList(job.value?.jobad_candidate_profile);
});

const fetchJobDetails = async () => {
  if (!jobId) {
    error.value = new Error('Keine Job-ID angegeben.');
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  job.value = {};

  try {
    const { data, error: fetchError } = await supabase
      .from('public_job_ads')
      .select('json')
      .eq('job_id', jobId)
      .eq('is_public', true)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        throw new Error('Stellenanzeige nicht gefunden oder nicht öffentlich.');
      } else {
        throw fetchError;
      }
    }

    console.log(data)

    if (data && data.json) {
      job.value = data.json;
      job.value.locationPath =
      "/img/Cities/" +
      data.json.location.toLowerCase().split(" ")[0].split(",")[0].trim() +
      ".jpg"
      heroImageUrl.value = job.value.locationPath;
    } else {
      throw new Error('Jobdaten nicht im erwarteten Format erhalten.');
    }
  } catch (err) {
    console.error('Error fetching job details:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const applyLink = computed(() => {
  return '/kandidaten';
});

const setupHead = () => {
  if (job.value) {
    useHead({
      title: `${job.value.title || 'Stellenangebot'} - Binarion`,
      meta: [
        { name: 'description', content: job.value.short_description || `Details zur Stelle ${job.value.title || ''} bei Binarion.` }
      ]
    });
  } else {
    useHead({
      title: 'Stellenangebot - Binarion',
      meta: [
        { name: 'description', content: 'Details zu einem Stellenangebot bei Binarion.' }
      ]
    });
  }
};

function drawMatrix() {
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

onMounted(async () => {
  await fetchJobDetails();
  setupHead();
  const matrixInterval = drawMatrix()
  
  // Mouse tracking for interactive effects
  const handleMouseMove = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }
  
  window.addEventListener('mousemove', handleMouseMove)
  
  onUnmounted(() => {
    if (matrixInterval) clearInterval(matrixInterval)
    window.removeEventListener('mousemove', handleMouseMove)
  })
});

watch(job, setupHead, { immediate: true });
</script>

<style scoped>
/* Grid Background */
.grid-background {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
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

/* Loading Spinner */
.loading-spinner {
  width: 120px;
  height: 120px;
  border: 4px solid rgba(61, 210, 204, 0.1);
  border-top: 4px solid #3dd2cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

/* Floating Particles */
.floating-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #3dd2cc;
  border-radius: 50%;
  animation: float-particle 15s infinite ease-in-out;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.particle-glow {
  opacity: 0.8;
  box-shadow: 0 0 10px #3dd2cc, 0 0 20px #3dd2cc;
  transform: scale(2);
}

@keyframes float-particle {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(50px, -50px) rotate(90deg);
  }
  50% {
    transform: translate(-30px, -80px) rotate(180deg);
  }
  75% {
    transform: translate(30px, -40px) rotate(270deg);
  }
}

/* Scan Line */
.scan-line {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(61, 210, 204, 0.1) 50%, 
    transparent 100%);
  animation: scan 3s ease-in-out infinite;
}

.scan-line-horizontal {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, 
    transparent 0%, 
    rgba(61, 210, 204, 0.1) 50%, 
    transparent 100%);
  animation: scan-horizontal 4s ease-in-out infinite;
}

@keyframes scan {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

@keyframes scan-horizontal {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Pulse Animations */
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 6s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

@keyframes pulse-slower {
  0%, 100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.15);
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

/* Perspective Card */
.perspective-card {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.perspective-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(10px);
}

/* Animated List Items */
.animated-list :deep(ul),
.animated-list :deep(ol) {
  list-style: none;
  padding: 0;
  margin: 0;
}

.animated-list :deep(li) {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  padding: 1rem;
  padding-left: 3rem;
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.03), transparent);
  border-left: 2px solid rgba(61, 210, 204, 0.3);
  border-radius: 0.5rem;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0;
  animation: slideInList 0.5s ease-out forwards;
}

.animated-list :deep(li:nth-child(1)) { animation-delay: 0.1s; }
.animated-list :deep(li:nth-child(2)) { animation-delay: 0.15s; }
.animated-list :deep(li:nth-child(3)) { animation-delay: 0.2s; }
.animated-list :deep(li:nth-child(4)) { animation-delay: 0.25s; }
.animated-list :deep(li:nth-child(5)) { animation-delay: 0.3s; }
.animated-list :deep(li:nth-child(6)) { animation-delay: 0.35s; }
.animated-list :deep(li:nth-child(7)) { animation-delay: 0.4s; }
.animated-list :deep(li:nth-child(8)) { animation-delay: 0.45s; }

@keyframes slideInList {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animated-list :deep(li:hover) {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.1), rgba(61, 210, 204, 0.02));
  border-left-color: #3dd2cc;
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(61, 210, 204, 0.2);
}

.animated-list :deep(li::before) {
  content: '';
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #3dd2cc;
  border-radius: 50%;
  box-shadow: 0 0 10px #3dd2cc, 0 0 20px rgba(61, 210, 204, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

.animated-list :deep(li:hover::before) {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
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

/* Content Cards */
.content-card {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.1), rgba(102, 220, 215, 0.05));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(61, 210, 204, 0.1), transparent);
  transition: left 0.6s ease;
}

.content-card:hover::before {
  left: 100%;
}

.content-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(61, 210, 204, 0.6);
  box-shadow: 
    0 20px 40px rgba(61, 210, 204, 0.3),
    0 0 0 1px rgba(61, 210, 204, 0.1) inset,
    0 0 60px rgba(61, 210, 204, 0.1);
}

.content-card:active {
  transform: translateY(-4px) scale(1.01);
}

/* Hexagon Pattern */
.hexagon-pattern {
  background-image: 
    repeating-linear-gradient(0deg, #3dd2cc 0 2px, transparent 2px 20px),
    repeating-linear-gradient(90deg, #3dd2cc 0 2px, transparent 2px 20px);
  opacity: 0.1;
  width: 100%;
  height: 100%;
}

/* Network Pattern */
.network-pattern {
  background-image: 
    radial-gradient(circle at 20px 20px, #3dd2cc 1px, transparent 1px),
    radial-gradient(circle at 60px 60px, #3dd2cc 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: 0 0, 40px 40px;
  width: 100%;
  height: 100%;
}

/* Job Content Styling */
.job-content {
  color: #e5e7eb;
}

.job-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.job-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.job-content :deep(ul.custom-list),
.job-content :deep(ol) {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.job-content :deep(ul.custom-list li) {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  color: #d1d5db;
}

.job-content :deep(ul.custom-list li::before) {
  content: '→';
  position: absolute;
  left: 0;
  top: 0;
  color: #3dd2cc;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: inherit;
}

.job-content :deep(p) {
  margin-bottom: 1rem;
  color: #d1d5db;
  line-height: 1.75;
}

.job-content :deep(a) {
  color: #3dd2cc;
  text-decoration: none;
  transition: all 0.2s ease;
}

.job-content :deep(a:hover) {
  color: #66dcd7;
  text-decoration: underline;
}

.job-content :deep(strong) {
  color: #ffffff;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-card {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .content-card {
    padding: 1.25rem;
  }
  
  .job-content h2 {
    font-size: 1.25rem;
  }
  
  .job-content h3 {
    font-size: 1.1rem;
  }
}
</style>
