<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl text-purple-600 mb-4">Memory Game</h1>
    <p class="text-xl text-purple-800 mb-4">Turns: {{ turns }}</p>
    <div :class="`grid grid-cols-2 sm:grid-cols-${gridCols} gap-2 sm:gap-3 max-w-xs sm:max-w-md`">
      <div v-for="(card, index) in cards" :key="index"
           @click="flipCard(index)"
           class="h-24 w-24 sm:h-20 sm:w-20 flex items-center justify-center bg-purple-200 rounded-lg cursor-pointer"
           :class="{ 'bg-purple-400': card.flipped || card.matched }">
        <span v-if="card.flipped || card.matched" class="text-2xl sm:text-xl text-purple-800">
          {{ card.value }}
        </span>
      </div>
    </div>
    <router-link to="/" class="mt-4 text-purple-600 hover:underline">Back to Home</router-link>

    <!-- Win Modal -->
    <div v-if="showWinModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-pastelPurple rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 class="text-3xl text-purple-600 mb-4 text-center">Well done!</h2>
        <p class="text-xl text-purple-800 mb-4 text-center">You completed the game in {{ turns }} turns!</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <div v-for="(card, index) in cards" :key="index"
               class="h-16 w-16 flex items-center justify-center bg-purple-400 rounded-lg">
            <span class="text-lg text-purple-800">{{ card.value }}</span>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <button @click="playAgain" class="btn">Play Again</button>
          <router-link to="/" class="btn">Back to Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      isLocked: false,
      pairCount: 8,
      selectedLetters: [],
      turns: 0,
      showWinModal: false
    };
  },
  computed: {
    gridCols() {
      return this.pairCount <= 4 ? 2 : this.pairCount <= 6 ? 3 : 4;
    }
  },
  methods: {
    loadSettings() {
      const savedSettings = JSON.parse(localStorage.getItem('memorySettings'));
      if (savedSettings) {
        this.pairCount = savedSettings.pairCount || 8;
        this.selectedLetters = savedSettings.selectedLetters || 'ABCDEFGH'.split('');
      } else {
        this.pairCount = 8;
        this.selectedLetters = 'ABCDEFGH'.split('');
      }
    },
    shuffleCards() {
      const letters = this.selectedLetters.slice(0, this.pairCount);
      this.cards = [...letters, ...letters]
        .map(letter => ({ value: letter, flipped: false, matched: false }))
        .sort(() => Math.random() - 0.5);
    },
    flipCard(index) {
      if (this.isLocked || this.cards[index].flipped || this.cards[index].matched || this.showWinModal) return;
      this.cards[index].flipped = true;
      this.flippedCards.push(index);
      if (this.flippedCards.length === 2) {
        this.isLocked = true;
        this.turns++;
        const [first, second] = this.flippedCards;
        if (this.cards[first].value === this.cards[second].value) {
          this.cards[first].matched = true;
          this.cards[second].matched = true;
          this.matchedPairs++;
          this.flippedCards = [];
          this.isLocked = false;
          if (this.matchedPairs === this.pairCount) {
            this.showWinModal = true;
          }
        } else {
          setTimeout(() => {
            this.cards[first].flipped = false;
            this.cards[second].flipped = false;
            this.flippedCards = [];
            this.isLocked = false;
          }, 1000);
        }
      }
    },
    playAgain() {
      this.showWinModal = false;
      this.matchedPairs = 0;
      this.turns = 0;
      this.flippedCards = [];
      this.shuffleCards();
    }
  },
  mounted() {
    this.loadSettings();
    this.shuffleCards();
  }
};
</script>

<style scoped>
.btn {
  @apply bg-purple-200 text-purple-800 rounded-lg p-4 text-xl shadow-md hover:bg-purple-300 transition duration-200;
}
</style>