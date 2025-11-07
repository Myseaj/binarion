<template>
  <div class="min-h-screen bg-[#07121a] relative overflow-hidden">
    <!-- Animated Matrix Background -->
    <div class="fixed inset-0 z-0">
      <canvas ref="matrixCanvas" class="w-full h-full opacity-10"></canvas>
    </div>

    <!-- Interactive Particle Network -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <canvas ref="particleCanvas" class="w-full h-full opacity-40"></canvas>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen py-20 px-4">
      <div class="container mx-auto max-w-5xl">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm mb-6">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full"></div>
            <span class="text-[#3dd2cc] text-sm font-semibold">Kandidatenprofil erstellen</span>
          </div>
          
          <h1 class="text-4xl lg:text-6xl font-bold text-white mb-6">
            Den <span class="text-[#3dd2cc]">perfekten Kandidaten</span> finden
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Beantworten Sie ein paar Fragen – wir finden die Talente, die wirklich passen.
          </p>
        </div>

        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-400">Schritt {{ currentStep + 1 }} von {{ totalSteps }}</span>
            <span class="text-sm text-[#3dd2cc] font-semibold">{{ Math.round(((currentStep + 1) / totalSteps) * 100) }}% abgeschlossen</span>
          </div>
          <div class="h-2 bg-[#122d42] rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full transition-all duration-500 ease-out"
                 :style="{ width: `${((currentStep + 1) / totalSteps) * 100}%` }">
            </div>
          </div>
        </div>

        <!-- Question Cards -->
        <div class="relative min-h-[500px]">
          <TransitionGroup name="slide">
            
            <!-- Step 0: Position -->
            <div v-if="currentStep === 0" key="step-0" class="question-card">
              <div class="relative overflow-hidden bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 p-10 rounded-3xl border border-[#3dd2cc]/40 backdrop-blur-xl shadow-2xl shadow-[#3dd2cc]/10">
                <!-- Glass effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                
                <div class="relative mb-10">
                  <h2 class="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3dd2cc]">
                    Welche Position suchen Sie?
                  </h2>
                  <div class="h-1 w-20 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full"></div>
                </div>

                <div class="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-visible overflow-x-visible pr-2 custom-scrollbar py-4">
                  <button v-for="role in roles" :key="role.value"
                          @click="formData.position = role.value"
                          class="group relative overflow-hidden p-4 rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:z-10"
                          :class="formData.position === role.value 
                            ? 'bg-gradient-to-br from-[#3dd2cc]/30 via-[#29b3ad]/20 to-[#3dd2cc]/30 border-2 border-[#3dd2cc] shadow-lg shadow-[#3dd2cc]/50 z-10' 
                            : 'bg-white/5 border border-[#3dd2cc]/20 hover:bg-white/10 hover:border-[#3dd2cc]/60 backdrop-blur-sm'">
                    
                    <!-- Animated gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- Glow effect on hover -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    
                    <div class="relative text-center">
                      <div class="text-4xl mb-2 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-lg">
                        {{ role.icon }}
                      </div>
                      <h3 class="text-sm font-bold text-white group-hover:text-[#3dd2cc] transition-all duration-300 leading-tight">
                        {{ role.label }}
                      </h3>
                      
                      <!-- Selection indicator -->
                      <div v-if="formData.position === role.value" class="absolute -top-2 -right-2">
                        <div class="relative">
                          <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur-md opacity-60 animate-pulse"></div>
                          <div class="relative w-8 h-8 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-full flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 animate-bounce">
                            <svg class="w-5 h-5 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 1: Tech Stack -->
            <div v-if="currentStep === 1" key="step-1" class="question-card">
              <div class="relative overflow-hidden bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 p-10 rounded-3xl border border-[#3dd2cc]/40 backdrop-blur-xl shadow-2xl shadow-[#3dd2cc]/10">
                <!-- Glass effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                
                <div class="relative mb-10">
                  <h2 class="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3dd2cc]">
                    Welcher Tech Stack?
                  </h2>
                  <div class="h-1 w-20 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full"></div>
                </div>

                <div class="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-h-[450px] overflow-y-visible overflow-x-visible pr-2 custom-scrollbar pa-3">
                  <button v-for="tech in availableTechStack" :key="tech"
                          @click="toggleTech(tech)"
                          class="group relative overflow-hidden p-4 rounded-xl transition-all duration-500 hover:z-10"
                          :class="formData.techStack.includes(tech) 
                            ? 'bg-gradient-to-br from-[#3dd2cc]/40 via-[#29b3ad]/30 to-[#3dd2cc]/40 border-2 border-[#3dd2cc] shadow-lg shadow-[#3dd2cc]/50 scale-105 z-10' 
                            : 'bg-white/5 border border-[#3dd2cc]/20 hover:bg-white/10 hover:border-[#3dd2cc]/60 hover:scale-110 backdrop-blur-sm'">
                    
                    <!-- Shine effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div class="relative text-center">
                      <span class="text-sm font-bold text-white group-hover:text-[#3dd2cc] transition-colors duration-300">{{ tech }}</span>
                      
                      <div v-if="formData.techStack.includes(tech)" class="absolute -top-2 -right-2">
                        <div class="relative">
                          <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur-sm opacity-60"></div>
                          <div class="relative w-6 h-6 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-full flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50">
                            <svg class="w-4 h-4 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Selected technologies display -->
                <div v-if="formData.techStack.length > 0" 
                     class="relative mt-8 p-6 bg-gradient-to-br from-[#3dd2cc]/10 via-[#29b3ad]/5 to-[#3dd2cc]/10 border-2 border-[#3dd2cc]/30 rounded-2xl backdrop-blur-lg overflow-hidden">
                  <!-- Glass shine -->
                  <div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                  
                  <div class="relative flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="w-2 h-2 bg-[#3dd2cc] rounded-full animate-pulse"></div>
                      <p class="text-base text-[#3dd2cc] font-bold">Ausgewählte Technologien</p>
                    </div>
                    <div class="relative">
                      <div class="absolute inset-0 bg-[#3dd2cc] blur-lg opacity-30"></div>
                      <span class="relative px-4 py-2 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full text-sm text-[#07121a] font-bold shadow-lg">
                        {{ formData.techStack.length }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="relative flex flex-wrap gap-2">
                    <button v-for="tech in formData.techStack" :key="tech"
                            @click="toggleTech(tech)"
                            class="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-[#3dd2cc]/30 to-[#29b3ad]/30 border border-[#3dd2cc]/50 rounded-full text-sm text-white font-semibold hover:from-[#3dd2cc]/50 hover:to-[#29b3ad]/50 transition-all duration-300 hover:scale-110 hover:-rotate-2 backdrop-blur-sm shadow-lg">
                      <span class="relative z-10">{{ tech }}</span>
                      <span class="relative z-10 ml-2 text-[#3dd2cc] font-bold">×</span>
                      <!-- Hover glow -->
                      <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Location -->
            <div v-if="currentStep === 2" key="step-2" class="question-card">
              <div class="relative overflow-hidden bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 p-10 rounded-3xl border border-[#3dd2cc]/40 backdrop-blur-xl shadow-2xl shadow-[#3dd2cc]/10">
                <!-- Glass effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                
                <div class="relative mb-10">
                  <h2 class="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3dd2cc]">
                    Wo soll gearbeitet werden?
                  </h2>
                  <div class="h-1 w-20 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-full"></div>
                </div>

                <div class="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-visiable overflow-x-visible pr-2 custom-scrollbar pa-4">
                  <button v-for="loc in locations" :key="loc.value"
                          @click="formData.location = loc.value"
                          class="group relative overflow-hidden p-5 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:z-10"
                          :class="formData.location === loc.value 
                            ? 'bg-gradient-to-br from-[#3dd2cc]/30 via-[#29b3ad]/20 to-[#3dd2cc]/30 border-2 border-[#3dd2cc] shadow-lg shadow-[#3dd2cc]/50 z-10' 
                            : 'bg-white/5 border border-[#3dd2cc]/20 hover:bg-white/10 hover:border-[#3dd2cc]/60 backdrop-blur-sm'">
                    
                    <!-- Animated gradient overlay -->
                    <div class="absolute inset-0 bg-gradient-to-br from-[#3dd2cc]/0 via-[#3dd2cc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <!-- Glow effect on hover -->
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    
                    <div class="relative text-center">
                      <h3 class="text-sm font-bold text-white group-hover:text-[#3dd2cc] transition-all duration-300 leading-tight">
                        {{ loc.label }}
                      </h3>
                      
                      <!-- Selection indicator -->
                      <div v-if="formData.location === loc.value" class="absolute -top-2 -right-2">
                        <div class="relative">
                          <div class="absolute inset-0 bg-[#3dd2cc] rounded-full blur-md opacity-60 animate-pulse"></div>
                          <div class="relative w-8 h-8 bg-gradient-to-br from-[#3dd2cc] to-[#29b3ad] rounded-full flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50 animate-bounce">
                            <svg class="w-5 h-5 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Summary Step -->
            <!-- Step 3: Summary -->
            <div v-if="currentStep === 3" key="summary" class="step-slide">
              <div>
                <div class="text-center mb-8">
                  <h2 class="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-[#3dd2cc] via-white to-[#29b3ad] bg-clip-text text-transparent">
                    Perfekt! 🚀
                  </h2>
                  <p class="text-gray-300 text-lg">Hier ist Ihre Zusammenfassung</p>
                </div>

                <div class="space-y-5">
                  <!-- Position Card -->
                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] via-[#29b3ad] to-[#3dd2cc] rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div class="relative p-8 bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 backdrop-blur-xl rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc]/60 transition-all duration-500">
                      <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                      <div class="relative flex items-start gap-4">
                        <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#3dd2cc]/30 to-[#29b3ad]/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-[#3dd2cc]/20">
                          <span class="text-3xl">{{ roles.find(r => r.name === formData.position)?.icon || '💼' }}</span>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2 tracking-wide uppercase">Position</h3>
                          <p class="text-xl text-white font-bold">{{ formData.position || 'Nicht ausgewählt' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tech Stack Card -->
                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#29b3ad] via-[#3dd2cc] to-[#29b3ad] rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div class="relative p-8 bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 backdrop-blur-xl rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc]/60 transition-all duration-500">
                      <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                      <div class="relative">
                        <div class="flex items-center gap-3 mb-4">
                          <div class="w-14 h-14 bg-gradient-to-br from-[#3dd2cc]/30 to-[#29b3ad]/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-[#3dd2cc]/20">
                            <span class="text-3xl">⚡</span>
                          </div>
                          <div>
                            <h3 class="text-sm font-semibold text-[#3dd2cc] tracking-wide uppercase">Tech Stack</h3>
                            <p class="text-xs text-gray-400">{{ formData.techStack.length }} {{ formData.techStack.length === 1 ? 'Technologie' : 'Technologien' }}</p>
                          </div>
                        </div>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="tech in formData.techStack" :key="tech"
                                class="group/chip relative px-4 py-2 bg-gradient-to-r from-[#3dd2cc]/20 via-[#29b3ad]/15 to-[#3dd2cc]/20 rounded-full text-sm text-white font-medium border border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50 hover:scale-105 transition-all duration-300 cursor-default">
                            <div class="absolute inset-0 bg-gradient-to-r from-[#3dd2cc]/0 via-[#3dd2cc]/20 to-[#3dd2cc]/0 rounded-full opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300"></div>
                            <span class="relative">{{ tech }}</span>
                          </span>
                          <span v-if="formData.techStack.length === 0" class="text-gray-400 italic">Keine Auswahl</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Location Card -->
                  <div class="group relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] via-[#29b3ad] to-[#3dd2cc] rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div class="relative p-8 bg-gradient-to-br from-[#122d42]/80 via-[#1d486a]/60 to-[#122d42]/80 backdrop-blur-xl rounded-2xl border border-[#3dd2cc]/30 hover:border-[#3dd2cc]/60 transition-all duration-500">
                      <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                      <div class="relative flex items-start gap-4">
                        <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#3dd2cc]/30 to-[#29b3ad]/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-[#3dd2cc]/20">
                          <span class="text-3xl">📍</span>
                        </div>
                        <div class="flex-1">
                          <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2 tracking-wide uppercase">Standort</h3>
                          <p class="text-xl text-white font-bold">{{ locations.find(l => l.value === formData.location)?.label || 'Nicht ausgewählt' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="mt-10 relative group">
                  <div class="absolute -inset-1 bg-gradient-to-r from-[#3dd2cc] via-[#29b3ad] to-[#3dd2cc] rounded-2xl opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-500"></div>
                  <button @click="showSuccessModal = true"
                          class="relative w-full py-5 bg-gradient-to-r from-[#3dd2cc] via-[#29b3ad] to-[#3dd2cc] text-[#07121a] font-bold text-lg rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-[#3dd2cc]/50">
                    <span class="relative z-10">✨ Anfrage absenden</span>
                  </button>
                </div>
              </div>
            </div>          </TransitionGroup>
        </div>

        <!-- Navigation Buttons -->
        <div class="relative z-20 flex items-center justify-between mt-8">
          <button v-if="currentStep > 0"
                  @click="currentStep--"
                  class="px-8 py-4 bg-[#122d42] border-2 border-[#3dd2cc]/30 text-white font-bold rounded-xl hover:border-[#3dd2cc] transition-all">
            Zurück
          </button>
          <div v-else></div>

          <button v-if="currentStep < totalSteps - 1"
                  @click="currentStep++"
                  :disabled="!canProceed"
                  class="px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#3dd2cc]/50">
            Weiter
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
        <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 max-w-lg w-full text-center">
          <h3 class="text-3xl font-bold text-white mb-3">Vielen Dank!</h3>
          <p class="text-gray-300 mb-6">Ihre Anfrage wurde erfolgreich übermittelt.</p>
          <NuxtLink to="/"
                    class="inline-block px-8 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl">
            Zur Startseite
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentStep = ref(0)
const totalSteps = 4
const showSuccessModal = ref(false)

const formData = ref({
  position: '',
  techStack: [],
  location: ''
})

const roles = [
  // 🥇 Top Volume Sweet-Spot
  { 
    value: 'it-project-manager', 
    label: 'IT Project Manager', 
    icon: '📋',
    technologies: ['PMP', 'Scrum', 'SAFe', 'Agile', 'Jira', 'MS Project', 'Confluence', 'Kanban']
  },
  { 
    value: 'scrum-master', 
    label: 'Scrum Master', 
    icon: '🎯',
    technologies: ['Scrum', 'SAFe', 'Agile', 'Kanban', 'Jira', 'Confluence', 'Lean']
  },
  
  // 💻 ERP/SAP Consulting
  { 
    value: 'sap-s4hana', 
    label: 'SAP S/4HANA Consultant', 
    icon: '�',
    technologies: ['SAP S/4HANA', 'SAP FICO', 'SAP MM', 'SAP SD', 'SAP PP', 'ABAP', 'Fiori']
  },
  { 
    value: 'sap-basis', 
    label: 'SAP Basis Admin', 
    icon: '⚙️',
    technologies: ['SAP Basis', 'SAP HANA', 'Linux', 'Windows Server', 'SAP Solution Manager']
  },
  
  // ☁️ Cloud & DevOps
  { 
    value: 'cloud-engineer', 
    label: 'Cloud Engineer', 
    icon: '☁️',
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'Python']
  },
  { 
    value: 'devops-engineer', 
    label: 'DevOps Engineer', 
    icon: '🔧',
    technologies: ['Kubernetes', 'Docker', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'AWS', 'Azure']
  },
  
  // 🛡️ Cybersecurity (Audit)
  { 
    value: 'security-auditor', 
    label: 'Security Auditor', 
    icon: '🔒',
    technologies: ['CISSP', 'ISO 27001', 'SOC 2', 'GDPR', 'Compliance', 'Risk Assessment', 'CISM']
  },
  { 
    value: 'penetration-tester', 
    label: 'Penetration Tester', 
    icon: '🔐',
    technologies: ['CEH', 'OSCP', 'Penetration Testing', 'Ethical Hacking', 'Vulnerability Assessment', 'Kali Linux']
  },
  
  // Weitere Top-Sektoren
  { 
    value: 'it-architect', 
    label: 'Solution Architect', 
    icon: '🏗️',
    technologies: ['TOGAF', 'Microservices', 'Cloud Architecture', 'Enterprise Architecture', 'AWS', 'Azure']
  },
  { 
    value: 'data-engineer', 
    label: 'Data Engineer', 
    icon: '📊',
    technologies: ['Python', 'SQL', 'Apache Spark', 'ETL', 'Data Pipelines', 'AWS', 'Azure', 'Snowflake']
  },
  { 
    value: 'senior-fullstack', 
    label: 'Senior Full-Stack', 
    icon: '☕',
    technologies: ['Java', 'Spring Boot', 'React', 'Angular', 'Microservices', 'Kubernetes', 'PostgreSQL', 'MongoDB']
  },
  { 
    value: 'ux-ui-designer', 
    label: 'UI/UX Designer', 
    icon: '🎨',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Design Systems', 'Wireframing']
  }
]

const locations = [
  { value: 'remote', label: 'Remote' },
  { value: 'berlin', label: 'Berlin-Brandenburg' },
  { value: 'frankfurt', label: 'FrankfurtRheinMain' },
  { value: 'hamburg', label: 'Hamburg' },
  { value: 'hannover', label: 'Hannover Braunschweig Göttingen Wolfsburg' },
  { value: 'mitteldeutschland', label: 'Mitteldeutschland' },
  { value: 'munich', label: 'München' },
  { value: 'nordwest', label: 'Nordwest' },
  { value: 'nuremberg', label: 'Nürnberg' },
  { value: 'rhein-neckar', label: 'Rhein-Neckar' },
  { value: 'rhein-ruhr', label: 'Rhein-Ruhr' },
  { value: 'stuttgart', label: 'Stuttgart' },
  { value: 'hybrid', label: 'Hybrid' }
]

const availableTechStack = computed(() => {
  const selectedRole = roles.find(r => r.value === formData.value.position)
  return selectedRole?.technologies || []
})

const canProceed = computed(() => {
  if (currentStep.value === 0) return formData.value.position !== ''
  if (currentStep.value === 1) return formData.value.techStack.length > 0
  if (currentStep.value === 2) return formData.value.location !== ''
  return true
})

const toggleTech = (tech) => {
  const index = formData.value.techStack.indexOf(tech)
  if (index > -1) {
    formData.value.techStack.splice(index, 1)
  } else {
    formData.value.techStack.push(tech)
  }
}

// Canvas
const matrixCanvas = ref(null)
const particleCanvas = ref(null)
let matrixAnimationId = null
let particleAnimationId = null

onMounted(() => {
  // Matrix
  const matrixCtx = matrixCanvas.value?.getContext('2d')
  if (matrixCtx && matrixCanvas.value) {
    matrixCanvas.value.width = window.innerWidth
    matrixCanvas.value.height = window.innerHeight

    const chars = '01'
    const fontSize = 16
    const columns = matrixCanvas.value.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)
    let lastTime = 0

    const drawMatrix = (currentTime) => {
      if (currentTime - lastTime < 100) {
        matrixAnimationId = requestAnimationFrame(drawMatrix)
        return
      }
      lastTime = currentTime

      matrixCtx.fillStyle = 'rgba(7, 18, 26, 0.1)'
      matrixCtx.fillRect(0, 0, matrixCanvas.value.width, matrixCanvas.value.height)
      matrixCtx.fillStyle = 'rgba(61, 210, 204, 0.15)'
      matrixCtx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > matrixCanvas.value.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
      matrixAnimationId = requestAnimationFrame(drawMatrix)
    }
    drawMatrix(0)
  }

  // Particles
  const particleCtx = particleCanvas.value?.getContext('2d')
  if (particleCtx && particleCanvas.value) {
    particleCanvas.value.width = window.innerWidth
    particleCanvas.value.height = window.innerHeight

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.value.width
        this.y = Math.random() * particleCanvas.value.height
        this.vx = (Math.random() - 0.5) * 0.2
        this.vy = (Math.random() - 0.5) * 0.2
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > particleCanvas.value.width) this.vx *= -1
        if (this.y < 0 || this.y > particleCanvas.value.height) this.vy *= -1
      }

      draw() {
        particleCtx.beginPath()
        particleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        particleCtx.fillStyle = 'rgba(61, 210, 204, 0.3)'
        particleCtx.fill()
      }
    }

    const particles = Array.from({ length: 30 }, () => new Particle())

    const drawParticles = () => {
      particleCtx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            particleCtx.beginPath()
            particleCtx.strokeStyle = `rgba(61, 210, 204, ${0.08 * (1 - distance / 120)})`
            particleCtx.lineWidth = 0.5
            particleCtx.moveTo(particles[i].x, particles[i].y)
            particleCtx.lineTo(particles[j].x, particles[j].y)
            particleCtx.stroke()
          }
        }
      }

      particleAnimationId = requestAnimationFrame(drawParticles)
    }
    drawParticles()
  }
})

onUnmounted(() => {
  if (matrixAnimationId) cancelAnimationFrame(matrixAnimationId)
  if (particleAnimationId) cancelAnimationFrame(particleAnimationId)
})
</script>

<style scoped>
.question-card {
  position: absolute;
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(18, 45, 66, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3dd2cc, #29b3ad);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #29b3ad, #3dd2cc);
  box-shadow: 0 0 20px rgba(61, 210, 204, 0.8);
}
</style>
