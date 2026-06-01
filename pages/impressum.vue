<template>
  <div class="min-h-screen bg-[#07121a] text-gray-300 pt-32 pb-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-white mb-8">Impressum</h1>
      
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Angaben gemäß § 5 TMG</h2>
          <p class="mb-2 text-sm text-gray-400">Binarion ist eine Marke der TA Management GmbH.</p>
          <p>
            TA Management GmbH<br>
            Geibelstraße 46b<br>
            22303 Hamburg
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Kontakt</h2>
          <p>
            Tel.: (040) 22 86 69 830<br>
            E-Mail: <a href="mailto:info@ta-management.de" class="text-[#3dd2cc] hover:underline">info@ta-management.de</a>
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Vertretung</h2>
          <p>
            Alleinverfügungsberechtigter Geschäftsführer:<br>
            Aaron Ebermann
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Registereintrag</h2>
          <p>
            Registergericht: Amtsgericht Hamburg<br>
            Registernummer: HRB 138319
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>
            DE304265559
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-[#3dd2cc] mb-4">Haftungsausschluss (Disclaimer)</h2>

          <h3 class="text-xl font-semibold text-white mt-6 mb-3">Haftung für Inhalte</h3>
          <p class="leading-relaxed">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 class="text-xl font-semibold text-white mt-6 mb-3">Haftung für Links</h3>
          <p class="leading-relaxed">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h3 class="text-xl font-semibold text-white mt-6 mb-3">Urheberrecht</h3>
          <p class="leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Impressum',
  meta: [
    { name: 'description', content: 'Impressum und Anbieterkennzeichnung von Binarion.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ],
  link: [{ rel: 'canonical', href: 'https://binarion.de/impressum' }]
})
</script>
