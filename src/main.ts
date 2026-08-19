import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Ionic Dark Mode (optional) */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

// Global error overlay for debugging white screen issues
window.addEventListener('error', (ev) => {
  try {
    const msg = (ev.error && ev.error.stack) || ev.message || String(ev);
    document.body.innerHTML = '';
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.background = '#111';
    pre.style.color = '#fff';
    pre.style.padding = '16px';
    pre.style.fontSize = '13px';
    pre.textContent = 'Unhandled error:\n' + msg;
    document.body.appendChild(pre);
  } catch (e) {
    // ignore
  }
  console.error('Unhandled error', ev);
});
window.addEventListener('unhandledrejection', (ev) => {
  try {
    const reason = ev.reason && (ev.reason.stack || ev.reason.message) || String(ev.reason);
    document.body.innerHTML = '';
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.background = '#111';
    pre.style.color = '#fff';
    pre.style.padding = '16px';
    pre.style.fontSize = '13px';
    pre.textContent = 'Unhandled rejection:\n' + reason;
    document.body.appendChild(pre);
  } catch (e) {}
  console.error('Unhandled rejection', ev);
});

router.isReady().then(() => {
  app.mount('#app');
});
