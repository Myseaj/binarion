<template>
  <header class="bg-white text-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200">
    <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold text-brand-dark-blue hover:text-brand-orange transition-colors duration-300">Bricks & Minds</NuxtLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex flex-grow items-center justify-center">
        <div class="flex space-x-6">
          <NuxtLink
            to="/"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Startseite</NuxtLink>
          <NuxtLink
            to="/unternehmen"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Für Unternehmen</NuxtLink>
          <NuxtLink
            to="/kandidaten"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Für Kandidaten</NuxtLink>
          <NuxtLink
            to="/jobs"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Jobs</NuxtLink>
          <NuxtLink
            to="/ueber-uns"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Über uns</NuxtLink>
          <NuxtLink
            to="/karriere"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Karriere</NuxtLink>
          <NuxtLink
            to="/blog"
            class="pb-1 border-b-2 border-transparent hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            exact-active-class="text-brand-orange border-brand-orange font-medium"
          >Blog</NuxtLink>
        </div>
      </div>

      <!-- Contact Button - Desktop -->
      <div class="hidden md:block">
        <NuxtLink
          to="/kontakt"
          class="bg-brand-orange text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300 text-sm"
        >Kontakt</NuxtLink>
      </div>


      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-gray-700 focus:outline-none p-2 rounded hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-300">
          <!-- Hamburger Icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            <!-- Close Icon -->
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div v-if="isMenuOpen" class="md:hidden bg-white absolute w-full shadow-lg border-t border-gray-200">
        <NuxtLink @click="closeMenu" to="/" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Startseite</NuxtLink>
        <NuxtLink @click="closeMenu" to="/unternehmen" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Für Unternehmen</NuxtLink>
        <NuxtLink @click="closeMenu" to="/kandidaten" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Für Kandidaten</NuxtLink>
        <NuxtLink @click="closeMenu" to="/jobs" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Jobs</NuxtLink>
        <NuxtLink @click="closeMenu" to="/ueber-uns" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Über uns</NuxtLink>
        <NuxtLink @click="closeMenu" to="/karriere" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Karriere</NuxtLink>
        <NuxtLink @click="closeMenu" to="/blog" class="block px-4 py-3 hover:bg-brand-orange hover:text-white transition-colors duration-300" exact-active-class="bg-brand-orange text-white font-semibold">Blog</NuxtLink>
        <NuxtLink @click="closeMenu" to="/kontakt" class="block px-4 py-3 bg-gray-50 hover:bg-brand-orange hover:text-white transition-colors duration-300 font-medium" exact-active-class="bg-brand-orange text-white font-semibold">Kontakt</NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>
