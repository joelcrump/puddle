<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl text-purple-600 mb-8">Settings</h1>
    <div class="w-full max-w-md">
      <h2 class="text-2xl text-purple-600 mb-4">Memory Game</h2>
      <label class="block text-purple-800 mb-2">Number of Pairs</label>
      <select v-model="pairCount" @change="saveSettings" class="w-full bg-purple-100 p-2 rounded-lg mb-4">
        <option v-for="count in [4, 6, 8, 10]" :key="count" :value="count">{{ count }} Pairs</option>
      </select>
      <label class="block text-purple-800 mb-2">Letters (Select at least {{ minLetters }})</label>
      <div class="grid grid-cols-5 gap-2 mb-4">
        <button v-for="letter in letters" :key="letter"
                @click="toggleLetter(letter)"
                class="p-2 rounded-lg text-xl"
                :class="selectedLetters.includes(letter) ? 'bg-purple-400 text-white' : 'bg-purple-200 text-purple-800'">
          {{ letter }}
        </button>
      </div>
      <button @click="resetLetters" class="btn mb-4">Reset to Alphabetical</button>
      <router-link to="/" class="btn">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pairCount: 8,
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      selectedLetters: [],
      minLetters: 4 // Minimum letters needed for smallest pair count
    };
  },
  computed: {
    validSettings() {
      return this.selectedLetters.length >= this.pairCount;
    }
  },
  methods: {
    toggleLetter(letter) {
      if (this.selectedLetters.includes(letter)) {
        if (this.selectedLetters.length > this.minLetters) {
          this.selectedLetters = this.selectedLetters.filter(l => l !== letter);
        }
      } else {
        this.selectedLetters.push(letter);
      }
      this.saveSettings();
    },
    resetLetters() {
      this.selectedLetters = this.letters.slice(0, this.pairCount);
      this.saveSettings();
    },
    saveSettings() {
      if (this.selectedLetters.length < this.pairCount) {
        this.selectedLetters = this.letters.slice(0, this.pairCount);
      }
      localStorage.setItem('memorySettings', JSON.stringify({
        pairCount: this.pairCount,
        selectedLetters: this.selectedLetters
      }));
    }
  },
  mounted() {
    const savedSettings = JSON.parse(localStorage.getItem('memorySettings'));
    if (savedSettings) {
      this.pairCount = savedSettings.pairCount || 8;
      this.selectedLetters = savedSettings.selectedLetters || this.letters.slice(0, this.pairCount);
    } else {
      this.pairCount = 8;
      this.selectedLetters = this.letters.slice(0, this.pairCount);
      this.saveSettings();
    }
  }
};
</script>

<style scoped>
.btn {
  @apply bg-purple-200 text-purple-800 rounded-lg p-4 text-xl shadow-md hover:bg-purple-300 transition duration-200 w-full;
}
</style>