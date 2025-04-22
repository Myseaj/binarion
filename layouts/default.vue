<template>
  <div class="flex flex-col min-h-screen bg-brand-gray-light text-gray-800">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// Import components if they are not auto-imported
// import AppHeader from '~/components/AppHeader.vue';
// import AppFooter from '~/components/AppFooter.vue';
</script>

<style>
/* Global styles if needed */
body {
  font-family: sans-serif; /* Example font */
}
</style>
