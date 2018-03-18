import Vue from 'vue';
import Vuex from 'vuex';

import create from './modules/create';
import powerrank from './modules/powerrank';
import viewRanking from './modules/viewRanking';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    create,
    powerrank
  }
});