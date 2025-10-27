<template>
  <footer class="bg-gray-900 text-gray-400 mt-16 pt-10 pb-8 text-sm">
    <div class="container mx-auto px-4">
      <!-- Add columns or more complex structure here if needed -->
      <div class="text-center mb-4">
         <!-- Placeholder for logo if desired -->
         <!-- <img src="/path/to/logo-white.svg" alt="Bricks & Minds Logo" class="h-8 mx-auto mb-4"> -->
         <NuxtLink to="/impressum" class="hover:text-white transition-colors duration-300 mx-2">Impressum</NuxtLink> |
         <NuxtLink to="/datenschutz" class="hover:text-white transition-colors duration-300 mx-2">Datenschutz</NuxtLink>
         <!-- Add more links as needed -->
      </div>
      <p class="text-center border-t border-gray-700 pt-6">&copy; {{ new Date().getFullYear() }} BINARION. Alle Rechte vorbehalten.</p>
    </div>
  </footer>
</template>

<script setup>
// No script needed for this simple component
</script>
