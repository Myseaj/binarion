<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-24 md:py-32 text-center rounded-lg shadow-xl mb-20 relative overflow-hidden">
      <!-- Optional: Add subtle background pattern or image -->
      <!-- <div class="absolute inset-0 bg-[url('/path/to/hero-bg.svg')] opacity-10"></div> -->
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">Bricks & Minds – Wir bauen Teams, die Zukunft gestalten</h1>
        <p class="text-lg md:text-xl text-brand-gray-light mb-12 max-w-3xl mx-auto leading-relaxed">Die Boutique-Personalberatung für Fach- und Führungskräfte im Bauwesen. Maßgeschneidert. Effizient. Deutschlandweit.</p>
        <div class="space-y-4 sm:space-y-0 sm:space-x-6">
          <NuxtLink
            to="/unternehmen"
            class="btn btn-primary"
            aria-label="Erfahren Sie mehr über unsere Leistungen für Unternehmen"
          >
            Personal finden
          </NuxtLink>
          <NuxtLink
            to="/kandidaten"
            class="btn btn-secondary"
            aria-label="Entdecken Sie Karrieremöglichkeiten für Kandidaten"
          >
            Jetzt bewerben
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Kurzvorstellung -->
    <section ref="introSection" class="mb-20 container mx-auto px-4 animated-section">
      <h2 class="text-3xl md:text-4xl font-semibold text-brand-dark-blue mb-8 text-center">Willkommen bei Bricks & Minds</h2>
      <p class="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center leading-relaxed">
        Wir sind Bricks & Minds, die erste Wahl für Unternehmen, die nicht einfach nur Personal, sondern die richtigen Köpfe suchen. Mit tiefem Branchenverständnis und einem exklusiven Netzwerk bringen wir Fach- und Führungskräfte aus Hochbau, TGA, Elektrotechnik, konstruktivem Ingenieurbau, Tiefbau, Gleisbau sowie Facility- und Property-Management mit führenden Unternehmen zusammen.
      </p>
       <p class="text-center text-gray-500 italic text-base">Digital. Innovativ. Persönlich.</p>
    </section>

    <!-- Leistungen im Überblick -->
    <section ref="servicesSection" class="bg-white p-8 md:p-12 rounded-lg shadow-lg mb-20 border-t-4 border-brand-orange animated-section">
      <h3 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-10 text-center">Unsere Kernkompetenzen</h3>
      <div class="grid md:grid-cols-3 gap-10 text-center">
          <!-- Service Card 1 -->
          <div class="service-card">
              <div class="text-5xl text-brand-orange mb-4">✓</div>
              <h4 class="text-xl font-semibold text-brand-dark-blue mb-3">Für Unternehmen</h4>
              <p class="text-gray-600 leading-relaxed">Passgenaue Besetzung von Schlüsselpositionen in Technik & Bau</p>
          </div>
           <!-- Service Card 2 -->
           <div class="service-card">
              <div class="text-5xl text-brand-orange mb-4">✓</div>
              <h4 class="text-xl font-semibold text-brand-dark-blue mb-3">Für Kandidaten</h4>
              <p class="text-gray-600 leading-relaxed">Karrierechancen bei Top-Arbeitgebern der Branche</p>
          </div>
           <!-- Service Card 3 -->
           <div class="service-card">
              <div class="text-5xl text-brand-orange mb-4">✓</div>
              <h4 class="text-xl font-semibold text-brand-dark-blue mb-3">Unser Ansatz</h4>
              <p class="text-gray-600 leading-relaxed">Boutique-Lösung mit direktem Zugang zu den Besten</p>
          </div>
      </div>
      <p class="text-center mt-12">
        <NuxtLink
          to="/kontakt"
          class="btn btn-dark"
          aria-label="Nehmen Sie unverbindlich Kontakt mit uns auf"
        >
            🛠️ Bereit, Ihr Team zu stärken? – Jetzt unverbindlich Kontakt aufnehmen!
        </NuxtLink>
      </p>
    </section>

    <!-- Optional: Add Testimonials or Logos section here -->
    <!-- Example: <section ref="testimonialsSection" class="mb-20 container mx-auto px-4 animated-section">...</section> -->

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

useHead({
  title: 'Bricks & Minds - Personalberatung Bauwesen',
  meta: [
    { name: 'description', content: 'Bricks & Minds – Die Boutique-Personalberatung für Fach- und Führungskräfte im Bauwesen. Maßgeschneidert. Effizient. Deutschlandweit.' }
  ]
});

// Refs for sections to animate
const introSection = ref(null);
const servicesSection = ref(null);
// Add refs for other sections as needed
// const testimonialsSection = ref(null);

let observer = null;

onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe the sections
    const sectionsToObserve = [introSection.value, servicesSection.value].filter(Boolean);
    // Add other section refs here: e.g., testimonialsSection.value
    sectionsToObserve.forEach(section => {
      observer.observe(section);
    });

  } else {
    // Fallback for browsers without IntersectionObserver: make sections visible immediately
    const sections = [introSection.value, servicesSection.value].filter(Boolean);
    sections.forEach(section => section.classList.add('is-visible'));
  }
});

onBeforeUnmount(() => {
  // Clean up the observer when the component is unmounted
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style>
/* Global Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Base Button Styles */
.btn {
  display: inline-block;
  font-weight: bold;
  padding: 0.8rem 1.75rem; /* Slightly adjusted padding */
  border-radius: 0.375rem; /* Equivalent to rounded-md */
  transition: all 0.3s ease-in-out; /* Smoother transition */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Default shadow */
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent; /* Add border for consistent sizing on hover */
}

/* Primary Button (Orange) */
.btn-primary {
  background-color: #F59E0B; /* brand-orange */
  color: white;
}
.btn-primary:hover {
  background-color: #D97706; /* Darker orange */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Larger shadow */
  transform: translateY(-2px); /* Subtle lift */
}
.btn-primary:focus-visible { /* Accessibility focus */
  outline: 2px solid #F59E0B;
  outline-offset: 2px;
}


/* Secondary Button (White) */
.btn-secondary {
  background-color: white;
  color: #1E3A8A; /* brand-dark-blue */
  border-color: #E5E7EB; /* Light gray border */
}
.btn-secondary:hover {
  background-color: #F9FAFB; /* Very light gray */
  border-color: #D1D5DB; /* Slightly darker gray border */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
.btn-secondary:focus-visible { /* Accessibility focus */
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Dark Button (Blue) */
.btn-dark {
  background-color: #1E3A8A; /* brand-dark-blue */
  color: white;
}
.btn-dark:hover {
  background-color: #1D4ED8; /* Slightly lighter blue */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}
.btn-dark:focus-visible { /* Accessibility focus */
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}


/* Service Card Hover Effect */
.service-card {
  padding: 1.5rem; /* p-6 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: white; /* Ensure background for shadow */
}
.service-card:hover {
  transform: scale(1.03) translateY(-5px); /* Slightly more noticeable scale and lift */
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15); /* Softer, larger shadow */
}

/* Animation Section Styling */
.animated-section {
  opacity: 0;
  transform: translateY(30px); /* Start slightly lower */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animated-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Add delays for staggered animation if desired */
/* Example: Apply this class to the second animated section */
/* .animated-section:nth-of-type(2) { transition-delay: 0.2s; } */
/* Or use inline styles if dynamic delays are needed */

/* Improve readability */
p {
  line-height: 1.7; /* Slightly increased line height for paragraphs */
}

h1, h2, h3, h4 {
   line-height: 1.3; /* Ensure headings have tight but readable line height */
}

/* Responsive adjustments if needed */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 4rem; /* Adjust padding on smaller screens */
    padding-bottom: 4rem;
  }
  .btn {
    padding: 0.7rem 1.5rem; /* Adjust button padding */
    font-size: 0.9rem; /* Adjust button font size */
  }
  h1 {
    font-size: 2.25rem; /* Adjust h1 size */
  }
  h2 {
    font-size: 1.875rem; /* Adjust h2 size */
  }
}

</style>
