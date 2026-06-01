<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Binarion',
        url: 'https://binarion.de',
        logo: 'https://binarion.de/img/Logo.png',
        sameAs: []
      })
    }
  ]
})

</script>
<style>

</style>

