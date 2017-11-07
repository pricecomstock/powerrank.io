import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    unrankedList: [],
    rankedList: [],
    presetsByName: {
      'Dorm Team': ['Tritz', 'Price', 'Elliott', 'Mark', 'PDav'],
      'Dream Team': ['Tritz', 'Price', 'Elliott', 'Mark', 'PDav', 'Ty', 'Justin', 'Joe', 'Jason', 'Andrew', 'Zusko', 'Wilkie', 'Jordan'],
      'Employers': ['NTT Security', 'IBM', 'Principal', 'Union Pacific', 'Hayneedle', 'Kiewit', 'First Data'],
      'Starburst': ['Orange', 'Cherry', 'Strawberry', 'Lemon'],
      'Ice Cream': ['Chocolate', 'Vanilla', 'Strawberry']
    },
    presetsById: {
      'Starburst': 'a',
      'Dream Team': 'c',
      'Dorm Team': 'd',
      'Ice Cream': 'b'
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
    presetsByName: state => {
      return state.presetsByName;
    }
  },
  mutations: {
    setUnrankedList: (state, newList) => {
      state.unrankedList = newList;
    },
    setRankedList: (state, newList) => {
      state.rankedList = newList;
    }
  },
  actions: {
    setUnrankedList: (context, newList) => {
      context.commit('setUnrankedList', newList);
    },
    setRankedList: (context, newList) => {
      context.commit('setRankedList', newList);
    },
    loadFromAirtable: (context, id) => {
      let newList = []
      // .post('https://api.airtable.com/v0/appWE62HgQg8yZggo/RankLists?api_key=keyntfXx888yZ4url')
      context.commit('setRankedList', newList);
    },
    loadFromPresets: (context, name) => {
      // .post('https://api.airtable.com/v0/appWE62HgQg8yZggo/RankLists?api_key=keyntfXx888yZ4url')
      console.log('name: ' + name)
      context.commit('setUnrankedList', context.state.presetsByName[name]);
      context.commit('setRankedList', []);
    }
  }
});
