<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-6">Offene Stellen</h1>
    <p class="text-lg text-gray-700 mb-10">Hier finden Sie unsere aktuell ausgeschriebenen Vakanzen für Fach- und Führungskräfte im Bauwesen sowie unsere internen Stellen bei Bricks & Minds.</p>

    <!-- Search Functionality -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-10">
      <h2 class="text-xl font-semibold text-brand-dark-blue mb-4">Stellensuche</h2>
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <input type="text" placeholder="Stichwort (z.B. Bauleiter, TGA)" class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out">
        <input type="text" placeholder="Ort oder PLZ" class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out">
        <button class="bg-brand-orange hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded transition duration-300 shadow w-full">
          Suchen
        </button>
      </div>
       <!-- Filter for internal/external jobs -->
       <div>
         <label class="inline-flex items-center text-sm text-gray-600">
           <input type="checkbox" class="form-checkbox h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded">
           <span class="ml-2">Nur interne Stellen bei Bricks & Minds anzeigen</span>
         </label>
       </div>
    </div>

    <!-- Job Listings -->
    <div class="space-y-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Aktuelle Vakanzen</h2>
      <!-- Loading State -->
      <div v-if="loading" class="text-center text-gray-600">Lade Stellenangebote...</div>
      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-600">Fehler beim Laden der Stellenangebote: {{ error.message }}</div>
      <!-- Job Items -->
      <div v-else-if="jobs.length > 0" v-for="job in jobs" :key="job.job_id" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 border-l-4" :class="job.json?.is_internal ? 'border-brand-green' : 'border-brand-orange'">
        <h3 class="text-xl font-semibold text-brand-orange mb-2">{{ job.json?.title || 'Unbenannte Stelle' }}</h3>
        <p class="text-brand-gray-medium text-sm mb-1">Standort: {{ job.json?.location || 'Nicht angegeben' }}</p>
        <p class="text-gray-700 text-sm mb-3">{{ job.json?.short_description || 'Keine Beschreibung verfügbar...' }}</p>
        <NuxtLink :to="`/jobs/${job.job_id}`" class="text-brand-dark-blue hover:underline font-semibold inline-flex items-center">
            Mehr erfahren <span class="ml-1">→</span>
        </NuxtLink>
      </div>
      <!-- No Jobs Found -->
      <div v-else class="text-center text-gray-600">Aktuell sind keine offenen Stellen verfügbar.</div>

      <p class="text-center text-gray-600 pt-4">Keine passende Stelle gefunden? <NuxtLink to="/kandidaten" class="text-brand-orange hover:underline font-semibold">Initiativ bewerben!</NuxtLink></p>
    </div>

     <!-- Data Storage Information -->
     <section class="mt-12 bg-brand-gray-light p-6 rounded-lg border border-brand-gray-medium">
        <h2 class="text-xl font-semibold text-brand-dark-blue mb-3">Hinweis zur Datenspeicherung</h2>
        <p class="text-sm text-gray-700 mb-4">Mit Ihrer Bewerbung erklären Sie sich damit einverstanden, dass wir Ihre Daten zum Zwecke des Bewerbungs- und Vermittlungsprozesses speichern und verarbeiten. Ihre Daten werden streng vertraulich behandelt und nur mit Ihrer ausdrücklichen Zustimmung an potenzielle Arbeitgeber weitergegeben. Sie können Ihre Einwilligung jederzeit widerrufen.</p>
        <NuxtLink to="/datenschutz" class="text-sm text-brand-dark-blue hover:underline font-semibold">Zur Datenschutzerklärung</NuxtLink>
        <!-- Integration with recruitcrm.io would happen here or via form submission logic -->
     </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';

// Supabase Credentials (consider moving to environment variables for security)
const supabaseUrl = 'https://vccbpwvprepehqxatnuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjY2Jwd3ZwcmVwZWhxeGF0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY3MjQsImV4cCI6MTk5MDY0MjcyNH0.zEG6vuzJyiT0penToBCqyTWJnaHjmjGU0TbM7mQkJVY';
const supabase = createClient(supabaseUrl, supabaseKey);

const jobs = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch jobs from Supabase
const fetchJobs = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data, error: fetchError } = await supabase
      .from('public_job_ads')
      .select('job_id, json') // Select job_id and the json column
      .eq('is_public', true); // Filter for public jobs

    if (fetchError) throw fetchError;

    // Assuming 'json' column contains job details like title, location, short_description, is_internal
    jobs.value = data || [];
  } catch (err) {
    console.error('Error fetching jobs:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// Fetch jobs when the component is mounted
onMounted(() => {
  fetchJobs();
});

useHead({
  title: 'Jobs - Bricks & Minds',
  meta: [
    { name: 'description', content: 'Finden Sie aktuelle Stellenangebote im Bauwesen und interne Karrieremöglichkeiten bei Bricks & Minds.' }
  ]
})
</script>
