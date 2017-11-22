import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes';

import App from './App.vue'

import { store } from './store/store';

Vue.use(VueRouter);

// We will set this to history mode, so the web server should ALWAYS return
// the index.html file, even if we 404.
const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
