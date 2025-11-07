<template>
  <div class="profile-page-container">
    <!-- Matrix Background Canvas -->
    <canvas ref="matrixCanvas" class="matrix-bg"></canvas>
    
    <!-- Particle System -->
    <div class="particles-container">
      <div v-for="i in 30" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Grid Overlay -->
    <div class="grid-overlay"></div>

    <!-- Cursor Trail Effect -->
    <div class="cursor-trail" ref="cursorTrail"></div>
    
    <!-- Loading State -->
    <div v-if="pending" class="loading-spinner">
      <div class="spinner-container">
        <div class="spinner"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">
        <span class="typing">Lade Profil</span>
        <span class="dots">...</span>
      </p>
      <div class="binary-stream">{{ binaryText }}</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <div class="glitch-container">
        <div class="error-icon glitch" data-text="⚠️">⚠️</div>
      </div>
      <h2 class="glitch-text" data-text="System Error">System Error</h2>
      <p>Das Profil konnte nicht geladen werden. Der Link ist möglicherweise ungültig oder abgelaufen.</p>
      <div class="error-code">ERROR_404</div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="data" class="profile-content">
      
      <!-- Header mit Company Info -->
      <div class="header-banner" @mouseenter="headerHovered = true" @mouseleave="headerHovered = false">
        <div class="scan-line" :class="{ active: headerHovered }"></div>
        <div class="company-header">
          <img v-if="data.company.logo" :src="data.company.logo" alt="Firmenlogo" class="company-logo" />
          <div class="company-info">
            <h1 class="company-name">
              <span class="tech-bracket">&lt;</span>{{ data.company.name }}<span class="tech-bracket">/&gt;</span>
            </h1>
            <p v-if="data.partner?.name" class="partner-name">
              <span class="prompt-symbol">&gt;</span> z.Hd. {{ data.partner.name }}
            </p>
            <p class="company-description">{{ data.company.description }}</p>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="content-grid">
        
        <!-- Left Column: Candidate Profile -->
        <div class="left-column">
          <section class="candidate-section">
            <div class="candidate-header">
              <div class="profile-image-container">
                <div class="profile-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="profile-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <div class="pulse-ring"></div>
                  <div class="pulse-ring delay-1"></div>
                </div>
              </div>
              <div class="profile-title">
                <h2>
                  <span class="code-tag">&lt;Kandidat</span>
                  <span class="code-attribute"> status=</span>
                  <span class="code-value">"vertraulich"</span>
                  <span class="code-tag">/&gt;</span>
                </h2>
                <p class="profile-subtitle">
                  <span class="status-dot"></span>
                  Anonymisiert · Verschlüsselt
                </p>
              </div>
            </div>

        <!-- Summary -->
        <div class="info-card" @mouseenter="hoveredCard = 0" @mouseleave="hoveredCard = null">
          <div class="card-glow"></div>
          <h3><span class="icon-tech">💡</span> <span class="code-comment">// Zusammenfassung</span></h3>
          <p class="text-content">{{ data.candidate.summary }}</p>
        </div>

        <!-- Motivation -->
        <div class="info-card" @mouseenter="hoveredCard = 1" @mouseleave="hoveredCard = null">
          <div class="card-glow"></div>
          <h3><span class="icon-tech">🎯</span> <span class="code-comment">// Motivation für den Wechsel</span></h3>
          <p class="text-content">{{ data.candidate.changeMotivation }}</p>
        </div>

        <!-- Key Facts -->
        <div class="info-card">
          <h3>📋 Rahmendaten</h3>
          <div class="facts-grid">
            <div v-if="data.candidate.experienceSummary" class="fact-item">
              <span class="fact-label">📊 Berufliche Erfahrung:</span>
              <span class="fact-value">{{ data.candidate.experienceSummary }}</span>
            </div>
            <div v-if="data.candidate.desiredSalary" class="fact-item">
              <span class="fact-label">💰 Gehaltsvorstellung:</span>
              <span class="fact-value">{{ data.candidate.desiredSalary }}</span>
            </div>
            <div v-if="data.candidate.noticePeriod" class="fact-item">
              <span class="fact-label">📅 Kündigungsfrist:</span>
              <span class="fact-value">{{ data.candidate.noticePeriod }}</span>
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div v-if="parsedSkills.length > 0" class="info-card">
          <h3>🛠️ Kompetenzen & Skills</h3>
          <div class="skills-grid">
            <div v-for="skill in parsedSkills" :key="skill.name" class="skill-tag">
              <span class="skill-name">{{ skill.name }}</span>
              <span v-if="skill.rating" class="skill-rating">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= skill.rating }">★</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Interests -->
        <div v-if="data.candidate.interests && data.candidate.interests.length > 0" class="info-card">
          <h3>⭐ Interessen & Hobbys</h3>
          <p class="text-content">
            <v-chip v-for="interest in data.candidate.interests" :key="interest">{{ interest }}</v-chip>
          </p>
        </div>

        <!-- Experience -->
        <div class="info-card">
          <h3>💼 Berufserfahrung</h3>
          <div class="timeline">
            <div v-for="(exp, index) in anonymizedExperience" :key="index" class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>{{ exp.position }}</h4>
                <p v-if="exp.industry" class="company">{{ exp.industry }}</p>
                <p class="date-range">{{ exp.start }} - {{ exp.end || 'Heute' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="info-card">
          <h3>🎓 Ausbildung</h3>
          <div class="education-list">
            <div v-for="(edu, index) in anonymizedEducation" :key="index" class="education-item">
              <h4>{{ edu.degree }}</h4>
              <p>{{ edu.type || 'Bildungseinrichtung' }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Right Column: Contact & Feedback -->
    <div class="right-column">
      
      <!-- Contact Person -->
      <section class="contact-section">
        <div class="contact-card">
          <h3>👤 Ihr Ansprechpartner</h3>
          <div class="contact-info">
            <div v-if="data.recruiter.image" class="contact-avatar">
              <img :src="data.recruiter.image" alt="Ansprechpartner" class="avatar-img" />
            </div>
            <p class="contact-name">{{ data.recruiter.name }}</p>
            <p class="contact-role">{{ data.recruiter.title }}</p>
            
            <div class="contact-details">
              <a :href="'tel:' + data.recruiter.phone" class="contact-link">
                <span class="contact-icon">📞</span>
                <span>{{ data.recruiter.phone }}</span>
                <span class="link-glow"></span>
              </a>
              <a :href="'mailto:' + data.recruiter.email" class="contact-link">
                <span class="contact-icon">✉️</span>
                <span>{{ data.recruiter.email }}</span>
                <span class="link-glow"></span>
              </a>
              <a v-if="data.recruiter.calendly" :href="data.recruiter.calendly" target="_blank" class="contact-btn">
                <span class="btn-shine"></span>
                <span class="contact-btn-content">
                  <span>📅</span>
                  <span>Termin vereinbaren</span>
                  <svg class="btn-arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Feedback Section -->
      <section class="feedback-section">
        <div class="feedback-card">
          <h2>💬 Ihr Feedback</h2>
          <p class="feedback-prompt">Wie möchten Sie mit diesem Kandidaten fortfahren?</p>
          
          <textarea 
            v-model="comment" 
            placeholder="Teilen Sie uns Ihre Gedanken mit (optional)..."
            class="feedback-textarea"
          ></textarea>
          
          <div class="action-buttons">
            <button 
              @click="submitFeedback('Kunde: Interview')" 
              class="btn btn-success"
              :disabled="feedbackSuccess"
              @mouseenter="successBtnHovered = true"
              @mouseleave="successBtnHovered = false"
            >
              <span class="btn-ripple"></span>
              <span class="btn-content">
                <span class="btn-icon">✅</span>
                <span>Interview anfragen</span>
                <svg class="btn-arrow" :class="{ active: successBtnHovered }" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            <button 
              @click="submitFeedback('Kunde: Abgelehnt')" 
              class="btn btn-decline"
              :disabled="feedbackSuccess"
              @mouseenter="declineBtnHovered = true"
              @mouseleave="declineBtnHovered = false"
            >
              <span class="btn-ripple"></span>
              <span class="btn-content">
                <span class="btn-icon">❌</span>
                <span>Ablehnen</span>
              </span>
            </button>
          </div>
          
          <div v-if="feedbackSuccess" class="success-message">
            ✓ Vielen Dank für Ihr Feedback! Wir werden uns zeitnah bei Ihnen melden.
          </div>
        </div>
      </section>

    </div>
  </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const token = route.query.token;

// Refs
const matrixCanvas = ref(null);
const comment = ref('');
const feedbackSuccess = ref(false);
const headerHovered = ref(false);
const hoveredCard = ref(null);
const binaryText = ref('');
const successBtnHovered = ref(false);
const declineBtnHovered = ref(false);
const cursorTrail = ref(null);

// Generate binary text animation
const generateBinary = () => {
  let text = '';
  for (let i = 0; i < 32; i++) {
    text += Math.random() > 0.5 ? '1' : '0';
    if ((i + 1) % 8 === 0) text += ' ';
  }
  binaryText.value = text;
};

// Particle style generator
const getParticleStyle = (i) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  };
};

// Matrix rain effect
const drawMatrix = () => {
  const canvas = matrixCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const binary = '01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
  }

  const draw = () => {
    ctx.fillStyle = 'rgba(7, 18, 26, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#3dd2cc';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = binary[Math.floor(Math.random() * binary.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  const interval = setInterval(draw, 50);
  return interval;
};

const { data, pending, error } = await useFetch(
  'https://vccbpwvprepehqxatnuo.supabase.co/functions/v1/get_job_candidate',
  {
    query: { token },
    lazy: true,
  }
);

console.log(data)

const parsedSkills = computed(() => {
  if (!data.value?.candidate?.skills) return [];
  
  try {
    return data.value.candidate.skills
      .map(skillString => {
        try {
          const skill = JSON.parse(skillString);
          return {
            name: skill.name,
            rating: skill.rating,
            label: skill.name || skill.label
          };
        } catch {
          return null;
        }
      })
      .filter(skill => skill && skill.name);
  } catch {
    return [];
  }
});

const anonymizedExperience = computed(() => {
  if (!data.value?.candidate?.experienceHistory) return [];
  
  return data.value.candidate.experienceHistory.map(exp => ({
    position: exp.position,
    industry: exp.industry || null,
    start: exp.start,
    end: exp.end
  }));
});

const anonymizedEducation = computed(() => {
  if (!data.value?.candidate?.educationHistory) return [];
  
  return data.value.candidate.educationHistory.map(edu => ({
    degree: edu.degree,
    type: getEducationType(edu.school_university)
  }));
});

function getEducationType(schoolName) {
  if (!schoolName) return 'Bildungseinrichtung';
  
  const lower = schoolName.toLowerCase();
  
  if (lower.includes('universität') || lower.includes('university')) {
    return 'Universität';
  }
  if (lower.includes('fachhochschule') || lower.includes('fh ') || lower.includes('hochschule')) {
    return 'Hochschule';
  }
  if (lower.includes('berufsschule') || lower.includes('ausbildung')) {
    return 'Berufsschule';
  }
  if (lower.includes('gymnasium') || lower.includes('schule')) {
    return 'Schule';
  }
  
  return 'Bildungseinrichtung';
}

async function submitFeedback(rating) {
  if (feedbackSuccess.value) return;

  const feedbackUrl = 'https://vccbpwvprepehqxatnuo.supabase.co/functions/v1/submit-feedback';
  
  try {
    await $fetch(feedbackUrl, {
      method: 'POST',
      body: {
        token: token,
        rating: rating,
        comment: comment.value
      }
    });
    feedbackSuccess.value = true;
    
  } catch (err) {
    console.error("Fehler beim Senden des Feedbacks:", err);
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
  }
}

// Lifecycle hooks
onMounted(() => {
  const matrixInterval = drawMatrix();
  const binaryInterval = setInterval(generateBinary, 100);
  generateBinary();

  const handleResize = () => {
    if (matrixCanvas.value) {
      matrixCanvas.value.width = window.innerWidth;
      matrixCanvas.value.height = window.innerHeight;
    }
  };

  // Cursor trail effect
  let cursorX = 0;
  let cursorY = 0;
  const handleMouseMove = (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    if (cursorTrail.value) {
      cursorTrail.value.style.left = cursorX + 'px';
      cursorTrail.value.style.top = cursorY + 'px';
    }
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  onUnmounted(() => {
    clearInterval(matrixInterval);
    clearInterval(binaryInterval);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
  });
});
</script>

<style scoped>
/* Base & Background */
.profile-page-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: #07121a;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
}

/* Matrix Background */
.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.05;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

/* Particles */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #3dd2cc;
  border-radius: 50%;
  box-shadow: 0 0 5px #3dd2cc;
  opacity: 0.3;
  animation: float 25s infinite ease-in-out;
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

/* Grid Overlay */
.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background-image: 
    linear-gradient(rgba(61, 210, 204, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(61, 210, 204, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.2;
}

/* Cursor Trail */
.cursor-trail {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(61, 210, 204, 0.6), transparent);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: all 0.15s ease-out;
  box-shadow: 
    0 0 20px rgba(61, 210, 204, 0.4),
    0 0 40px rgba(61, 210, 204, 0.2);
  animation: pulse-cursor 2s infinite;
}

@keyframes pulse-cursor {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Loading State */
.loading-spinner {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 100px 20px;
  color: white;
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 30px;
}

.spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid rgba(61, 210, 204, 0.2);
  border-top-color: #3dd2cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-bottom-color: #66dcd7;
  border-radius: 50%;
  animation: spin-reverse 1.5s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}

.loading-text {
  font-size: 20px;
  color: #3dd2cc;
  font-family: 'Courier New', monospace;
  margin-bottom: 15px;
}

.typing::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.dots {
  display: inline-block;
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}

.binary-stream {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #3dd2cc;
  opacity: 0.5;
  letter-spacing: 2px;
}

/* Error State */
.error-message {
  position: relative;
  z-index: 10;
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.15), rgba(102, 220, 215, 0.08));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.glitch-container {
  position: relative;
  margin-bottom: 20px;
}

.glitch {
  font-size: 80px;
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  animation: glitch-1 0.3s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  color: #ff0080;
}

.glitch::after {
  animation: glitch-2 0.3s infinite;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  color: #00ffff;
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

.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  top: 0;
  color: #ff0080;
  opacity: 0.8;
  animation: glitch-text 0.3s infinite;
}

@keyframes glitch-text {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); }
  75% { transform: translate(-2px, -2px); }
}

.error-code {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: rgba(255, 0, 128, 0.2);
  border: 2px solid #ff0080;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #ff0080;
  text-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
}

.profile-content {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 0;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.left-column {
  min-width: 0;
}

.right-column {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Scan Line Effect */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3dd2cc, transparent);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.5s;
}

.scan-line.active {
  opacity: 1;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(1000%);
  }
}

/* Header Banner with Glassmorphism */
.header-banner {
  position: relative;
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.15), rgba(102, 220, 215, 0.08));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInDown 0.8s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-banner:hover {
  border-color: rgba(61, 210, 204, 0.6);
  box-shadow: 0 15px 60px rgba(61, 210, 204, 0.3);
  transform: translateY(-2px);
}

.header-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(61, 210, 204, 0.1), transparent);
  transition: left 0.7s;
}

.header-banner:hover::before {
  left: 100%;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 30px;
}

.company-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
  border: 2px solid rgba(61, 210, 204, 0.3);
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.company-logo:hover {
  transform: scale(1.05) rotate(3deg);
  border-color: #3dd2cc;
  box-shadow: 0 0 30px rgba(61, 210, 204, 0.4);
}

.company-info {
  flex: 1;
}

.company-name {
  font-size: 32px;
  font-weight: 700;
  color: #3dd2cc;
  margin: 0 0 10px 0;
  font-family: 'Courier New', monospace;
}

.tech-bracket {
  color: #66dcd7;
  opacity: 0.7;
}

.partner-name {
  font-size: 18px;
  font-weight: 600;
  color: #66dcd7;
  margin: 0 0 15px 0;
  font-family: 'Courier New', monospace;
}

.prompt-symbol {
  color: #3dd2cc;
  text-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
}

.company-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  line-height: 1.6;
}

/* Pulse Ring Effect */
.profile-placeholder {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3dd2cc 0%, #29b3ad 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  border: 4px solid rgba(61, 210, 204, 0.5);
  box-shadow: 0 0 30px rgba(61, 210, 204, 0.5);
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 2px solid #3dd2cc;
  border-radius: 50%;
  opacity: 0;
  animation: pulse 2s infinite;
}

.pulse-ring.delay-1 {
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

/* Code-style headers */
.code-tag {
  color: #66dcd7;
  font-family: 'Courier New', monospace;
}

.code-attribute {
  color: #ff79c6;
}

.code-value {
  color: #f1fa8c;
}

.profile-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #3dd2cc;
  border-radius: 50%;
  box-shadow: 0 0 10px #3dd2cc;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.candidate-section {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.candidate-section:hover {
  border-color: rgba(61, 210, 204, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(61, 210, 204, 0.2);
}

.candidate-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(61, 210, 204, 0.3);
}

.profile-image-container {
  flex-shrink: 0;
}

.profile-icon {
  width: 60px;
  height: 60px;
  color: white;
}

.profile-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: #3dd2cc;
  margin: 0 0 8px 0;
}

/* Info Card with Glow Effect */
.info-card {
  position: relative;
  background: rgba(61, 210, 204, 0.05);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  border: 1px solid rgba(61, 210, 204, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.info-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(61, 210, 204, 0.1) 50%,
    transparent 100%
  );
  transition: left 0.6s ease;
  pointer-events: none;
}

.info-card:hover::after {
  left: 100%;
}

@keyframes binaryFlicker {
  0%, 10%, 20%, 30%, 100% {
    opacity: 1;
  }
  5%, 15%, 25% {
    opacity: 0.3;
  }
}

.info-card:hover {
  background: rgba(61, 210, 204, 0.1);
  border-color: rgba(61, 210, 204, 0.5);
  transform: translateX(5px);
  box-shadow: -5px 5px 20px rgba(61, 210, 204, 0.2);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(61, 210, 204, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.info-card:hover .card-glow {
  opacity: 1;
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #3dd2cc;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Courier New', monospace;
}

.icon-tech {
  display: inline-block;
  animation: float-icon 3s infinite ease-in-out;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.code-comment {
  color: #66dcd7;
}

.text-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-size: 15px;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.2), rgba(102, 220, 215, 0.15));
  border: 1px solid rgba(61, 210, 204, 0.5);
  color: #66dcd7;
  padding: 12px 18px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: skillBinaryLoad 1.2s ease-out forwards;
}

@keyframes skillBinaryLoad {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  40% {
    opacity: 0.3;
    content: '01010011';
  }
  70% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Binary loading text effect for skills */
.skill-tag .skill-name {
  animation: textBinaryReveal 1s ease-out forwards;
}

@keyframes textBinaryReveal {
  0% {
    opacity: 0;
    filter: blur(8px);
    text-shadow: 0 0 20px #3dd2cc;
  }
  50% {
    opacity: 0.5;
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    text-shadow: none;
  }
}

.skill-tag:nth-child(1) { animation-delay: 0.1s; }
.skill-tag:nth-child(2) { animation-delay: 0.15s; }
.skill-tag:nth-child(3) { animation-delay: 0.2s; }
.skill-tag:nth-child(4) { animation-delay: 0.25s; }
.skill-tag:nth-child(5) { animation-delay: 0.3s; }
.skill-tag:nth-child(6) { animation-delay: 0.35s; }
.skill-tag:nth-child(7) { animation-delay: 0.4s; }
.skill-tag:nth-child(8) { animation-delay: 0.45s; }
.skill-tag:nth-child(n+9) { animation-delay: 0.5s; }

.skill-tag::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(61, 210, 204, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
  z-index: 0;
}

/* Binary loading on skill tags */
.skill-tag::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(61, 210, 204, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.4s, height 0.4s;
  z-index: 0;
}

.skill-tag:hover::before {
  width: 200%;
  height: 200%;
}

.skill-tag:hover {
  transform: translateY(-5px) scale(1.05);
  background: linear-gradient(135deg, #3dd2cc, #29b3ad);
  color: white;
  box-shadow: 0 8px 25px rgba(61, 210, 204, 0.5);
  border-color: #66dcd7;
}

.skill-name {
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.skill-rating {
  display: flex;
  gap: 3px;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.star {
  color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  display: inline-block;
  animation: star-pulse 2s infinite;
}

.star.filled {
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.skill-tag:hover .star {
  color: rgba(255, 255, 255, 0.4);
  transform: scale(1.2);
}

.skill-tag:hover .star.filled {
  color: #FFF;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

@keyframes star-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.facts-grid {
  display: grid;
  gap: 15px;
}

.fact-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fact-label {
  font-size: 14px;
  font-weight: 600;
  color: #3dd2cc;
}

.fact-value {
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  padding-bottom: 30px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  opacity: 0;
  animation: timelineBinaryLoad 1s ease-out forwards;
}

@keyframes timelineBinaryLoad {
  0% {
    opacity: 0;
    transform: translateX(-30px);
    filter: blur(5px);
  }
  30% {
    opacity: 0.3;
  }
  60% {
    opacity: 0.7;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }

.timeline-item:hover {
  transform: translateX(10px);
  filter: drop-shadow(0 5px 20px rgba(61, 210, 204, 0.3));
}

.timeline-item:hover h3 {
  color: #66dcd7;
  text-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
}

.timeline-item:hover p {
  color: #fff;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -30px;
  top: 5px;
  width: 14px;
  height: 14px;
  background: #3dd2cc;
  border-radius: 50%;
  border: 3px solid rgba(7, 18, 26, 1);
  box-shadow: 
    0 0 0 3px rgba(61, 210, 204, 0.3),
    0 0 15px rgba(61, 210, 204, 0.6);
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item:hover .timeline-dot {
  width: 18px;
  height: 18px;
  top: 3px;
  left: -32px;
  box-shadow: 
    0 0 0 5px rgba(61, 210, 204, 0.4),
    0 0 25px rgba(61, 210, 204, 0.8);
  animation: pulse-timeline 1.5s infinite;
}

@keyframes pulse-timeline {
  0%, 100% {
    box-shadow: 
      0 0 0 5px rgba(61, 210, 204, 0.4),
      0 0 25px rgba(61, 210, 204, 0.8);
  }
  50% {
    box-shadow: 
      0 0 0 8px rgba(61, 210, 204, 0.2),
      0 0 35px rgba(61, 210, 204, 1);
  }
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 17px;
  bottom: -10px;
  width: 2px;
  background: rgba(61, 210, 204, 0.3);
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-content h4 {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
}

.timeline-content .company {
  color: #66dcd7;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.timeline-content .date-range {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0;
}

.education-list {
  display: grid;
  gap: 20px;
}

.education-item {
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 15px 20px;
  border-radius: 8px;
  background: rgba(61, 210, 204, 0.05);
  border: 1px solid rgba(61, 210, 204, 0.2);
  overflow: hidden;
  opacity: 0;
  animation: educationBinaryLoad 1s ease-out forwards;
}

@keyframes educationBinaryLoad {
  0% {
    opacity: 0;
    transform: scale(0.95);
    box-shadow: 0 0 30px rgba(61, 210, 204, 0.8);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 20px rgba(61, 210, 204, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: none;
  }
}

.education-item:nth-child(1) { animation-delay: 0.1s; }
.education-item:nth-child(2) { animation-delay: 0.2s; }
.education-item:nth-child(3) { animation-delay: 0.3s; }
.education-item:nth-child(4) { animation-delay: 0.4s; }

/* Binary code effect for education items */
.education-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background: linear-gradient(180deg, #3dd2cc, #66dcd7);
  transform: scaleY(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.education-item:hover {
  transform: translateX(10px) scale(1.02);
  background: rgba(61, 210, 204, 0.1);
  border-color: #3dd2cc;
  box-shadow: 
    0 5px 20px rgba(61, 210, 204, 0.3),
    inset 0 0 30px rgba(61, 210, 204, 0.1);
}

.education-item:hover::before {
  transform: scaleY(1);
}

.education-item h4 {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
  transition: all 0.3s ease;
}

.education-item:hover h4 {
  color: #66dcd7;
  text-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
  transform: translateX(5px);
}

.education-item p {
  color: #66dcd7;
  font-weight: 600;
  margin: 0;
  transition: all 0.3s ease;
}

.education-item:hover p {
  color: #fff;
  transform: translateX(5px);
}

.feedback-section {
  margin-bottom: 30px;
}

.feedback-card {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.15), rgba(102, 220, 215, 0.08));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.feedback-card:hover {
  border-color: rgba(61, 210, 204, 0.5);
  box-shadow: 0 12px 32px rgba(61, 210, 204, 0.3);
}

.feedback-card h2 {
  font-size: 26px;
  color: #3dd2cc;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.contact-section {
  margin-bottom: 0;
}

.contact-card {
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.15), rgba(102, 220, 215, 0.08));
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: rgba(61, 210, 204, 0.5);
  box-shadow: 0 8px 24px rgba(61, 210, 204, 0.3);
}

.contact-card h3 {
  font-size: 18px;
  color: #3dd2cc;
  margin: 0 0 20px 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-info {
  text-align: center;
}

.contact-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(61, 210, 204, 0.5);
  box-shadow: 0 4px 12px rgba(61, 210, 204, 0.3);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-name {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 5px 0;
}

.contact-role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
}

.contact-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(61, 210, 204, 0.08);
  border: 1px solid rgba(61, 210, 204, 0.3);
  border-radius: 12px;
  color: #66dcd7;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.link-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(61, 210, 204, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
  border-radius: 50%;
}

.contact-link:hover .link-glow {
  width: 300px;
  height: 300px;
}

.contact-link:hover {
  background: rgba(61, 210, 204, 0.15);
  border-color: #3dd2cc;
  transform: translateX(5px) scale(1.02);
  box-shadow: -5px 5px 20px rgba(61, 210, 204, 0.3);
  color: #3dd2cc;
}

.contact-icon {
  font-size: 18px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-link:hover .contact-icon {
  transform: scale(1.3) rotate(15deg);
}

.contact-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #3dd2cc, #29b3ad);
  border: none;
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 5px 15px rgba(61, 210, 204, 0.4);
  margin-top: 8px;
  overflow: hidden;
}

.btn-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.contact-btn:hover .btn-shine {
  transform: translateX(100%);
}

.contact-btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-arrow-right {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(-10px);
}

.contact-btn:hover .btn-arrow-right {
  opacity: 1;
  transform: translateX(0);
}

.contact-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 30px rgba(61, 210, 204, 0.6);
  background: linear-gradient(135deg, #66dcd7, #3dd2cc);
}

.feedback-prompt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin-bottom: 20px;
}

.feedback-textarea {
  width: 100%;
  min-height: 120px;
  padding: 18px;
  border: 2px solid rgba(61, 210, 204, 0.3);
  background: rgba(7, 18, 26, 0.6);
  color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  font-family: 'Courier New', monospace;
  font-size: 15px;
  resize: vertical;
  margin-bottom: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
}

.feedback-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}

.feedback-textarea:focus {
  outline: none;
  border-color: #3dd2cc;
  background: rgba(7, 18, 26, 0.8);
  box-shadow: 
    0 0 0 4px rgba(61, 210, 204, 0.1),
    0 0 30px rgba(61, 210, 204, 0.3),
    inset 0 0 20px rgba(61, 210, 204, 0.05);
  transform: scale(1.02);
}

.feedback-textarea:focus::placeholder {
  color: rgba(61, 210, 204, 0.4);
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  position: relative;
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  flex: 1;
  min-width: 200px;
}

/* Binary loading effect for buttons */
.btn::after {
  content: '01010011 01110101 01100011 01100011 01100101 01110011 01110011';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-size: 9px;
  color: rgba(255, 255, 255, 0);
  background: rgba(61, 210, 204, 0);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  letter-spacing: 1px;
  z-index: 1;
}

.btn:hover::after {
  opacity: 1;
  color: rgba(255, 255, 255, 0.15);
  background: rgba(61, 210, 204, 0.1);
  animation: binaryLoad 0.6s steps(10, end);
}

@keyframes binaryLoad {
  0% {
    content: '00000000 00000000 00000000 00000000';
  }
  25% {
    content: '01000000 01100000 01100000 00000000';
  }
  50% {
    content: '01010011 01110101 01100011 01100011';
  }
  75% {
    content: '01010011 01110101 01100011 01100011 01100101';
  }
  100% {
    content: '01010011 01110101 01100011 01100011 01100101 01110011 01110011';
  }
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-icon {
  display: inline-block;
  font-size: 20px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover .btn-icon {
  transform: scale(1.3) rotate(10deg);
}

.btn-arrow {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(-10px);
}

.btn-arrow.active {
  opacity: 1;
  transform: translateX(0);
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover .btn-ripple {
  width: 400px;
  height: 400px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn:disabled .btn-ripple {
  display: none;
}

.btn-success {
  background: linear-gradient(135deg, #3dd2cc 0%, #29b3ad 100%);
  color: white;
  box-shadow: 0 5px 20px rgba(61, 210, 204, 0.4);
  border: 2px solid transparent;
}

.btn-success::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #66dcd7, #3dd2cc, #29b3ad);
  border-radius: 50px;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s;
}

.btn-success:hover::before {
  opacity: 1;
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 40px rgba(61, 210, 204, 0.6);
  animation: pulse-success 1.5s infinite;
}

@keyframes pulse-success {
  0%, 100% {
    box-shadow: 0 10px 40px rgba(61, 210, 204, 0.6);
  }
  50% {
    box-shadow: 0 10px 50px rgba(61, 210, 204, 0.8), 0 0 30px rgba(61, 210, 204, 0.4);
  }
}

.btn-decline {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.2), rgba(220, 53, 69, 0.1));
  border: 2px solid rgba(220, 53, 69, 0.6);
  color: #ff6b6b;
  box-shadow: 0 5px 20px rgba(220, 53, 69, 0.2);
  position: relative;
}

.btn-decline::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50px;
  padding: 2px;
  background: linear-gradient(135deg, #ff6b6b, #dc3545);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s;
}

.btn-decline:hover::after {
  opacity: 1;
}

.btn-decline:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.3), rgba(220, 53, 69, 0.2));
  border-color: #ff6b6b;
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 40px rgba(220, 53, 69, 0.4);
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateY(-5px) scale(1.02) translateX(0); }
  25% { transform: translateY(-5px) scale(1.02) translateX(-5px); }
  75% { transform: translateY(-5px) scale(1.02) translateX(5px); }
}

.success-message {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(61, 210, 204, 0.3), rgba(102, 220, 215, 0.2));
  color: #3dd2cc;
  border-radius: 15px;
  border: 2px solid #3dd2cc;
  font-weight: 700;
  text-align: center;
  box-shadow: 
    0 0 30px rgba(61, 210, 204, 0.4),
    inset 0 0 20px rgba(61, 210, 204, 0.1);
  animation: success-appear 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.success-message::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: success-shine 2s infinite;
}

@keyframes success-appear {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  50% {
    transform: scale(1.1) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes success-shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .right-column {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .profile-page-container {
    padding: 10px;
  }

  .profile-content {
    padding: 1.5rem 0;
    max-width: 100%;
  }

  .content-grid {
    gap: 1.5rem;
  }

  .header-banner,
  .candidate-section,
  .feedback-card,
  .contact-card {
    padding: 1.25rem;
    border-radius: 12px;
  }

  .company-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .company-logo {
    width: 80px;
    height: 80px;
  }

  .company-name {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .partner-name {
    font-size: 15px;
    margin-bottom: 12px;
  }

  .company-description {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .candidate-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    padding-bottom: 20px;
    margin-bottom: 25px;
  }

  .profile-placeholder {
    width: 90px;
    height: 90px;
  }

  .profile-icon {
    width: 45px;
    height: 45px;
  }

  .profile-title h2 {
    font-size: 22px;
  }

  .profile-subtitle {
    font-size: 14px;
  }

  .info-card {
    padding: 18px;
    margin-bottom: 15px;
  }

  .info-card h3 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .text-content {
    font-size: 14px;
    line-height: 1.6;
  }

  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .btn {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
    font-size: 15px;
  }

  /* Timeline mobile optimization */
  .timeline {
    padding-left: 20px;
  }

  .timeline-dot {
    left: -20px;
    width: 10px;
    height: 10px;
  }

  .timeline-item:hover .timeline-dot {
    width: 12px;
    height: 12px;
    left: -21px;
  }

  .timeline-item:hover {
    transform: translateX(5px);
  }

  /* Education items mobile optimization */
  .education-item {
    padding: 12px 15px;
  }

  .education-item:hover {
    transform: translateX(5px) scale(1.01);
  }

  .education-item h4 {
    font-size: 15px;
  }

  .education-item p {
    font-size: 13px;
  }

  /* Contact links mobile optimization */
  .contact-link {
    padding: 14px 18px;
    font-size: 14px;
  }

  .contact-link .link-arrow {
    width: 16px;
    height: 16px;
  }

  /* Feedback textarea mobile */
  .feedback-textarea {
    min-height: 120px;
    font-size: 14px;
    padding: 12px;
  }

  /* Success message mobile */
  .success-message {
    padding: 15px 18px;
    font-size: 14px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Disable hover effects on touch devices, use active states instead */
  .timeline-item:hover {
    transform: none;
    filter: none;
  }

  .timeline-item:active {
    transform: translateX(10px);
    filter: drop-shadow(0 5px 20px rgba(61, 210, 204, 0.3));
  }

  .timeline-item:hover .timeline-dot {
    width: 14px;
    height: 14px;
    top: 5px;
    left: -30px;
    animation: none;
  }

  .timeline-item:active .timeline-dot {
    width: 18px;
    height: 18px;
    top: 3px;
    left: -32px;
    animation: pulse-timeline 1.5s infinite;
  }

  .education-item:hover {
    transform: none;
    background: rgba(61, 210, 204, 0.05);
    border-color: rgba(61, 210, 204, 0.2);
    box-shadow: none;
  }

  .education-item:active {
    transform: translateX(10px) scale(1.02);
    background: rgba(61, 210, 204, 0.1);
    border-color: #3dd2cc;
    box-shadow: 
      0 5px 20px rgba(61, 210, 204, 0.3),
      inset 0 0 30px rgba(61, 210, 204, 0.1);
  }

  .education-item:hover::before {
    transform: scaleY(0);
  }

  .education-item:active::before {
    transform: scaleY(1);
  }

  .education-item:hover h4,
  .education-item:hover p {
    color: #ffffff;
    text-shadow: none;
    transform: none;
  }

  .education-item:active h4 {
    color: #66dcd7;
    text-shadow: 0 0 10px rgba(61, 210, 204, 0.5);
    transform: translateX(5px);
  }

  .education-item:active p {
    color: #fff;
    transform: translateX(5px);
  }

  /* Contact links for touch */
  .contact-link:hover {
    transform: none;
    background: transparent;
  }

  .contact-link:active {
    transform: translateX(5px) scale(1.02);
    background: rgba(61, 210, 204, 0.1);
  }

  .contact-link:hover .link-glow {
    width: 0;
    height: 0;
  }

  .contact-link:active .link-glow {
    width: 300px;
    height: 300px;
  }

  .contact-link:hover .link-arrow {
    transform: none;
  }

  .contact-link:active .link-arrow {
    transform: translateX(3px) rotate(-45deg);
  }

  /* Button effects for touch */
  .btn-success:hover,
  .btn-decline:hover {
    transform: none;
    animation: none;
  }

  .btn-success:active {
    transform: translateY(-2px);
    animation: pulse-success 1.5s infinite;
  }

  .btn-decline:active {
    transform: translateY(-2px);
    animation: shake 0.5s ease;
  }

  .btn-success:hover .btn-ripple,
  .btn-decline:hover .btn-ripple {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .btn-success:active .btn-ripple,
  .btn-decline:active .btn-ripple {
    width: 400px;
    height: 400px;
    opacity: 1;
  }

  .btn-success:hover .btn-arrow,
  .btn-decline:hover .btn-arrow {
    transform: none;
  }

  .btn-success:active .btn-arrow,
  .btn-decline:active .btn-arrow {
    transform: translateX(5px);
  }

  /* Disable textarea transform on focus for mobile */
  .feedback-textarea:focus {
    transform: none;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .profile-page-container {
    padding: 5px;
  }

  .header-banner,
  .candidate-section,
  .feedback-card,
  .contact-card {
    padding: 1rem;
    border-radius: 10px;
  }

  .company-name {
    font-size: 20px;
  }

  .profile-title h2 {
    font-size: 20px;
  }

  .action-buttons {
    gap: 10px;
  }

  .btn {
    padding: 10px 16px;
    font-size: 14px;
  }

  .btn-arrow {
    width: 14px;
    height: 14px;
  }

  /* Reduce Matrix effect on small screens */
  .matrix-bg {
    opacity: 0.03;
  }

  .particle {
    width: 1.5px;
    height: 1.5px;
  }

  .grid-overlay {
    opacity: 0.1;
  }

  /* Smaller timeline elements */
  .timeline {
    padding-left: 15px;
  }

  .timeline-dot {
    left: -15px;
    width: 8px;
    height: 8px;
  }

  .timeline-item h3 {
    font-size: 15px;
  }

  .timeline-item p {
    font-size: 13px;
  }

  /* Disable cursor trail on mobile */
  .cursor-trail {
    display: none;
  }

  /* Simplify scroll progress bar */
  .scroll-progress-bar {
    height: 2px;
  }
}
</style>
