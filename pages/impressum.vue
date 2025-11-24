<template>
  <div class="min-h-screen bg-[#07121a] text-gray-300 pt-32 pb-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-white mb-8">Impressum</h1>
      
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Binarion<br>
            Musterstraße 123<br>
            12345 Musterstadt
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Kontakt</h2>
          <p>
            Telefon: +49 (0) 123 456789<br>
            E-Mail: info@binarion.de
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>
            DE 123 456 789
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Redaktionell verantwortlich</h2>
          <p>
            Max Mustermann<br>
            Musterstraße 123<br>
            12345 Musterstadt
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-[#3dd2cc] hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br>
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Impressum - Binarion',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
