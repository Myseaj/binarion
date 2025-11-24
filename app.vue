<template>
  <div class="cursor-none">
    <!-- Custom Cursor -->
    <div class="custom-cursor" ref="cursor"></div>
    <div class="custom-cursor-follower" ref="follower"></div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursor = ref(null)
const follower = ref(null)

const moveCursor = (e) => {
  if (cursor.value && follower.value) {
    cursor.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    follower.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  }
}

const handleHover = () => {
  if (cursor.value && follower.value) {
    cursor.value.classList.add('hovered')
    follower.value.classList.add('hovered')
  }
}

const handleLeave = () => {
  if (cursor.value && follower.value) {
    cursor.value.classList.remove('hovered')
    follower.value.classList.remove('hovered')
  }
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor)
  
  // Add hover effect to all clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer')
  clickables.forEach(el => {
    el.addEventListener('mouseenter', handleHover)
    el.addEventListener('mouseleave', handleLeave)
  })

  // Observer for dynamic elements
  const observer = new MutationObserver((mutations) => {
    const newClickables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer')
    newClickables.forEach(el => {
      el.removeEventListener('mouseenter', handleHover)
      el.removeEventListener('mouseleave', handleLeave)
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })
  })
  
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)
})
</script>

<style>
body {
  cursor: none;
}

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background-color: #3dd2cc;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate3d(-100px, -100px, 0);
  transition: width 0.3s, height 0.3s, background-color 0.3s;
  mix-blend-mode: difference;
}

.custom-cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid #3dd2cc;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate3d(-100px, -100px, 0);
  transition: transform 0.1s, width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
  margin-left: -16px; /* Center the follower */
  margin-top: -16px;
  mix-blend-mode: difference;
}

.custom-cursor.hovered {
  width: 12px;
  height: 12px;
  background-color: #29b3ad;
}

.custom-cursor-follower.hovered {
  width: 60px;
  height: 60px;
  background-color: rgba(61, 210, 204, 0.1);
  border-color: transparent;
  margin-left: -26px;
  margin-top: -26px;
}
</style>

