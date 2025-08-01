<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl text-purple-600 mb-8">Puddle</h1>
    <router-link to="/alphabet" class="btn mb-4 w-full max-w-xs">Learn Alphabet</router-link>
    <router-link to="/memory" class="btn mb-4 w-full max-w-xs">Memory Game</router-link>
    <router-link to="/settings" class="btn w-full max-w-xs">Settings</router-link>
  </div>
</template>

<style scoped>
.btn {
  @apply bg-purple-200 text-purple-800 rounded-lg p-4 text-xl shadow-md hover:bg-purple-300 transition duration-200;
}
</style>