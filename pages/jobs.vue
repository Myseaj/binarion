<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-6">Offene Stellen</h1>
    <p class="text-lg text-gray-700 mb-10">Hier finden Sie unsere aktuell ausgeschriebenen Vakanzen für Fach- und Führungskräfte im Bauwesen sowie unsere internen Stellen bei Bricks & Minds.</p>

    <!-- Search Functionality -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-10">
      <h2 class="text-xl font-semibold text-brand-dark-blue mb-4">Stellensuche</h2>
      <div class="grid md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          v-model="searchTerm"
          @keyup.enter="performSearch"
          placeholder="Stichwort (z.B. Bauleiter, TGA)"
          class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out"
        >
        <input
          type="text"
          v-model="locationTerm"
          @keyup.enter="performSearch"
          placeholder="Ort oder PLZ"
          class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out"
        >
        <button
          @click="performSearch"
          class="bg-brand-orange hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded transition duration-300 shadow w-full"
        >
          Suchen
        </button>
      </div>
    </div>

    <!-- Job Listings -->
    <div class="space-y-6">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Aktuelle Vakanzen</h2>
      <!-- Loading State (Initial Load) -->
      <div v-if="loading && jobs.length === 0" class="text-center text-gray-600">Lade Stellenangebote...</div>
      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-600">Fehler beim Laden der Stellenangebote: {{ error.message }}</div>
      <!-- Job Items -->
      <div v-else-if="jobs.length > 0" v-for="job in jobs" :key="job.job_id" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 border-l-4" :class="job.json?.is_internal ? 'border-brand-green' : 'border-brand-orange'">
        <h3 class="text-xl font-semibold text-brand-orange mb-2">{{ job.json?.title || 'Unbenannte Stelle' }}</h3>
        <p class="text-brand-gray-medium text-sm mb-1">Standort: {{ job.json?.location || 'Nicht angegeben' }}</p>
        <p class="text-gray-700 text-sm mb-3">
          <span class="font-medium text-brand-gray-medium">Gehaltsrahmen:</span> {{ job.json?.salary_range || 'Nicht angegeben' }}
        </p>
        <NuxtLink :to="`/job/${job.job_id}`" class="text-brand-dark-blue hover:underline font-semibold inline-flex items-center">
            Mehr erfahren <span class="ml-1">→</span>
        </NuxtLink>
      </div>
      <!-- No Jobs Found (After initial load) -->
      <div v-else-if="!loading && jobs.length === 0" class="text-center text-gray-600">Aktuell sind keine offenen Stellen verfügbar.</div>

      <!-- Load More Section -->
      <div class="text-center pt-4">
        <div v-if="loadingMore" class="text-gray-600">Lade weitere Stellen...</div>
        <button
          v-else-if="hasMoreJobs"
          @click="loadMoreJobs"
          :disabled="loadingMore"
          class="bg-brand-dark-blue hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded transition duration-300 shadow disabled:opacity-50"
        >
          Mehr laden
        </button>
      </div>

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
const loading = ref(true); // For initial load
const loadingMore = ref(false); // For loading more jobs
const error = ref(null);
const limit = ref(50); // Number of jobs to fetch per page
const offset = ref(0); // Current offset
const hasMoreJobs = ref(true); // Flag to indicate if more jobs might be available
const searchTerm = ref(''); // Added for keyword search
const locationTerm = ref(''); // Added for location search

// Fetch jobs from Supabase with pagination and search
const fetchJobs = async (isInitialLoad = false, search = '', location = '') => {
  if (isInitialLoad) {
    loading.value = true;
    offset.value = 0; // Reset offset for initial load/new search
    jobs.value = []; // Clear existing jobs for initial load/new search
  } else {
    loadingMore.value = true;
  }
  error.value = null;

  try {
    let query = supabase
      .from('public_job_ads')
      .select('job_id, json') // Select job_id and the json column
      .eq('is_public', true); // Filter for public jobs

    // Apply search filters if terms are provided
    if (search) {
      query = query.ilike('json->>title', `%${search}%`);
    }
    if (location) {
      query = query.ilike('json->>location', `%${location}%`);
    }

    // Apply pagination (Removed ordering by created_at)
    query = query
      .range(offset.value, offset.value + limit.value - 1); // Apply range for pagination

    const { data, error: fetchError } = await query;

    if (fetchError) throw fetchError;

    const fetchedJobs = data || [];
    jobs.value = [...jobs.value, ...fetchedJobs]; // Append new jobs

    // Update offset for the next fetch
    offset.value += fetchedJobs.length;

    // Check if there might be more jobs based on the limit
    hasMoreJobs.value = fetchedJobs.length === limit.value;

  } catch (err) {
    console.error('Error fetching jobs:', err);
    error.value = err;
  } finally {
    if (isInitialLoad) {
      loading.value = false;
    } else {
      loadingMore.value = false;
    }
  }
};

// Function to trigger a new search
const performSearch = () => {
  // Pass current search terms for the initial load of the filtered list
  fetchJobs(true, searchTerm.value, locationTerm.value);
};

// Function to load the next batch of jobs (respecting current search terms)
const loadMoreJobs = () => {
  if (!loadingMore.value && hasMoreJobs.value) {
    // Pass current search terms for subsequent loads
    fetchJobs(false, searchTerm.value, locationTerm.value);
  }
};

// Fetch initial jobs (or perform initial empty search) when the component is mounted
onMounted(() => {
  performSearch(); // Perform initial fetch (which might be an empty search)
});

useHead({
  title: 'Jobs - Bricks & Minds',
  meta: [
    { name: 'description', content: 'Finden Sie aktuelle Stellenangebote im Bauwesen und interne Karrieremöglichkeiten bei Bricks & Minds.' }
  ]
})
</script>
