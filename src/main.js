import Vue from 'vue';

/* Per http://element.eleme.io/#/en-US/component/quickstart */
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css'

import App from './App.vue';

import { store } from './store/store';

// Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
