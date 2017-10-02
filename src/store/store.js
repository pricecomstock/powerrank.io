import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    unrankedList: [
      'strawberry',
      'chocolate',
      'vanilla'
    ],
    rankedList: []
  },
  getters: {
    unrankedListString: state => {
      return state.unrankedList.join('\n');
    },
    rankedListString: state => {
      return state.rankedList.join('\n');
    }
  },
  mutations: {
    setUnrankedList: (state, newList) => {
      state.unrankedList = newList;
    },
    setRankedList: (state, newList) => {
      state.rankedList = newList;
    }
  }
});
