<template>
  <footer class="relative z-10 bg-[#07121a] border-t border-[#3dd2cc]/20 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Grid Background -->
      <div class="absolute inset-0 opacity-5">
        <div class="footer-grid"></div>
      </div>
      
      <!-- Binary Rain (Subtle) -->
      <div class="absolute inset-0 overflow-hidden opacity-5">
        <div v-for="i in 10" :key="i" class="footer-binary" :style="getFooterBinaryStyle(i)">
          {{ getFooterBinaryChar(i) }}
        </div>

        <!-- Logos Section -->
        <div class="mt-8">
          <h4 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span class="w-1 h-4 bg-[#3dd2cc] rounded-full"></span>
            Unsere Logos
          </h4>
          <div class="flex flex-wrap gap-6 items-center">
            <!-- PNG Logos -->
            <img src="/For Web/png/Black logo - no background.png" alt="Binarion Logo Schwarz" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/png/Color logo - no background.png" alt="Binarion Logo Farbe" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/png/Color logo with background.png" alt="Binarion Logo Farbe BG" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/png/White logo - no background.png" alt="Binarion Logo Weiß" class="h-12 bg-gray-800 rounded p-1" />
            <!-- SVG Logos -->
            <img src="/For Web/svg/Black logo - no background.svg" alt="Binarion Logo SVG Schwarz" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/svg/Color logo - no background.svg" alt="Binarion Logo SVG Farbe" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/svg/Color logo with background.svg" alt="Binarion Logo SVG Farbe BG" class="h-12 bg-white rounded p-1" />
            <img src="/For Web/svg/White logo - no background.svg" alt="Binarion Logo SVG Weiß" class="h-12 bg-gray-800 rounded p-1" />
          </div>
          <p class="text-xs text-gray-500 mt-2">Alle Logos stehen als PNG und SVG zur Verfügung.</p>
        </div>
      </div>

      <!-- Glowing Orbs -->
      <div class="absolute top-0 left-1/4 w-64 h-64 bg-[#3dd2cc] rounded-full blur-[100px] opacity-5"></div>
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-[#29b3ad] rounded-full blur-[100px] opacity-5"></div>
    </div>

    <div class="container mx-auto max-w-7xl px-4 py-16 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 group cursor-pointer">
            <div class="relative w-12 h-12 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-lg flex items-center justify-center shadow-lg shadow-[#3dd2cc]/20 overflow-hidden group-hover:shadow-[#3dd2cc]/50 transition-all duration-500">
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span class="text-3xl font-bold text-[#07121a] relative z-10 group-hover:scale-110 transition-transform duration-300">1</span>
              <!-- Scan Line -->
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out"></div>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white group-hover:text-[#3dd2cc] transition-colors duration-300">Binarion</h3>
              <p class="text-xs text-[#3dd2cc] font-mono tracking-wider">SYSTEM.ONLINE</p>
            </div>
          </div>
          <p class="text-gray-400 leading-relaxed">
            Die 1 im digitalen Recruiting. Wir verbinden Tech-Talente mit Unternehmen, die den Code der Zukunft schreiben.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span class="w-1 h-4 bg-[#3dd2cc] rounded-full"></span>
            Navigation
          </h4>
          <ul class="space-y-3">
            <li v-for="(link, index) in quickLinks" :key="index">
              <NuxtLink :to="link.to" class="text-gray-400 hover:text-[#3dd2cc] transition-colors duration-300 flex items-center gap-2 group">
                <span class="w-1 h-1 bg-[#3dd2cc] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ link.text }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div v-if = "false">
          <h4 class="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span class="w-1 h-4 bg-[#3dd2cc] rounded-full"></span>
            Services
          </h4>
          <ul class="space-y-3">
            <li v-for="(service, index) in services" :key="index">
              <a href="#" class="text-gray-400 hover:text-[#3dd2cc] transition-colors duration-300 flex items-center gap-2 group">
                <span class="w-1 h-1 bg-[#3dd2cc] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span class="group-hover:translate-x-1 transition-transform duration-300">{{ service }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 border-t border-[#3dd2cc]/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Binarion. <span class="hidden sm:inline">All systems operational.</span>
        </div>
        
        <!-- System Status -->
        <div class="flex items-center gap-6 text-sm">
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3dd2cc]/5 border border-[#3dd2cc]/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3dd2cc] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#3dd2cc]"></span>
            </span>
            <span class="text-[#3dd2cc] text-xs font-mono">SYSTEM STATUS: 100%</span>
          </div>
          
          <div class="flex gap-4">
            <NuxtLink to="/impressum" class="text-gray-500 hover:text-[#3dd2cc] transition-colors">Impressum</NuxtLink>
            <NuxtLink to="/datenschutz" class="text-gray-500 hover:text-[#3dd2cc] transition-colors">Datenschutz</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { text: 'Home', to: '/' },
  { text: 'Für Unternehmen', to: '/partner' },
  { text: 'Für Kandidaten', to: '/kandidaten' },
  { text: 'Jobs', to: '/jobs' },
  { text: 'Über uns', to: '/about' },
  { text: 'Kontakt', to: '/contact' }
]

const services = [
  'IT-Recruiting',
  'Executive Search',
  'Freelance Vermittlung',
  'Tech-Consulting'
]

// Deterministic pseudo-random to avoid SSR hydration mismatch
const seededRandom = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const getFooterBinaryStyle = (i) => {
  return {
    left: `${seededRandom(i * 7 + 1) * 100}%`,
    top: `${seededRandom(i * 7 + 2) * 100}%`,
    animationDelay: `${seededRandom(i * 7 + 3) * 5}s`,
    animationDuration: `${10 + seededRandom(i * 7 + 4) * 10}s`,
    opacity: 0.1 + seededRandom(i * 7 + 5) * 0.2
  }
}

const getFooterBinaryChar = (i) => {
  return seededRandom(i * 13) > 0.5 ? '1' : '0'
}
</script>

<style scoped>
.footer-grid {
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  width: 100%;
  height: 100%;
}

.footer-binary {
  position: absolute;
  font-family: monospace;
  color: #3dd2cc;
  font-size: 10px;
  animation: footer-fall linear infinite;
}

@keyframes footer-fall {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}

.social-btn {
  position: relative;
  padding: 8px 16px;
  color: #9ca3af;
  font-size: 0.875rem;
  transition: color 0.3s;
  overflow: hidden;
  border-radius: 0.5rem;
}

.social-btn:hover {
  color: #3dd2cc;
}
</style>
