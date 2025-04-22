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
      <NuxtLink to="/jobs" class="block mt-2 text-brand-dark-blue hover:underline font-semibold transition duration-200 ease-in-out">Zurück zur Jobübersicht</NuxtLink>
    </div>

    <!-- Job Details -->
    <div v-else-if="job" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <NuxtLink to="/jobs" class="text-sm text-brand-dark-blue hover:underline p-4 inline-block transition duration-200 ease-in-out">&larr; Zurück zur Übersicht</NuxtLink>

      <!-- Hero Section -->
      <div class="relative hero-section">
        <!-- Background Image -->
        <img :src="heroImageUrl" @error="heroImageUrl = defaultHeroImageUrl" alt="Job Location Background" class="absolute inset-0 w-full h-full object-cover z-0">
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/70 z-10"></div>
        <!-- Content -->
        <div class="relative z-20 text-white text-center px-4 py-10 md:py-16 lg:py-20">

          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10">Wir bauen auf Ihre Zukunft</h1>

          <!-- Key Info -->
          <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12">
            <div class="flex flex-col items-center text-center w-1/3 md:w-auto group cursor-default">
              <!-- Placeholder for mdi-map-marker -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-8 md:h-8 mb-1 transition-transform duration-200 ease-in-out group-hover:scale-110">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span class="text-xs md:text-base font-semibold">{{ job.location || 'N/A' }}</span>
            </div>
            <div class="flex flex-col items-center text-center w-1/3 md:w-auto group cursor-default">
               <!-- Placeholder for mdi-briefcase -->
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-8 md:h-8 mb-1 transition-transform duration-200 ease-in-out group-hover:scale-110">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25h-13.5a2.25 2.25 0 0 1-2.25-2.25V6.375a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v4.07Z" />
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
               </svg>
              <span class="text-xs md:text-base font-semibold">{{ job.position_type || 'Festanstellung' }}</span>
            </div>
            <div class="flex flex-col items-center text-center w-1/3 md:w-auto group cursor-default">
               <!-- Placeholder for mdi-cash -->
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-8 md:h-8 mb-1 transition-transform duration-200 ease-in-out group-hover:scale-110">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
               </svg>
              <span class="text-xs md:text-base font-semibold">{{ job.salary_range || 'N/A' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Content Area -->
      <div class="p-6 md:p-10 lg:p-12">

        <!-- Job Title -->
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark-blue mb-4">{{ job.title || 'Jobtitel nicht verfügbar' }}</h2>
        <hr class="border-brand-gray-light my-4 md:my-6">

        <!-- Introduction Section -->
        <div v-if="job.jobad_introduction" class="prose prose-lg max-w-none mb-8 job-content" v-html="job.jobad_introduction"></div>

        <!-- Tasks Section -->
        <div v-if="job.jobad_tasks" class="mb-6 md:mb-8">
          <div class="bg-brand-dark-blue text-white p-3 rounded-t-md flex items-center">
             <!-- Placeholder for mdi-clipboard-list -->
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 flex-shrink-0">
               <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75c0-.231-.035-.454-.1-.664M6.75 7.5H18a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25v-9a2.25 2.25 0 0 1-2.25-2.25Z" />
             </svg>
            <h3 class="text-xl font-semibold">Ihre Aufgaben</h3>
          </div>
          <div class="border border-t-0 border-brand-gray-medium rounded-b-md p-4 prose prose-lg max-w-none job-content" v-html="formattedTasks"></div>
        </div>

        <!-- Candidate Profile Section -->
        <div v-if="job.jobad_candidate_profile" class="mb-6 md:mb-8">
          <div class="bg-brand-dark-blue text-white p-3 rounded-t-md flex items-center">
             <!-- Placeholder for mdi-account-check -->
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 flex-shrink-0">
               <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 10.91-4.42 4.419-2.11-2.11" />
             </svg>
            <h3 class="text-xl font-semibold">Ihr Profil</h3>
          </div>
          <div class="border border-t-0 border-brand-gray-medium rounded-b-md p-4 prose prose-lg max-w-none job-content" v-html="formattedProfile"></div>
        </div>

        <!-- Benefits Section -->
         <div class="mb-6 md:mb-8" v-if="job.jobad_benefit_array && job.jobad_benefit_array.length > 0">
           <div class="bg-brand-dark-blue text-white p-3 rounded-t-md flex items-center">
              <!-- Placeholder for mdi-star-circle -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 flex-shrink-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.418a.562.562 0 0 1 .321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988h5.418a.563.563 0 0 0 .475-.31L11.48 3.5Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
              </svg>
             <h3 class="text-xl font-semibold">Ihre Benefits</h3>
           </div>
           <div class="border border-t-0 border-brand-gray-medium rounded-b-md p-4">
             <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
               <div v-for="(benefit, index) in job.jobad_benefit_array" :key="index" class="text-center p-2 rounded hover:bg-brand-gray-light transition duration-200 ease-in-out group cursor-default">
                <img v-if="iconMapping[benefit]" :src="iconMapping[benefit]" :alt="benefit" class="h-10 w-10 mx-auto mb-2 transition-transform duration-200 ease-in-out group-hover:scale-110">
                 <p class="text-sm text-gray-700 font-medium">{{ benefit }}</p>
               </div>
             </div>
           </div>
         </div>

        <!-- Apply Button -->
        <div class="mt-8 mb-8 text-center">
          <NuxtLink :to="applyLink" class="inline-block bg-brand-orange hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded transition duration-300 ease-in-out shadow hover:shadow-lg transform hover:-translate-y-0.5 text-lg">
            Jetzt bewerben
          </NuxtLink>
        </div>

        <!-- Recruiter/Contact Information -->
        <div v-if="job.responseUser" class="bg-brand-dark-blue text-white p-6 md:p-8 rounded-lg shadow-md mt-8 group hover:shadow-xl transition duration-300 ease-in-out">
          <h2 class="text-xl md:text-2xl font-semibold mb-6 text-center">Ihr Ansprechpartner</h2>
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <!-- Avatar -->
            <div class="flex-shrink-0 text-center md:text-left">
              <img v-if="job.responseUser.imageLink" :src="job.responseUser.imageLink" :alt="job.responseUser.full_name" class="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-brand-orange mx-auto md:mx-0 shadow-lg group-hover:scale-105 transition-transform duration-300 ease-in-out" loading="lazy">
              <div class="w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-4xl md:text-5xl flex-shrink-0 mx-auto md:mx-0 shadow-lg group-hover:scale-105 transition-transform duration-300 ease-in-out" v-else>
                {{ job.responseUser.firstName?.charAt(0) }}{{ job.responseUser.lastName?.charAt(0) }}
              </div>
            </div>
            <!-- Details -->
            <div class="text-center md:text-left flex-grow">
              <p class="font-bold text-xl md:text-2xl">{{ job.responseUser.full_name }}</p>
              <p class="text-brand-gray-light mb-3">{{ job.responseUser.occupation || 'Recruiting Consultant' }}</p>
              <div class="space-y-2">
                <p v-if="job.responseUser.phone" class="flex items-center justify-center md:justify-start">
                   <!-- Placeholder for mdi-phone -->
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-brand-orange flex-shrink-0">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.852 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                   </svg>
                  <a :href="`tel:${job.responseUser.phone}`" class="hover:text-brand-orange transition duration-200 ease-in-out">{{ job.responseUser.phone }}</a>
                </p>
                <p v-if="job.responseUser.email" class="flex items-center justify-center md:justify-start">
                   <!-- Placeholder for mdi-email -->
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-brand-orange flex-shrink-0">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0 2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                   </svg>
                  <a :href="`mailto:${job.responseUser.email}`" class="hover:text-brand-orange transition duration-200 ease-in-out">{{ job.responseUser.email }}</a>
                </p>
              </div>
              <div class="mt-4 space-x-3">
                 <a v-if="job.responseUser.calendlyLink" :href="job.responseUser.calendlyLink" target="_blank" rel="noopener noreferrer" class="inline-block bg-white text-brand-dark-blue text-sm font-semibold py-2 px-4 rounded hover:bg-brand-gray-light transition duration-200 ease-in-out shadow hover:shadow-md transform hover:-translate-y-px">
                   <!-- Placeholder for mdi-calendar -->
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block mr-1 align-text-bottom">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                   </svg>
                   Termin vereinbaren
                 </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Top / Share -->
        <div class="mt-8 pt-6 border-t border-brand-gray-light text-center">
          <NuxtLink to="/jobs" class="text-sm text-brand-dark-blue hover:underline mb-4 inline-block transition duration-200 ease-in-out">&larr; Zurück zur Übersicht</NuxtLink>
        </div>
      </div>

    </div>
    <!-- No Job Found State -->
    <div v-else-if="!loading && !error" class="text-center py-10">
      <p class="text-xl text-gray-600">Stellenanzeige nicht gefunden.</p>
      <NuxtLink to="/jobs" class="mt-4 inline-block text-brand-orange hover:underline font-semibold transition duration-200 ease-in-out">Zurück zur Jobübersicht</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
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

const heroImageUrl = ref('/img/Cities/job_ad_header.jpg');
const defaultHeroImageUrl = '/img/Cities/job_ad_header.jpg';

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
    return content || ''; // Return original content or empty string if invalid
  }
  // Split by "- " but handle potential leading/trailing whitespace and filter empty items
  const items = content.split('- ')
                      .map(item => item.trim())
                      .filter(item => item.length > 0);

  if (items.length <= 1 && !content.startsWith('- ')) {
      // If only one item and doesn't start with '-', treat as regular paragraph
      return `<p>${content}</p>`;
  }

  // Wrap each item in <li> tags
  const listItems = items.map(item => `<li>${item}</li>`).join('');

  // Wrap all items in a <ul> tag
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
  job.value = null;

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
      title: `${job.value.title || 'Stellenangebot'} - Bricks & Minds`,
      meta: [
        { name: 'description', content: job.value.short_description || `Details zur Stelle ${job.value.title || ''} bei Bricks & Minds.` }
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

onMounted(async () => {
  await fetchJobDetails();
  setupHead();
});

watch(job, setupHead, { immediate: true });
</script>

<style>
html {
  scroll-behavior: smooth;
}

.job-content h2 {
  @apply text-2xl font-semibold text-brand-dark-blue mt-6 mb-3;
}
.job-content h3 {
  @apply text-xl font-semibold text-brand-dark-blue mt-5 mb-2;
}
.job-content ul.custom-list, .job-content ol {
  @apply list-none pl-0 mb-4 text-gray-700;
}
.job-content ul.custom-list li {
  @apply mb-2 pl-6 relative;
}
.job-content ul.custom-list li::before {
    content: '•';
    @apply absolute left-0 top-0 text-brand-orange text-xl font-bold;
    line-height: inherit;
}
.job-content p {
  @apply mb-4 text-gray-700 leading-relaxed;
}
.job-content a {
  @apply text-brand-orange hover:underline transition duration-200 ease-in-out;
}
.job-content table {
  @apply w-full border-collapse border border-brand-gray-medium mb-6;
}
.job-content th, .job-content td {
  @apply border border-brand-gray-light p-2 text-center text-sm text-gray-700;
}
.job-content th {
  @apply bg-brand-gray-light font-semibold;
}
.hero-section {
  min-height: 300px;
}
svg.inline-block {
  vertical-align: middle;
}
</style>
