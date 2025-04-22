<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-4">Werde Teil von Bricks & Minds</h1>
    <p class="text-xl text-brand-orange mb-8">Gestalte die Zukunft der Personalvermittlung im Bauwesen</p>
    <p class="text-lg text-gray-700 mb-10">Du suchst nicht nur einen Job, sondern eine Aufgabe mit Sinn? Bricks & Minds ist eine innovative, etablierte Boutique-Personalberatung für das Bauwesen. Wir wachsen und suchen engagierte Talente, die gemeinsam mit uns neue Maßstäbe in der Personalvermittlung setzen.</p>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Wir suchen Verstärkung:</h2>
      <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-green">
        <ul class="list-none space-y-2 text-gray-700">
          <li class="flex items-center"><span class="text-brand-green mr-2 text-lg">●</span> Personalberater / Recruiter (m/w/d)</li>
          <li class="flex items-center"><span class="text-brand-green mr-2 text-lg">●</span> Sales Manager (m/w/d)</li>
          <li class="flex items-center"><span class="text-brand-green mr-2 text-lg">●</span> Research Consultant (m/w/d)</li>
          <li class="flex items-center"><span class="text-brand-green mr-2 text-lg">●</span> Werkstudenten & Praktikanten (m/w/d)</li>
        </ul>
        <!-- Link zu offenen Stellen -->
        <NuxtLink to="/jobs?internal=true" class="text-brand-orange hover:underline font-semibold mt-5 inline-flex items-center">
          Zu den offenen internen Stellen <span class="ml-1">→</span>
        </NuxtLink>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Warum Bricks & Minds?</h2>
      <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-5 rounded-lg shadow">
              <h4 class="font-semibold text-lg text-brand-dark-blue mb-1">Innovativ & etabliert</h4>
              <p class="text-gray-600">Start-up-Dynamik mit sicherem Fundament.</p>
          </div>
          <div class="bg-white p-5 rounded-lg shadow">
              <h4 class="font-semibold text-lg text-brand-dark-blue mb-1">Exklusives Netzwerk</h4>
              <p class="text-gray-600">Arbeiten mit den besten Unternehmen und Fachkräften der Branche.</p>
          </div>
          <div class="bg-white p-5 rounded-lg shadow">
              <h4 class="font-semibold text-lg text-brand-dark-blue mb-1">Karrierechancen</h4>
              <p class="text-gray-600">Flache Hierarchien, schnelle Entwicklungsmöglichkeiten.</p>
          </div>
          <div class="bg-white p-5 rounded-lg shadow">
              <h4 class="font-semibold text-lg text-brand-dark-blue mb-1">Moderne Arbeitsweise</h4>
              <p class="text-gray-600">Digital, agil & flexibel.</p>
          </div>
      </div>
    </section>

    <section class="mb-12 bg-brand-green/10 p-6 rounded-lg shadow-sm">
        <h2 class="text-2xl font-semibold text-brand-dark-blue mb-3">Unsere Kultur</h2>
        <p class="text-gray-700">Wir stehen für eine offene und leistungsorientierte Unternehmenskultur, in der Teamwork, Eigeninitiative und Spaß an der Arbeit großgeschrieben werden.</p>
    </section>

    <section class="mb-12 text-center bg-brand-dark-blue/5 p-8 rounded-lg">
        <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-4">Du willst dabei sein?</h2>
        <p class="text-gray-700 mb-6">Bewirb dich jetzt in nur 2 Minuten!</p>
        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <NuxtLink to="/kontakt?bewerbung=intern" class="inline-block bg-brand-orange hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded transition duration-300 shadow">
            Jetzt bewerben
          </NuxtLink>
          <NuxtLink to="/kontakt?gespraech=intern" class="inline-block bg-white hover:bg-gray-100 text-brand-dark-blue font-bold py-3 px-6 rounded transition duration-300 border border-brand-dark-blue shadow-sm">
            Erstgespräch vereinbaren
          </NuxtLink>
        </div>
    </section>

    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-brand-dark-blue mb-4">Unser Bewerbungsprozess:</h2>
      <ol class="list-decimal list-inside space-y-3 text-gray-700 marker:text-brand-orange marker:font-semibold">
        <li>Kurzbewerbung online abschicken</li>
        <li>Digitales Kennenlerngespräch mit unserem Team</li>
        <li>Fachliches Interview & Einblick in unsere Arbeit (ggf. Case Study)</li>
        <li>Vertragsangebot & Willkommen bei Bricks & Minds!</li>
      </ol>
    </section>

  </div>
</template>

<script setup>
useHead({
  title: 'Karriere bei Bricks & Minds',
  meta: [
    { name: 'description', content: 'Werde Teil von Bricks & Minds! Gestalte die Zukunft der Personalvermittlung im Bauwesen mit. Offene Stellen für Recruiter, Sales Manager und mehr.' }
  ]
})
</script>
