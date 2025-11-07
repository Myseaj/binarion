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
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-full backdrop-blur-sm mb-6 animate-pulse-subtle">
            <div class="w-2 h-2 bg-[#3dd2cc] rounded-full pulse-glow"></div>
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
              <div class="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Question Cards -->
        <div class="relative min-h-[500px]">
          <TransitionGroup name="slide">
            
            <!-- Step 0: Position -->
            <div v-if="currentStep === 0" key="step-0" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Welche Position suchen Sie?</h2>
                  <p class="text-gray-300">Wählen Sie die Rolle, die Sie besetzen möchten</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button v-for="role in roles" :key="role.value"
                          @click="selectOption('position', role.value)"
                          class="group relative p-6 bg-[#122d42]/50 border-2 rounded-xl transition-all duration-300 hover:scale-105"
                          :class="formData.position === role.value ? 'border-[#3dd2cc] bg-[#3dd2cc]/10' : 'border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50'">
                    <div class="flex items-start gap-4">
                      <div class="p-3 bg-[#3dd2cc]/10 rounded-lg group-hover:bg-[#3dd2cc]/20 transition-colors duration-300">
                        <div v-html="role.icon" class="w-8 h-8 text-[#3dd2cc]"></div>
                      </div>
                      <div class="text-left flex-1">
                        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300">
                          {{ role.label }}
                        </h3>
                        <p class="text-sm text-gray-400">{{ role.description }}</p>
                      </div>
                      <div v-if="formData.position === role.value" class="absolute top-4 right-4">
                        <div class="w-6 h-6 bg-[#3dd2cc] rounded-full flex items-center justify-center">
                          <svg class="w-4 h-4 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 1: Tech Stack -->
            <div v-if="currentStep === 1" key="step-1" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Welcher Tech Stack?</h2>
                  <p class="text-gray-300">Wählen Sie alle relevanten Technologien (Mehrfachauswahl möglich)</p>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <button v-for="tech in techStack" :key="tech"
                          @click="toggleMultiSelect('techStack', tech)"
                          class="group relative p-4 bg-[#122d42]/50 border-2 rounded-xl transition-all duration-300 hover:scale-105"
                          :class="formData.techStack.includes(tech) ? 'border-[#3dd2cc] bg-[#3dd2cc]/10' : 'border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50'">
                    <div class="text-center">
                      <div class="text-2xl mb-2">{{ getTechIcon(tech) }}</div>
                      <span class="text-sm font-semibold text-white group-hover:text-[#3dd2cc] transition-colors duration-300">
                        {{ tech }}
                      </span>
                      <div v-if="formData.techStack.includes(tech)" class="absolute -top-2 -right-2">
                        <div class="w-6 h-6 bg-[#3dd2cc] rounded-full flex items-center justify-center shadow-lg shadow-[#3dd2cc]/50">
                          <svg class="w-4 h-4 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <div v-if="formData.techStack.length > 0" class="mt-6 p-4 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-xl">
                  <p class="text-sm text-[#3dd2cc] font-semibold mb-2">Ausgewählt ({{ formData.techStack.length }}):</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tech in formData.techStack" :key="tech"
                          class="px-3 py-1 bg-[#3dd2cc]/20 border border-[#3dd2cc]/50 rounded-full text-sm text-white">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Experience Level -->
            <div v-if="currentStep === 2" key="step-2" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Welches Erfahrungslevel?</h2>
                  <p class="text-gray-300">Wählen Sie das gewünschte Erfahrungslevel</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button v-for="level in experienceLevels" :key="level.value"
                          @click="selectOption('experience', level.value)"
                          class="group relative p-6 bg-[#122d42]/50 border-2 rounded-xl transition-all duration-300 hover:scale-105"
                          :class="formData.experience === level.value ? 'border-[#3dd2cc] bg-[#3dd2cc]/10' : 'border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50'">
                    <div class="text-left">
                      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300 flex items-center gap-2">
                        <span class="text-2xl">{{ level.icon }}</span>
                        {{ level.label }}
                      </h3>
                      <p class="text-sm text-gray-400 mb-2">{{ level.years }}</p>
                      <p class="text-xs text-gray-500">{{ level.description }}</p>
                    </div>
                    <div v-if="formData.experience === level.value" class="absolute top-4 right-4">
                      <div class="w-6 h-6 bg-[#3dd2cc] rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 3: Work Mode -->
            <div v-if="currentStep === 3" key="step-3" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Arbeitsmodell?</h2>
                  <p class="text-gray-300">Wie soll der Kandidat arbeiten?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button v-for="mode in workModes" :key="mode.value"
                          @click="selectOption('workMode', mode.value)"
                          class="group relative p-8 bg-[#122d42]/50 border-2 rounded-xl transition-all duration-300 hover:scale-105"
                          :class="formData.workMode === mode.value ? 'border-[#3dd2cc] bg-[#3dd2cc]/10' : 'border-[#3dd2cc]/20 hover:border-[#3dd2cc]/50'">
                    <div class="text-center">
                      <div class="text-4xl mb-4">{{ mode.icon }}</div>
                      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-[#3dd2cc] transition-colors duration-300">
                        {{ mode.label }}
                      </h3>
                      <p class="text-sm text-gray-400">{{ mode.description }}</p>
                    </div>
                    <div v-if="formData.workMode === mode.value" class="absolute top-4 right-4">
                      <div class="w-6 h-6 bg-[#3dd2cc] rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-[#07121a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 4: Salary Range -->
            <div v-if="currentStep === 4" key="step-4" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Gehaltsvorstellung?</h2>
                  <p class="text-gray-300">Definieren Sie die gewünschte Gehaltsspanne</p>
                </div>

                <!-- Salary Display -->
                <div class="mb-8 p-6 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-xl text-center">
                  <p class="text-sm text-gray-400 mb-2">Jahresgehalt (brutto)</p>
                  <p class="text-4xl font-bold text-white">
                    {{ formatCurrency(formData.salaryMin) }} - {{ formatCurrency(formData.salaryMax) }}
                  </p>
                </div>

                <!-- Preset Buttons -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  <button v-for="preset in salaryPresets" :key="preset.label"
                          @click="applySalaryPreset(preset)"
                          class="p-4 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl hover:border-[#3dd2cc]/50 hover:bg-[#3dd2cc]/10 transition-all duration-300 hover:scale-105">
                    <p class="text-xs text-gray-400 mb-1">{{ preset.label }}</p>
                    <p class="text-sm font-semibold text-white">{{ formatCurrency(preset.min) }} - {{ formatCurrency(preset.max) }}</p>
                  </button>
                </div>

                <!-- Custom Range Sliders -->
                <div class="space-y-6">
                  <div>
                    <label class="text-sm text-gray-400 mb-2 block">Minimum: {{ formatCurrency(formData.salaryMin) }}</label>
                    <input type="range" v-model.number="formData.salaryMin" min="30000" max="200000" step="5000"
                           class="custom-slider w-full">
                  </div>
                  <div>
                    <label class="text-sm text-gray-400 mb-2 block">Maximum: {{ formatCurrency(formData.salaryMax) }}</label>
                    <input type="range" v-model.number="formData.salaryMax" min="30000" max="200000" step="5000"
                           class="custom-slider w-full">
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 5: Contact Information -->
            <div v-if="currentStep === 5" key="step-5" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Ihre Kontaktdaten</h2>
                  <p class="text-gray-300">Damit wir Ihnen passende Kandidaten vorstellen können</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">Unternehmen *</label>
                    <input type="text" v-model="formData.company"
                           class="w-full px-4 py-3 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none transition-colors duration-300"
                           placeholder="Ihr Unternehmen">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">Ihr Name *</label>
                    <input type="text" v-model="formData.name"
                           class="w-full px-4 py-3 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none transition-colors duration-300"
                           placeholder="Max Mustermann">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">E-Mail *</label>
                    <input type="email" v-model="formData.email"
                           class="w-full px-4 py-3 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none transition-colors duration-300"
                           placeholder="max@unternehmen.de">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-300 mb-2">Telefon (optional)</label>
                    <input type="tel" v-model="formData.phone"
                           class="w-full px-4 py-3 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none transition-colors duration-300"
                           placeholder="+49 123 456789">
                  </div>
                </div>

                <div class="mt-6">
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Zusätzliche Anforderungen (optional)</label>
                  <textarea v-model="formData.additionalInfo" rows="4"
                           class="w-full px-4 py-3 bg-[#122d42]/50 border-2 border-[#3dd2cc]/20 rounded-xl text-white placeholder-gray-500 focus:border-[#3dd2cc] focus:outline-none transition-colors duration-300"
                           placeholder="z.B. spezielle Kenntnisse, Projektanforderungen, gewünschter Starttermin..."></textarea>
                </div>
              </div>
            </div>

            <!-- Step 6: Summary -->
            <div v-if="currentStep === 6" key="step-6" class="question-card">
              <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 backdrop-blur-sm">
                <div class="mb-8">
                  <h2 class="text-3xl font-bold text-white mb-4">Zusammenfassung</h2>
                  <p class="text-gray-300">Bitte überprüfen Sie Ihre Angaben</p>
                </div>

                <div class="space-y-6">
                  <!-- Position -->
                  <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                    <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2">Position</h3>
                    <p class="text-lg text-white">{{ roles.find(r => r.value === formData.position)?.label }}</p>
                  </div>

                  <!-- Tech Stack -->
                  <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                    <h3 class="text-sm font-semibold text-[#3dd2cc] mb-3">Tech Stack</h3>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tech in formData.techStack" :key="tech"
                            class="px-3 py-1 bg-[#3dd2cc]/20 border border-[#3dd2cc]/50 rounded-full text-sm text-white">
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Experience & Work Mode -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                      <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2">Erfahrung</h3>
                      <p class="text-lg text-white">{{ experienceLevels.find(e => e.value === formData.experience)?.label }}</p>
                    </div>
                    <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                      <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2">Arbeitsmodell</h3>
                      <p class="text-lg text-white">{{ workModes.find(w => w.value === formData.workMode)?.label }}</p>
                    </div>
                  </div>

                  <!-- Salary -->
                  <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                    <h3 class="text-sm font-semibold text-[#3dd2cc] mb-2">Gehaltsspanne</h3>
                    <p class="text-lg text-white">{{ formatCurrency(formData.salaryMin) }} - {{ formatCurrency(formData.salaryMax) }}</p>
                  </div>

                  <!-- Contact -->
                  <div class="p-6 bg-[#122d42]/50 border border-[#3dd2cc]/20 rounded-xl">
                    <h3 class="text-sm font-semibold text-[#3dd2cc] mb-3">Kontakt</h3>
                    <div class="space-y-1 text-white">
                      <p><span class="text-gray-400">Unternehmen:</span> {{ formData.company }}</p>
                      <p><span class="text-gray-400">Name:</span> {{ formData.name }}</p>
                      <p><span class="text-gray-400">E-Mail:</span> {{ formData.email }}</p>
                      <p v-if="formData.phone"><span class="text-gray-400">Telefon:</span> {{ formData.phone }}</p>
                    </div>
                    <p v-if="formData.additionalInfo" class="mt-4 text-sm text-gray-300">
                      <span class="text-gray-400">Zusätzliche Anforderungen:</span><br>
                      {{ formData.additionalInfo }}
                    </p>
                  </div>
                </div>

                <!-- Submit Button -->
                <button @click="submitForm"
                        :disabled="!canSubmit"
                        class="w-full mt-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#3dd2cc]/50">
                  <span class="flex items-center justify-center gap-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Anfrage absenden
                  </span>
                </button>
              </div>
            </div>

          </TransitionGroup>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between mt-8">
          <button v-if="currentStep > 0"
                  @click="previousStep"
                  class="group px-8 py-4 bg-[#122d42] border-2 border-[#3dd2cc]/30 text-white font-bold rounded-xl hover:border-[#3dd2cc] transition-all duration-300 hover:scale-105">
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Zurück
            </span>
          </button>
          <div v-else></div>

        </div>
      </div>
    </div>
    <button 
                  @click="nextStep"
                  :disabled="!canProceed"
                  class="group px-8 py-4 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-[#3dd2cc]/50">
            <span class="flex items-center gap-2">
              Weiter
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>

    <!-- Success Modal -->
    <Transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-gradient-to-br from-[#122d42] to-[#1d486a] p-10 rounded-3xl border border-[#3dd2cc]/30 max-w-lg w-full text-center shadow-2xl shadow-[#3dd2cc]/20">
          <div class="mb-6">
            <div class="w-20 h-20 mx-auto bg-[#3dd2cc]/20 rounded-full flex items-center justify-center mb-4">
              <svg class="w-10 h-10 text-[#3dd2cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-white mb-3">Vielen Dank!</h3>
            <p class="text-gray-300 mb-6">Ihre Anfrage wurde erfolgreich übermittelt.</p>
            <div class="p-4 bg-[#3dd2cc]/10 border border-[#3dd2cc]/30 rounded-xl mb-6">
              <p class="text-sm text-[#3dd2cc] font-semibold mb-1">⚡ Schnelle Reaktionszeit</p>
              <p class="text-xs text-gray-400">Wir melden uns innerhalb von <span class="text-white font-bold">&lt;12 Stunden</span> bei Ihnen mit passenden Kandidaten</p>
            </div>
          </div>
          <NuxtLink to="/"
                    class="inline-block px-8 py-3 bg-gradient-to-r from-[#3dd2cc] to-[#29b3ad] text-[#07121a] font-bold rounded-xl hover:scale-105 transition-all duration-300">
            Zurück zur Startseite
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentStep = ref(0)
const totalSteps = 7
const showSuccessModal = ref(false)

const formData = ref({
  position: '',
  techStack: [],
  experience: '',
  workMode: '',
  salaryMin: 50000,
  salaryMax: 80000,
  company: '',
  name: '',
  email: '',
  phone: '',
  additionalInfo: ''
})

const roles = [
  {
    value: 'frontend',
    label: 'Frontend Developer',
    description: 'React, Vue, Angular, etc.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
  },
  {
    value: 'backend',
    label: 'Backend Developer',
    description: 'Node.js, Java, Python, Go, etc.',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>'
  },
  {
    value: 'fullstack',
    label: 'Full-Stack Developer',
    description: 'Frontend & Backend',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>'
  },
  {
    value: 'devops',
    label: 'DevOps Engineer',
    description: 'CI/CD, Cloud, Kubernetes',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
  },
  {
    value: 'data',
    label: 'Data Engineer',
    description: 'ETL, Data Pipelines, Analytics',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>'
  },
  {
    value: 'mobile',
    label: 'Mobile Developer',
    description: 'iOS, Android, React Native',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
  },
  {
    value: 'lead',
    label: 'Tech Lead',
    description: 'Team Leadership & Architecture',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
  },
  {
    value: 'security',
    label: 'Security Engineer',
    description: 'AppSec, Infrastructure Security',
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
  }
]

const techStack = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
  'Python', 'Java', 'Go', 'Rust', 'PHP', 'Ruby',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform',
  'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST', 'gRPC'
]

const experienceLevels = [
  { value: 'junior', label: 'Junior', icon: '🌱', years: '0-2 Jahre', description: 'Einstieg mit Grundkenntnissen' },
  { value: 'mid', label: 'Mid-Level', icon: '🚀', years: '2-5 Jahre', description: 'Solide Berufserfahrung' },
  { value: 'senior', label: 'Senior', icon: '⭐', years: '5-10 Jahre', description: 'Umfangreiche Expertise' },
  { value: 'expert', label: 'Expert/Lead', icon: '👑', years: '10+ Jahre', description: 'Tiefe Fachkenntnisse & Leadership' }
]

const workModes = [
  { value: 'remote', label: 'Remote', icon: '🏠', description: '100% von überall' },
  { value: 'hybrid', label: 'Hybrid', icon: '🔄', description: 'Mix aus Office & Remote' },
  { value: 'onsite', label: 'Vor Ort', icon: '🏢', description: 'Im Büro' }
]

const salaryPresets = [
  { label: 'Junior', min: 35000, max: 55000 },
  { label: 'Mid-Level', min: 55000, max: 75000 },
  { label: 'Senior', min: 75000, max: 100000 },
  { label: 'Expert', min: 100000, max: 150000 }
]

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: return formData.value.position !== ''
    case 1: return formData.value.techStack.length > 0
    case 2: return formData.value.experience !== ''
    case 3: return formData.value.workMode !== ''
    case 4: return formData.value.salaryMin < formData.value.salaryMax
    case 5: return formData.value.company && formData.value.name && formData.value.email
    default: return true
  }
})

const canSubmit = computed(() => {
  return formData.value.company && 
         formData.value.name && 
         formData.value.email &&
         formData.value.position &&
         formData.value.techStack.length > 0
})

const selectOption = (field, value) => {
  formData.value[field] = value
  console.log('Selected:', field, value, 'canProceed:', canProceed.value)
}

const toggleMultiSelect = (field, value) => {
  const index = formData.value[field].indexOf(value)
  if (index > -1) {
    formData.value[field].splice(index, 1)
  } else {
    formData.value[field].push(value)
  }
}

const getTechIcon = (tech) => {
  const icons = {
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'React': '⚛️',
    'Vue': '💚',
    'Angular': '🔺',
    'Node.js': '🟢',
    'Python': '🐍',
    'Java': '☕',
    'Go': '🔵',
    'Rust': '🦀',
    'PHP': '🐘',
    'Ruby': '💎',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Azure': '🌐',
    'GCP': '🔴',
    'Terraform': '🏗️',
    'PostgreSQL': '🐘',
    'MongoDB': '🍃',
    'Redis': '🔴',
    'GraphQL': '⬡',
    'REST': '🔌',
    'gRPC': '⚡'
  }
  return icons[tech] || '⚙️'
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const applySalaryPreset = (preset) => {
  formData.value.salaryMin = preset.min
  formData.value.salaryMax = preset.max
}

const nextStep = () => {
  console.log('nextStep called - canProceed:', canProceed.value, 'currentStep:', currentStep.value)
  if (canProceed.value && currentStep.value < totalSteps - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log('New step:', currentStep.value)
  } else {
    console.log('Cannot proceed - blocked by validation')
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const submitForm = () => {
  if (canSubmit.value) {
    // TODO: Send form data to backend
    console.log('Form submitted:', formData.value)
    showSuccessModal.value = true
  }
}

// Canvas Animations
const matrixCanvas = ref(null)
const particleCanvas = ref(null)
let matrixAnimationId = null
let particleAnimationId = null

onMounted(() => {
  // Matrix Animation - Slower and calmer
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
      // Slow down the animation - only update every 100ms
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

  // Particle Network Animation - Calmer and slower
  const particleCtx = particleCanvas.value?.getContext('2d')
  if (particleCtx && particleCanvas.value) {
    particleCanvas.value.width = window.innerWidth
    particleCanvas.value.height = window.innerHeight

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.value.width
        this.y = Math.random() * particleCanvas.value.height
        this.vx = (Math.random() - 0.5) * 0.2  // Reduced speed
        this.vy = (Math.random() - 0.5) * 0.2  // Reduced speed
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
        particleCtx.fillStyle = 'rgba(61, 210, 204, 0.3)'  // More subtle
        particleCtx.fill()
      }
    }

    const particles = Array.from({ length: 30 }, () => new Particle())  // Fewer particles

    const drawParticles = () => {
      particleCtx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections - fewer and more subtle
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {  // Shorter connection distance
            particleCtx.beginPath()
            particleCtx.strokeStyle = `rgba(61, 210, 204, ${0.08 * (1 - distance / 120)})`  // More subtle
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

  // Handle resize
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
})

onUnmounted(() => {
  if (matrixAnimationId) cancelAnimationFrame(matrixAnimationId)
  if (particleAnimationId) cancelAnimationFrame(particleAnimationId)
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
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

/* Custom Slider Styling */
.custom-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(to right, #3dd2cc 0%, #29b3ad 100%);
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.custom-slider:hover {
  opacity: 1;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3dd2cc;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
  transition: all 0.3s ease;
}

.custom-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(61, 210, 204, 0.8);
}

.custom-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3dd2cc;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
  transition: all 0.3s ease;
}

.custom-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(61, 210, 204, 0.8);
}
</style>