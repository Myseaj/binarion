<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-6">Trends & Insights aus dem Bauwesen</h1>
    <p class="text-lg text-gray-700 mb-10">Bleiben Sie informiert mit unseren exklusiven Beiträgen zu aktuellen Themen, Herausforderungen und Innovationen der Baubranche.</p>

    <!-- Blog Post Listings -->
    <div class="space-y-8">
      <!-- Blog Post Item -->
      <article class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row gap-6">
        <!-- Optional: Add Image Placeholder -->
        <!-- <div class="md:w-1/3 bg-brand-gray-light rounded h-40 md:h-auto"></div> -->
        <div class="flex-1">
          <p class="text-brand-gray-medium text-sm mb-2">
            <span class="font-semibold text-brand-orange">Digitalisierung</span> | <span class="text-gray-500">[Datum]</span>
          </p>
          <h2 class="text-2xl font-semibold text-brand-dark-blue hover:text-brand-orange transition duration-200 mb-3">
            <NuxtLink to="/blog/digitalisierung-im-bauwesen">Digitalisierung im Bauwesen: Mehr als nur BIM</NuxtLink>
          </h2>
          <p class="text-gray-700 mb-4 line-clamp-3">Die Digitalisierung verändert die Baubranche rasant. Erfahren Sie, welche Technologien neben Building Information Modeling eine wichtige Rolle spielen und wie sie Prozesse optimieren können...</p>
          <NuxtLink to="/blog/digitalisierung-im-bauwesen" class="text-brand-orange hover:underline font-semibold inline-flex items-center">
            Weiterlesen <span class="ml-1">→</span>
          </NuxtLink>
        </div>
      </article>

      <!-- Blog Post Item 2 -->
      <article class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row gap-6">
        <div class="flex-1">
          <p class="text-brand-gray-medium text-sm mb-2">
            <span class="font-semibold text-brand-orange">Karriere, Gehalt</span> | <span class="text-gray-500">[Datum]</span>
          </p>
          <h2 class="text-2xl font-semibold text-brand-dark-blue hover:text-brand-orange transition duration-200 mb-3">
            <NuxtLink to="/blog/gehaltsentwicklungen-bauwesen-2024">Gehaltsentwicklungen für Ingenieure & Bauleiter 2024</NuxtLink>
          </h2>
          <p class="text-gray-700 mb-4 line-clamp-3">Was verdienen Fachkräfte im Bauwesen aktuell? Ein Überblick über Gehaltstrends, regionale Unterschiede und Einflussfaktoren auf das Einkommen von Ingenieuren, Bauleitern und Co...</p>
          <NuxtLink to="/blog/gehaltsentwicklungen-bauwesen-2024" class="text-brand-orange hover:underline font-semibold inline-flex items-center">
            Weiterlesen <span class="ml-1">→</span>
          </NuxtLink>
        </div>
      </article>

       <!-- Blog Post Item 3 -->
       <article class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col md:flex-row gap-6">
         <div class="flex-1">
           <p class="text-brand-gray-medium text-sm mb-2">
             <span class="font-semibold text-brand-orange">Recruiting, Unternehmen</span> | <span class="text-gray-500">[Datum]</span>
           </p>
           <h2 class="text-2xl font-semibold text-brand-dark-blue hover:text-brand-orange transition duration-200 mb-3">
             <NuxtLink to="/blog/strategien-fachkraeftemangel">Fachkräftemangel: Strategien für Unternehmen im Bauwesen</NuxtLink>
           </h2>
           <p class="text-gray-700 mb-4 line-clamp-3">Der Wettbewerb um Talente im Bauwesen ist intensiv. Wie können Unternehmen erfolgreich Fachkräfte finden, binden und eine attraktive Arbeitgebermarke aufbauen? Wir zeigen Lösungsansätze...</p>
           <NuxtLink to="/blog/strategien-fachkraeftemangel" class="text-brand-orange hover:underline font-semibold inline-flex items-center">
             Weiterlesen <span class="ml-1">→</span>
           </NuxtLink>
         </div>
       </article>
      <!-- Add more blog post previews here -->
    </div>

    <!-- Pagination -->
    <div class="text-center mt-12 flex justify-center items-center space-x-2">
        <button class="bg-white border border-brand-gray-medium text-brand-gray-medium px-4 py-2 rounded hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            &larr; Vorherige
        </button>
        <span class="text-gray-500 text-sm">Seite 1 von X</span>
        <button class="bg-brand-dark-blue hover:bg-opacity-80 text-white px-4 py-2 rounded transition duration-200">
            Nächste &rarr;
        </button>
    </div>
  </div>
</template>

<script setup>
// Logic for fetching blog posts would go here
useHead({
  title: 'Blog & Branchen-News - Bricks & Minds',
  meta: [
    { name: 'description', content: 'Aktuelle Trends, Insights und News aus dem Bauwesen. Der Blog von Bricks & Minds für Fachkräfte und Unternehmen.' }
  ]
})
</script>
