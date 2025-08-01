import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import AlphabetGame from './components/AlphabetGame.vue';
import MemoryGame from'./components/MemoryGame.vue';
import Settings from './components/Settings.vue';
import './assets/styles.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/alphabet', component: AlphabetGame },
    { path: '/memory', component: MemoryGame },
    { path: '/settings', component: Settings }
  ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}