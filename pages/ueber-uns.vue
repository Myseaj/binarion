<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-6">Über Bricks & Minds</h1>
     <p class="text-lg text-gray-700 mb-10">Die perfekte Verbindung aus Branchenwissen und innovativer Personalvermittlung. Seit unserer Gründung haben wir ein exklusives Netzwerk aufgebaut, das uns ermöglicht, Unternehmen und Fachkräfte auf höchstem Niveau zusammenzubringen.</p>

    <div class="grid md:grid-cols-3 gap-6 mb-12 text-center">
        <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-brand-orange">
            <h2 class="text-xl font-semibold text-brand-dark-blue mb-2">Für Unternehmen</h2>
            <p class="text-gray-600">Wir liefern die besten Experten, damit Ihre Projekte erfolgreich realisiert werden.</p>
        </div>
         <div class="bg-white p-6 rounded-lg shadow-md border-t-4 border-brand-orange">
            <h2 class="text-xl font-semibold text-brand-dark-blue mb-2">Für Kandidaten</h2>
            <p class="text-gray-600">Wir öffnen Karrieretüren und begleiten Sie auf Ihrem beruflichen Weg.</p>
        </div>
         <div class="bg-brand-dark-blue/5 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <NuxtLink to="/kontakt" class="text-brand-dark-blue hover:text-brand-orange font-semibold text-lg text-center">Lernen Sie uns kennen –<br>wir freuen uns auf Ihre Anfrage!</NuxtLink>
        </div>
    </div>


    <section class="mb-12 bg-brand-green/10 p-6 rounded-lg shadow-sm">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-4">Unsere Vision</h2>
      <p class="text-gray-700">Wir gestalten die Zukunft der Baubranche, indem wir Fachkräfte und Unternehmen gezielt vernetzen. Durch maßgeschneiderte Lösungen und einen modernen, digitalen Recruiting-Ansatz treiben wir Innovationen in der Bau- und Immobilienbranche voran. Unsere Mission ist es, die richtigen Talente mit den passenden Projekten zusammenzubringen – effizient, nachhaltig und mit echtem Branchen-Know-how.</p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Unsere Mission</h2>
      <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
              <span class="text-brand-green text-xl font-bold mt-1">✓</span>
              <p class="text-gray-700"><strong>Qualität statt Quantität:</strong> Wir setzen auf gezielte Vermittlung statt Massenabfertigung.</p>
          </div>
          <div class="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
              <span class="text-brand-green text-xl font-bold mt-1">✓</span>
              <p class="text-gray-700"><strong>Nachhaltige Karrieren:</strong> Wir denken langfristig und begleiten Fachkräfte auf ihrem gesamten Karriereweg.</p>
          </div>
          <div class="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
              <span class="text-brand-green text-xl font-bold mt-1">✓</span>
              <p class="text-gray-700"><strong>Branchen-Know-how trifft Innovation:</strong> Wir kombinieren unser tiefes Wissen der Bau- und Immobilienbranche mit modernen digitalen Lösungen.</p>
          </div>
          <div class="flex items-start space-x-3 p-4 bg-white rounded-lg shadow">
              <span class="text-brand-green text-xl font-bold mt-1">✓</span>
              <p class="text-gray-700"><strong>Persönlichkeit zählt:</strong> Trotz digitaler Prozesse setzen wir auf persönliche Betreuung und enge Zusammenarbeit.</p>
          </div>
      </div>
    </section>

    <section class="mb-12" v-if="false">
      <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-4">Lerne unser Team kennen</h2>
      <p class="text-gray-700 mb-6">Unser Erfolg basiert auf einem Team aus erfahrenen Branchenexperten, Recruiting-Spezialisten und digitalen Innovatoren. Wir sind Profis mit Leidenschaft für die Bau- und Immobilienbranche und bringen Kandidaten und Unternehmen mit Fingerspitzengefühl zusammen.</p>
      <!-- Team Photo Collage -->
      
      <NuxtLink to="/karriere" class="text-brand-orange hover:underline font-semibold inline-flex items-center">
        Werde Teil des Teams! <span class="ml-1">→</span>
      </NuxtLink>
    </section>

    <section class="mb-12">
        <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-4">Einblicke in unsere Arbeit</h2>
        <p class="text-gray-700 mb-6">Erhalten Sie einen Eindruck von Bricks & Minds:</p>
        <!-- First Impression - Updated Collage -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <!-- Image 1 -->
            <div class="bg-white p-2 rounded-lg shadow-md md:col-span-2">
                <img src="/img/TA Fotos/Waldemar bearbeitet/CKS05879_sw.jpg" alt="Teammitglied Bricks & Minds 1" class="rounded object-cover w-full h-full">
            </div>
            <!-- Image 2 -->
            <div class="bg-white p-2 rounded-lg shadow-md">
                <img src="/img/TA Fotos/allgemein bearbeitet/CKS05349_sw.jpg" alt="Teammitglied Bricks & Minds 2" class="rounded object-cover w-full h-full">
            </div>
             <!-- Image 3 -->
             <div class="bg-white p-2 rounded-lg shadow-md">
                <img src="/img/TA Fotos/allgemein bearbeitet/CKS05362_sw.jpg" alt="Teammitglied Bricks & Minds 3" class="rounded object-cover w-full h-full">
            </div>
            <!-- Image 4 -->
            <div class="bg-white p-2 rounded-lg shadow-md">
                 <img src="/img/TA Fotos/allgemein bearbeitet/CKS06031_sw.jpg" alt="Teammitglied Bricks & Minds 4" class="rounded object-cover w-full h-full">
            </div>
            <!-- Image 5 -->
            <div class="bg-white p-2 rounded-lg shadow-md md:col-span-3">
                <img src="/img/TA Fotos/Waldemar bearbeitet/CKS05843_sw.jpg" alt="Teammitglied Bricks & Minds 5" class="rounded object-cover w-full h-full">
            </div>
            <!-- Add more images wrapped in styled divs as needed -->
        </div>
    </section>

    <section class="mb-12">
        <h2 class="text-2xl md:text-3xl font-semibold text-brand-dark-blue mb-4">TA Management 3 Jahre Jubiläum</h2>
        <p class="text-gray-700 mb-4">
        </p>
        <!-- Placeholder for Bits & Birds Example Video -->
        <iframe
          width="100%"
          height="600"
          src="https://www.youtube.com/embed/HsCQ9kq7cUM?si=PR5H1unzbWCx4KQy"
          title="TA Management 3 Jahre Jubiläum"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="video-iframe"
        >
        </iframe>
    </section>

    <section class="text-center bg-brand-dark-blue text-white p-8 md:p-12 rounded-lg shadow-lg">
      <h2 class="text-2xl md:text-3xl font-semibold mb-4">Kontaktieren Sie uns noch heute!</h2>
      <p class="text-brand-gray-light mb-6 max-w-xl mx-auto">Wir freuen uns darauf, Sie kennenzulernen und gemeinsam die besten Lösungen für Ihre Karriere oder Ihr Unternehmen zu finden!</p>
      <NuxtLink to="/kontakt" class="inline-block bg-brand-orange hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded transition duration-300 shadow">
        Kontakt aufnehmen
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Über uns - Bricks & Minds',
  meta: [
    { name: 'description', content: 'Lernen Sie Bricks & Minds kennen – Ihre Personalberatung im Bauwesen mit Branchenwissen, Innovation und persönlichem Ansatz.' }
  ]
})
</script>
