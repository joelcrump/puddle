<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-6xl text-purple-600 mb-8">{{ letters[currentIndex] }}</h1>
    <button @click="nextLetter" class="btn">Next Letter</button>
    <router-link to="/" class="mt-4 text-purple-600 hover:underline">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      currentIndex: 0
    };
  },
  methods: {
    nextLetter() {
      this.currentIndex = (this.currentIndex + 1) % this.letters.length;
      this.speakLetter();
    },
    speakLetter() {
      const utterance = new SpeechSynthesisUtterance(this.letters[this.currentIndex]);
      utterance.rate = 0.8; // Slow for kids
      window.speechSynthesis.speak(utterance);
    }
  },
  mounted() {
    this.speakLetter();
  }
};
</script>

<style scoped>
.btn {
  @apply bg-purple-200 text-purple-800 rounded-lg p-4 text-xl shadow-md hover:bg-purple-300 transition duration-200;
}
</style>