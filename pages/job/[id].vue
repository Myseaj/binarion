<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <p class="text-lg text-gray-600">Lade Jobdetails...</p>
      <!-- Optional: Add a spinner animation here -->
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
      <strong class="font-bold">Fehler!</strong>
      <span class="block sm:inline"> Die Jobdetails konnten nicht geladen werden: {{ error.message }}</span>
      <NuxtLink to="/jobs" class="block mt-2 text-brand-dark-blue hover:underline font-semibold">Zurück zur Jobübersicht</NuxtLink>
    </div>

    <!-- Job Details -->
    <div v-else-if="job" class="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <NuxtLink to="/jobs" class="text-sm text-brand-dark-blue hover:underline mb-6 inline-block">&larr; Zurück zur Übersicht</NuxtLink>

      <h1 class="text-3xl md:text-4xl font-bold text-brand-dark-blue mb-4">{{ job.title || 'Jobtitel nicht verfügbar' }}</h1>

      <!-- Key Information Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 border-b border-t border-brand-gray-light py-4">
        <div>
          <span class="text-sm text-brand-gray-medium block">Standort</span>
          <span class="font-semibold text-gray-800">{{ job.location || 'Nicht angegeben' }}</span>
        </div>
        <div>
          <span class="text-sm text-brand-gray-medium block">Anstellungsart</span>
          <span class="font-semibold text-gray-800">{{ job.position_type || 'Festanstellung' }}</span> <!-- Default or fetch -->
        </div>
        <div>
          <span class="text-sm text-brand-gray-medium block">Gehaltsrahmen</span>
          <span class="font-semibold text-gray-800">{{ job.salary_range || 'Nicht angegeben' }}</span>
        </div>
      </div>

      <!-- Main Job Description (Rendered HTML) -->
      <!-- Ensure Tailwind Typography plugin is installed and configured for prose classes -->
      <div class="prose prose-lg max-w-none mb-8 job-content" v-html="job.jobad_html_description || '<p>Keine Beschreibung verfügbar.</p>'"></div>

       <!-- Apply Button -->
       <div class="mt-8 mb-8 text-center">
         <NuxtLink :to="applyLink" class="bg-brand-orange hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded transition duration-300 shadow text-lg">
           Jetzt bewerben
         </NuxtLink>
       </div>

      <!-- Recruiter/Contact Information -->
      <div v-if="job.responseUser" class="bg-brand-gray-light p-6 rounded-lg border border-brand-gray-medium mt-8">
        <h2 class="text-xl font-semibold text-brand-dark-blue mb-4">Ihr Ansprechpartner</h2>
        <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <img v-if="job.responseUser.imageLink" :src="job.responseUser.imageLink" :alt="job.responseUser.full_name" class="h-20 w-20 rounded-full object-cover border-2 border-brand-orange">
          <div class="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-2xl flex-shrink-0" v-else>
            {{ job.responseUser.firstName?.charAt(0) }}{{ job.responseUser.lastName?.charAt(0) }}
          </div>
          <div>
            <p class="font-bold text-lg text-gray-800">{{ job.responseUser.full_name }}</p>
            <p class="text-brand-gray-medium">{{ job.responseUser.occupation || 'Recruiting Consultant' }}</p>
            <p v-if="job.responseUser.email" class="text-sm mt-1">
              <a :href="`mailto:${job.responseUser.email}`" class="text-brand-dark-blue hover:underline">{{ job.responseUser.email }}</a>
            </p>
            <p v-if="job.responseUser.phone" class="text-sm">
              <a :href="`tel:${job.responseUser.phone}`" class="text-brand-dark-blue hover:underline">{{ job.responseUser.phone }}</a>
            </p>
            <a v-if="job.responseUser.calendlyLink" :href="job.responseUser.calendlyLink" target="_blank" rel="noopener noreferrer" class="mt-2 inline-block bg-brand-dark-blue text-white text-sm font-semibold py-1 px-3 rounded hover:bg-opacity-90 transition duration-200">
              Termin vereinbaren
            </a>
          </div>
        </div>
      </div>

       <!-- Back to Top / Share -->
       <div class="mt-8 pt-6 border-t border-brand-gray-light text-center">
         <NuxtLink to="/jobs" class="text-sm text-brand-dark-blue hover:underline mb-4 inline-block">&larr; Zurück zur Übersicht</NuxtLink>
         <!-- Add social share buttons if needed -->
       </div>

    </div>
     <!-- No Job Found State -->
     <div v-else-if="!loading && !error" class="text-center py-10">
        <p class="text-xl text-gray-600">Stellenanzeige nicht gefunden.</p>
        <NuxtLink to="/jobs" class="mt-4 inline-block text-brand-orange hover:underline font-semibold">Zurück zur Jobübersicht</NuxtLink>
     </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { createClient } from '@supabase/supabase-js';

// Supabase Credentials (move to .env)
const supabaseUrl = 'https://vccbpwvprepehqxatnuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjY2Jwd3ZwcmVwZWhxeGF0bnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwNjY3MjQsImV4cCI6MTk5MDY0MjcyNH0.zEG6vuzJyiT0penToBCqyTWJnaHjmjGU0TbM7mQkJVY';
const supabase = createClient(supabaseUrl, supabaseKey);

const route = useRoute();
const jobId = route.params.id;

const job = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch job details from Supabase
const fetchJobDetails = async () => {
  if (!jobId) {
    error.value = new Error('Keine Job-ID angegeben.');
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;
  job.value = null; // Reset job data on new fetch

  try {
    const { data, error: fetchError } = await supabase
      .from('public_job_ads')
      .select('json') // Select only the json column
      .eq('job_id', jobId)
      .eq('is_public', true) // Ensure it's public
      .single(); // Expect only one result

    if (fetchError) {
        // Handle case where job is not found or other DB errors
        if (fetchError.code === 'PGRST116') { // PostgREST code for "Requested range not satisfiable" (likely means 0 rows)
             throw new Error('Stellenanzeige nicht gefunden oder nicht öffentlich.');
        } else {
            throw fetchError;
        }
    }

    if (data && data.json) {
      job.value = data.json; // The job details are inside the 'json' field
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

// Computed property for the "Apply Now" link
const applyLink = computed(() => {
  // Simple link to general application page for now
  // Could be enhanced later to include job title/ID in query params
  return '/kandidaten';
});

// Set page title and meta description dynamically
const setupHead = () => {
  if (job.value) {
    useHead({
      title: `${job.value.title || 'Stellenangebot'} - Bricks & Minds`,
      meta: [
        { name: 'description', content: job.value.short_description || `Details zur Stelle ${job.value.title || ''} bei Bricks & Minds.` }
        // Add other relevant meta tags like Open Graph tags if needed
      ]
    });
  } else {
     useHead({
      title: 'Stellenangebot - Bricks & Minds',
      meta: [
        { name: 'description', content: 'Details zu einem Stellenangebot bei Bricks & Minds.' }
      ]
    });
  }
};

// Fetch job details when the component is mounted
onMounted(async () => {
  await fetchJobDetails();
  setupHead(); // Set head info after data is fetched (or after error)
});

// Watch for changes in the job data to update head info if needed (e.g., if data reloads)
watch(job, setupHead);

</script>

<style>
/* Scoped styles or global styles for job content */
.job-content h2 {
  @apply text-2xl font-semibold text-brand-dark-blue mt-6 mb-3;
}
.job-content h3 {
   @apply text-xl font-semibold text-brand-dark-blue mt-5 mb-2;
}
.job-content ul {
  @apply list-disc list-inside mb-4 pl-4 text-gray-700;
}
.job-content li {
  @apply mb-2;
}
.job-content p {
  @apply mb-4 text-gray-700;
}
.job-content a {
  @apply text-brand-orange hover:underline;
}
/* Style the specific divs used in the HTML blob */
.job-content div[style*="background:#666666ff"] {
   @apply bg-brand-gray-medium text-white font-semibold p-2 px-4 rounded-t-md mt-6 mb-0; /* Adjusted margin */
}
.job-content ul[style*="padding:20px"] {
    @apply border border-t-0 border-brand-gray-medium rounded-b-md p-4 pt-3 mb-6; /* Add border and padding */
     list-style: none; /* Override prose */
     padding-left: 1rem; /* Reset padding */
}
 .job-content ul[style*="padding:20px"] li {
    @apply mb-2 pl-4 relative; /* Add padding for custom bullet */
 }

/* Custom bullet points for the specific lists */
.job-content ul[style*="padding:20px"] li::before {
    content: '■'; /* Use a square or another character */
    color: theme('colors.brand-orange'); /* Use Tailwind theme color */
    position: absolute;
    left: 0;
    top: 0px; /* Adjust vertical alignment */
    font-size: 0.8em; /* Adjust size */
}

/* Styles for the table within the job ad */
.job-content table {
    @apply w-full border-collapse border border-brand-gray-medium mb-6;
}
.job-content th, .job-content td {
    @apply border border-brand-gray-light p-2 text-center text-sm text-gray-700;
}
.job-content th {
    @apply bg-brand-gray-light font-semibold;
}

</style>
