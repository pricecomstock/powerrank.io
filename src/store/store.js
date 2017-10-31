import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    unrankedList: [],
    rankedList: [],
    presets: {
      'Dorm Team': ['Tritz', 'Price', 'Elliott', 'Mark', 'PDav'],
      'Dream Team': ['Tritz', 'Price', 'Elliott', 'Mark', 'PDav', 'Ty', 'Justin', 'Joe', 'Jason', 'Andrew', 'Zusko', 'Wilkie', 'Jordan'],
      'Employers': ['NTT Security', 'IBM', 'Principal', 'Union Pacific', 'Hayneedle', 'Kiewit', 'First Data'],
      'Starburst': ['Orange', 'Cherry', 'Strawberry', 'Lemon'],
      'Ice Cream': ['Chocolate', 'Vanilla', 'Strawberry']
    }
  },
  getters: {
    unrankedList: state => {
      return state.unrankedList;
    },
    rankedList: state => {
      return state.rankedList;
    },
    unrankedListString: state => {
      if (state.unrankedList) {
        return state.unrankedList.join('\n');
      } else {
        return '';
      }
    },
    rankedListString: state => {
      if (state.rankedList) {
        return state.rankedList.join('\n');
      } else {
        return '';
      }
    },
    unrankedListJSON: state => {
      return JSON.stringify(state.unrankedList, null, '  ');
    },
    rankedListJSON: state => {
      return JSON.stringify(state.rankedList, null, '  ');
    },
    presets: state => {
      return state.presets;
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
