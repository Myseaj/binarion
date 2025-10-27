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

    <!-- Hero Section -->
    <section class="relative z-10 px-4 pt-32 pb-20 lg:pt-40 lg:pb-24">
      <div class="container mx-auto max-w-7xl">
        <div class="text-center space-y-8">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer group">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
            <span class="text-[#3dd2cc] text-sm font-semibold">
              Deine Karriere wartet
            </span>
          </div>

          <!-- Main Headline -->
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold text-white max-w-5xl mx-auto leading-tight">
            <span class="typing-container">{{ typedText }}</span>
            <span class="cursor-blink">|</span>
            <span class="block mt-2 bg-gradient-to-r from-[#66dcd7] via-[#3dd2cc] to-[#29b3ad] bg-clip-text text-transparent animate-gradient">
              bei Top-IT-Unternehmen
            </span>
          </h1>

          <!-- Subheadline -->
          <p class="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed reveal-text">
            Entdecke <span class="text-[#3dd2cc] font-semibold glow-text">{{ filteredJobs.length }} aktuelle Stellen</span> – 
            von den besten Arbeitgebern der IT-Branche
          </p>

          <!-- Filter Section -->
          <div class="max-w-4xl mx-auto mt-12">
            <div class="bg-gradient-to-br from-[#122d42]/80 to-[#1d486a]/80 backdrop-blur-xl p-6 rounded-2xl border border-[#3dd2cc]/30 shadow-2xl">
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Position Filter -->
                <div class="relative group">
                  <label class="block text-sm font-semibold text-[#3dd2cc] mb-2">Position / Rolle</label>
                  <div class="relative">
                    <input 
                      v-model="filter.position"
                      @input="filterJobs()"
                      type="text" 
                      placeholder="z.B. Frontend Developer"
                      class="w-full px-4 py-3 bg-[#07121a]/50 border border-[#3dd2cc]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none focus:ring-2 focus:ring-[#3dd2cc]/20 transition-all duration-300"
                    />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2 text-[#3dd2cc]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Location Filter -->
                <div class="relative group">
                  <label class="block text-sm font-semibold text-[#3dd2cc] mb-2">Standort</label>
                  <div class="relative">
                    <select 
                      v-model="filter.locationChosen"
                      @change="filterJobs(filter.locationChosen)"
                      multiple
                      class="w-full px-4 py-3 bg-[#07121a]/50 border border-[#3dd2cc]/30 rounded-lg text-white focus:border-[#3dd2cc] focus:outline-none focus:ring-2 focus:ring-[#3dd2cc]/20 transition-all duration-300"
                    >
                      <option v-for="loc in filter.locations" :key="loc.text" :value="loc.text" class="bg-[#122d42] text-white py-2">
                        {{ loc.text }}
                      </option>
                    </select>
                    <div class="absolute right-3 top-3 text-[#3dd2cc] pointer-events-none">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Selected Filters Display -->
              <div v-if="filter.locationChosen.length > 0" class="mt-4 flex flex-wrap gap-2">
                <span v-for="loc in filter.locationChosen" :key="loc" 
                      class="inline-flex items-center gap-2 px-3 py-1 bg-[#3dd2cc]/20 border border-[#3dd2cc]/50 rounded-full text-sm text-[#3dd2cc]">
                  {{ loc }}
                  <button @click="removeLocation(loc)" class="hover:scale-110 transition-transform">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Jobs Section -->
    <section class="relative z-10 py-20 px-4">
      <div class="container mx-auto max-w-7xl">
        <!-- Loading State -->
        <div v-if="loading" class="space-y-6">
          <div v-for="n in 3" :key="n" class="job-card skeleton">
            <div class="skeleton-header"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-button"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredJobs.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Keine passenden Jobs gefunden</h3>
          <p>Versuche es mit anderen Suchkriterien oder kontaktiere uns direkt für eine persönliche Beratung.</p>
        </div>

        <!-- Jobs List -->
        <div v-else class="jobs-list">
          <div v-for="(job, index) in filteredJobs" :key="index" 
               class="job-card group"
               @mouseenter="hoveredJob = index"
               @mouseleave="hoveredJob = null">
            
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl overflow-hidden">
              <div class="hexagon-pattern"></div>
            </div>

            <!-- Glow Effect -->
            <div class="absolute -top-20 -right-20 w-60 h-60 bg-[#3dd2cc] rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>

            <!-- Scan Line -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div class="scan-line-vertical"></div>
            </div>

            <div class="relative z-10">
              <!-- Job Header -->
              <div class="job-header">
                <div class="flex-1">
                  <h3 class="job-title group-hover:text-[#3dd2cc] transition-colors duration-300">
                    {{ job.title }}
                  </h3>
                  <div class="flex items-center gap-4 mt-3 flex-wrap">
                    <span class="inline-flex items-center gap-2 text-gray-400">
                      <svg class="w-5 h-5 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {{ job.location }}
                    </span>
                    <span v-if="job.salary_min && job.salary_max" class="inline-flex items-center gap-2 text-gray-400 font-semibold">
                      <svg class="w-5 h-5 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-[#66dcd7]">{{ formatSalary(job.salary_min) }} - {{ formatSalary(job.salary_max) }}</span>
                    </span>
                  </div>
                </div>
                
                <span v-if="job.job_type" class="job-badge">
                  {{ job.job_type }}
                </span>
              </div>

              <!-- Benefits -->
              <div v-if="job.emojiArray && job.emojiArray.length > 0" class="flex flex-wrap gap-2 my-4">
                <span v-for="(benefit, idx) in job.emojiArray.slice(0, 6)" :key="idx"
                      class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-lg text-sm text-gray-300 group-hover:bg-[#3dd2cc]/20 transition-all duration-300"
                      :style="{ transitionDelay: `${idx * 50}ms` }">
                  <span class="text-lg">{{ benefit.icon }}</span>
                  {{ benefit.text }}
                </span>
                <span v-if="job.emojiArray.length > 6" class="inline-flex items-center px-3 py-1.5 text-sm text-[#3dd2cc]">
                  +{{ job.emojiArray.length - 6 }} weitere
                </span>
              </div>

              <!-- Job Description Preview -->
              <p v-if="job.description" class="text-gray-400 mb-6 line-clamp-2">
                {{ job.description }}
              </p>

              <!-- Actions -->
              <div class="flex gap-4">
                <NuxtLink 
                  :to="`/job/${job.id}`"
                  class="job-btn group/btn relative">
                  <span>Mehr erfahren</span>
                  <svg class="w-5 h-5 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                  <!-- Button Glow -->
                  <div class="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 blur-sm rounded-full transition-opacity duration-300"></div>
                </NuxtLink>
              </div>
            </div>

            <!-- Card Number -->
            <div class="absolute top-4 right-4 text-8xl font-bold text-[#3dd2cc] opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              {{ String(index + 1).padStart(2, '0') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative z-10 py-24 px-4">
      <div class="container mx-auto max-w-5xl">
        <div class="relative bg-gradient-to-br from-[#122d42] to-[#1d486a] p-12 rounded-3xl border border-[#3dd2cc]/30 overflow-hidden group">
          <!-- Background Effects -->
          <div class="absolute inset-0 opacity-5">
            <div class="network-pattern"></div>
          </div>
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#3dd2cc] rounded-full blur-3xl opacity-20"></div>
          
          <div class="relative z-10 text-center">
            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
              Nicht das Richtige dabei?
            </h2>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Wir haben Zugang zu hunderten weiteren <span class="text-[#3dd2cc] font-semibold">nicht-öffentlichen IT-Positionen</span>. 
              Lass uns gemeinsam deinen Traumjob finden!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/contact" class="group/cta relative px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-lg text-lg overflow-hidden shadow-lg shadow-[#3dd2cc]/50 hover:shadow-2xl hover:shadow-[#3dd2cc]/80 transition-all duration-300 hover:scale-105">
                <div class="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                <span class="relative z-10 flex items-center gap-2 justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Kostenlos beraten lassen
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
import { ref, onMounted, watchEffect } from "vue";
import useGlobalState from "~/composables/useGlobalState";

useHead({
  title: 'Jobs - Binarion',
  meta: [
    { name: 'description', content: 'Entdecke aktuelle IT-Jobs bei Top-Unternehmen. Dein Traumjob wartet!' }
  ]
})

const {
  stateJobObject,
  stateJobs,
  stateFilter,
  updateJobs,
  updateFilters,
  updateJobObject,
} = useGlobalState();

const matrixCanvas = ref(null)
const hoveredJob = ref(null)
const typedText = ref('')

const techIcons = [
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  '<svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595-.061.116-.108.163-.208.208-.073.03-.14.03-.857.03H7.005l-.103-.058a.463.463 0 0 1-.18-.194l-.044-.118.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>'
]

const getTechIconStyle = (i) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '60%', left: '85%' },
    { top: '80%', left: '10%' }
  ]
  return {
    ...positions[i % positions.length],
    animationDelay: `${i * 1.5}s`,
    animationDuration: `${20 + i * 2}s`
  }
}

const iconMapping2 = {
  "Überdurchschnittlicher Verdienst": "💶",
  "Inflationsausgleich ": "📈",
  "Home Office": "🏠",
  Jobrad: "🚴‍♂️",
  Firmenwagen: "🚘",
  Fitnessangebot: "🏋️‍♂️",
  "Kinderbetreuung ": "👪",
  Sabbatical: "📆",
  "Unternehmensanteile ": "💸",
  "Weihnachts- Urlaubsgeld ": "🎄",
  "Kostenfreie Weiterbildung": "👩‍🎓 ",
  Firmenevents: "🥂",
  Mitarbeiterrabatte: "󠀥%",
  Jobticket: "🚋",
  "Zentrale Lage": "🏙️",
  "Kostenfreies Parken": "🅿️",
  "Kostenfreies E-Auto Laden": "🔌",
  "Zuschuss Mittagessen": "🍲",
  Zusatzkrankenversicherung: "🏥",
  "Flexible Arbeitszeiten": "⏱️",
  Massagen: "💆‍♂️",
  Betriebsarzt: "🧑‍⚕️",
  "Vier-Tage_Woche": "4️",
  "Betriebliche Altersvorsorge": "👵",
  "Hunde Willkommen": "🐕",
  "Gutscheine ": "📑",
};

const iconMapping = {
  "Überdurchschnittlicher Verdienst": "/img/Benefits/sack-dollar-solid.png",
  "Inflationsausgleich ": "/img/Benefits/money-bill-trend-up-solid.png",
  "Home Office": "/img/Benefits/house-user-solid.png",
  Jobrad: "/img/Benefits/bicycle-solid.png",
  Firmenwagen: "/img/Benefits/car-solid.png",
  Fitnessangebot: "/img/Benefits/dumbbell-solid.png",
  "Kinderbetreuung ": "/img/Benefits/hands-holding-child-solid.png",
  Sabbatical: "/img/Benefits/business-time-solid.png",
  "Unternehmensanteile ": "/img/Benefits/money-check-solid.png",
  "Weihnachts- Urlaubsgeld ": "/img/Benefits/gifts-solid.png",
  "Kostenfreie Weiterbildung": "/img/Benefits/user-graduate-solid.png",
  Firmenevents: "/img/Benefits/champagne-glasses-solid.png",
  Mitarbeiterrabatte: "/img/Benefits/percent-solid.png",
  Jobticket: "/img/Benefits/bus-solid.png",
  "Zentrale Lage": "/img/Benefits/city-solid.png",
  "Kostenfreies Parken": "/img/Benefits/square-parking-solid.png",
  "Kostenfreies E-Auto Laden": "/img/Benefits/charging-station-solid.png",
  "Zuschuss Mittagessen": "/img/Benefits/utensils-solid.png",
  Zusatzkrankenversicherung: "/img/Benefits/money-bill-trend-up-solid.png",
  "Flexible Arbeitszeiten": "/img/Benefits/calendar-check-solid.png",
  Massagen: "/img/Benefits/spa-solid.png",
  Betriebsarzt: "/img/Benefits/user-doctor-solid.png",
  "Vier-Tage_Woche": "/img/Benefits/4-solid.png",
  "Betriebliche Altersvorsorge": "/img/Benefits/person-cane-solid.png",
  "Hunde Willkommen": "/img/Benefits/dog-solid.png",
  "Gutscheine ": "/img/Benefits/receipt-solid.png",
};

let filter = ref({
  position: "",
  locations: [],
  locationChosen: [],
});

let jobs = ref([]);
let filteredJobs = ref([]);
let mobile = ref(false);
let loading = ref(true);
let iframe = ref(false);
let cities = ref([]);

onMounted(async () => {
  // Typing effect
  const fullText = 'Finde deinen Traumjob'
  let currentIndex = 0
  const typingInterval = setInterval(() => {
    if (currentIndex <= fullText.length) {
      typedText.value = fullText.slice(0, currentIndex)
      currentIndex++
    } else {
      clearInterval(typingInterval)
    }
  }, 100)

  // Matrix animation
  const matrixInterval = drawMatrix()
  
  getJobs();
  filterJobs();

  onUnmounted(() => {
    clearInterval(matrixInterval)
    clearInterval(typingInterval)
  })
});

watchEffect(() => {
  if (filter.value.locationChosen) {
    filterJobs();
  }
});

function removeLocation(location) {
  filter.value.locationChosen = filter.value.locationChosen.filter(loc => loc !== location)
  filterJobs(filter.value.locationChosen)
}

function formatSalary(amount: number): string {
  if (!amount) return ''
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

async function getJobsFeed() {
  var locations = [];
  var url = "https://vccbpwvprepehqxatnuo.supabase.co/rest/v1/public_job_ads";
  var options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjY2Jwd3ZwcmVwZWhxeGF0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY3MjQsImV4cCI6MTk5MDY0MjcyNH0.zEG6vuzJyiT0penToBCqyTWJnaHjmjGU0TbM7mQkJVY",
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjY2Jwd3ZwcmVwZWhxeGF0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY3MjQsImV4cCI6MTk5MDY0MjcyNH0.zEG6vuzJyiT0penToBCqyTWJnaHjmjGU0TbM7mQkJVY",
    },
  };
  var response = await fetch(url, options);
  var jobResponse = await response.clone().json();
  for (var i = 0; i < jobResponse.length; i++) {
    var location = jobResponse[i].json.location;
    locations.push(location.trim());
    jobResponse[i].json.locationPath =
      "/img/Cities/" +
      location.toLowerCase().split(" ")[0].split(",")[0].trim() +
      ".jpg";

    var benefits = jobResponse[i].json.jobad_benefit_array;
    jobResponse[i].json.iconArray = [];
    jobResponse[i].json.emojiArray = [];
    for (var j = 0; j < benefits.length; j++) {
      jobResponse[i].json.iconArray.push({
        text: benefits[j],
        icon: iconMapping[benefits[j]],
      });
      jobResponse[i].json.emojiArray.push({
        text: benefits[j],
        icon: iconMapping2[benefits[j]],
      });
    }
  }
  jobs.value = [];
  jobResponse.forEach((item) => {
    jobs.value.push(item.json);
  });
  var locations = locations.filter((c, index) => {
    return locations.indexOf(c) === index;
  });

  var jobObject = {
    jobs: jobs.value,
    filter: {
      city: "",
      position: "",
      locations: [],
    },
  };
  locations.forEach(function (item) {
    jobObject.filter.locations.push({ text: item, value: null });
  });
  jobObject.filter.locationChosen = [];
  try {
    updateJobObject(jobObject);
    sessionStorage.setItem("jobObjectInStorage", JSON.stringify(jobObject));
  } catch (err) {}
  
  filter.value.locations = jobObject.filter.locations
  
  return jobObject;
}

async function getJobs() {
  var jobObject = await getJobsFeed();
  jobs.value = jobObject.jobs;
  filteredJobs.value = jobs.value;
  loading.value = false;
}

async function filterJobs(locationChosen) {
  filteredJobs.value = [];
  updateFilters(filter.value);
  var locationFilter = locationChosen
    ? locationChosen
    : filter.value.locationChosen;
  if (filter.value.position) {
    var positionFilter = filter.value.position.toLowerCase();
  }
  for (var i = 0; i < jobs.value.length; i++) {
    cities = jobs.value[i].location;
    var position = jobs.value[i].title.toLowerCase();
    var location = jobs.value[i].location.toLowerCase();
    var positionCheck =
      !positionFilter || position.indexOf(positionFilter) > -1;
    if (locationFilter && locationFilter.length > 0) {
      var locationCheck = locationFilter.find(
        (item) => item.toLowerCase() == location,
      );
    } else {
      var locationCheck = true;
    }
    if (positionCheck && locationCheck) {
      filteredJobs.value.push(jobs.value[i]);
    }
  }
}

function setDefaultImage(job) {
  job.locationPath = "/img/partner/partner_header.jpg";
}

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
</script>

<style scoped>
.talent-jobs {
  padding: 0;
  display: block;
  background: transparent;
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

/* Jobs List */
.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.job-card {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.1), rgba(102, 220, 215, 0.05));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #3dd2cc, #66dcd7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.job-card:hover {
  transform: translateY(-4px);
  border-color: rgba(61, 210, 204, 0.5);
  box-shadow: 0 12px 32px rgba(61, 210, 204, 0.25);
}

.job-card:hover::before {
  opacity: 1;
}

.job-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.job-badge {
  background: linear-gradient(135deg, #3dd2cc, #66dcd7);
  color: #07121a;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.job-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #3dd2cc, #66dcd7);
  color: #07121a;
  padding: 0.85rem 1.75rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(61, 210, 204, 0.3);
}

.job-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 6px 20px rgba(61, 210, 204, 0.4);
}

.btn-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.job-btn:hover .btn-arrow {
  transform: translateX(4px);
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

/* Loading Skeleton */
.job-card.skeleton {
  padding: 2rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.4; }
}

.skeleton-header {
  height: 28px;
  width: 60%;
  background: rgba(61, 210, 204, 0.2);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.skeleton-line {
  height: 20px;
  width: 100%;
  background: rgba(61, 210, 204, 0.15);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.skeleton-line.short {
  width: 40%;
}

.skeleton-button {
  height: 44px;
  width: 200px;
  background: rgba(61, 210, 204, 0.2);
  border-radius: 50px;
  margin-top: 1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.1), rgba(102, 220, 215, 0.05));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 15px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #66dcd7;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.75);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 768px) {
  .job-card {
    padding: 1.5rem;
  }

  .job-header {
    flex-direction: column;
    gap: 0.75rem;
  }

  .job-title {
    font-size: 1.25rem;
  }

  .job-badge {
    align-self: flex-start;
  }

  .job-btn {
    width: 100%;
    justify-content: center;
  }

  .empty-state {
    padding: 3rem 1.5rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
  }

  .empty-state p {
    font-size: 0.95rem;
  }
}
</style>