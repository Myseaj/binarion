<template>
  <div>
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-blue mb-6">Kontakt</h1>
    <p class="text-lg text-gray-700 mb-10">Wir freuen uns auf Ihre Nachricht oder Ihren Anruf. Lassen Sie uns gemeinsam die passende Lösung für Sie finden.</p>

    <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
      <!-- Contact Info -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">So erreichen Sie uns:</h2>
        <div class="space-y-5 text-gray-700">
          <p>
            <strong class="text-brand-orange block mb-1">E-Mail:</strong>
            <a href="mailto:kontakt@bricks-minds.de" class="hover:underline text-brand-dark-blue">kontakt@bricks-minds.de</a>
          </p>
          <p>
            <strong class="text-brand-orange block mb-1">Telefon:</strong>
            <a href="tel:[Ihre Telefonnummer]" class="hover:underline text-brand-dark-blue">[Ihre Telefonnummer]</a>
          </p>
          <!-- Add Address if needed -->
          <!-- <p>
            <strong class="text-brand-orange block mb-1">Adresse:</strong>
            [Ihre Adresse]<br>
            [PLZ Ort]
          </p> -->
        </div>
        <div class="mt-8 border-t pt-6 border-brand-gray-light">
             <h3 class="text-xl font-semibold text-brand-dark-blue mb-3">Lassen Sie uns sprechen!</h3>
             <p class="text-gray-700 mb-4">Vereinbaren Sie jetzt ein kostenloses und unverbindliches Beratungsgespräch.</p>
             <a href="[Link zur Terminvereinbarung]" target="_blank" rel="noopener noreferrer" class="inline-block bg-brand-orange hover:bg-opacity-80 text-white font-bold py-2 px-5 rounded transition duration-300 shadow">
                Termin vereinbaren
             </a>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-brand-dark-blue mb-6 border-b pb-2 border-brand-gray-light">Schreiben Sie uns eine Nachricht:</h2>
        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" id="name" v-model="form.name" required class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
            <input type="email" id="email" v-model="form.email" required class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out">
          </div>
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Betreff *</label>
            <input type="text" id="subject" v-model="form.subject" required class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Nachricht *</label>
            <textarea id="message" v-model="form.message" rows="5" required class="border border-gray-300 p-2 rounded w-full focus:ring-brand-orange focus:border-brand-orange transition duration-150 ease-in-out"></textarea>
          </div>
           <!-- File Upload -->
           <div>
             <label for="attachment" class="block text-sm font-medium text-gray-700 mb-1">Anhang (optional, z.B. Lebenslauf)</label>
             <input type="file" id="attachment" @change="handleFileUpload" class="border border-gray-300 p-2 rounded w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20 cursor-pointer">
           </div>
           <!-- Privacy Policy Agreement -->
           <div class="pt-2">
                <label class="inline-flex items-center text-sm text-gray-600">
                    <input type="checkbox" required class="form-checkbox h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded">
                    <span class="ml-2">Ich habe die <NuxtLink to="/datenschutz" class="text-brand-dark-blue hover:underline">Datenschutzerklärung</NuxtLink> gelesen und akzeptiere sie. *</span>
                </label>
           </div>
          <div class="pt-2">
            <button type="submit" class="w-full bg-brand-dark-blue hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded transition duration-300 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-blue">
              Nachricht senden
            </button>
          </div>
          <p v-if="formStatus" class="mt-4 text-center text-sm" :class="formSuccess ? 'text-brand-green' : 'text-red-600'">{{ formStatus }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

useHead({
  title: 'Kontakt - Bricks & Minds',
  meta: [
    { name: 'description', content: 'Kontaktieren Sie Bricks & Minds per E-Mail, Telefon oder Kontaktformular. Wir freuen uns auf Ihre Anfrage.' }
  ]
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  attachment: null,
});

const formStatus = ref('');
const formSuccess = ref(false);

function handleFileUpload(event) {
    form.attachment = event.target.files[0];
}

async function submitForm() {
  formStatus.value = 'Sende Nachricht...';
  formSuccess.value = false;

  // Placeholder for actual form submission logic
  // Use FormData if you have file uploads
  // const formData = new FormData();
  // Object.keys(form).forEach(key => {
  //   formData.append(key, form[key]);
  // });

  console.log('Form Data:', form); // Log data for now
  // Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

  // Simulate success/error
  const success = Math.random() > 0.2; // Simulate 80% success rate
  if (success) {
    formStatus.value = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
    formSuccess.value = true;
    // Reset form
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    form.attachment = null;
    // Reset file input visually if needed
    const fileInput = document.getElementById('attachment');
    if (fileInput) fileInput.value = '';

  } else {
    formStatus.value = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.';
    formSuccess.value = false;
  }
}
</script>
