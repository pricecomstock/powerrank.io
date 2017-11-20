import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../axios-airtable'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    unrankedList: [],
    rankedList: [],
    creatingList: ['test'],
    inputTitle: '',
    inputParagraph: '',
    createdId: ''
  },
  getters: {
    unrankedList: state => {
      return state.unrankedList;
    },
    rankedList: state => {
      return state.rankedList;
    },
    creatingList: state => {
      return state.creatingList;
    },
    inputParagraph: state => {
      return state.inputParagraph;
    },
    inputTitle: state => {
      return state.inputTitle;
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
    createdId: (state) => {
      return state.createdId;
    }
  },
  mutations: {
    setUnrankedList: (state, newList) => {
      state.unrankedList = newList;
    },
    setRankedList: (state, newList) => {
      state.rankedList = newList;
    },
    setCreatingList: (state, newList) => {
      state.creatingList = newList
    },
    setInputTitle: (state, title) => {
      state.inputTitle = title
    },
    setInputParagraph: (state, newParagraph) => {
      state.inputParagraph = newParagraph
    },
    setCreatedId: (state, id) => {
      state.createdId = id
    }
  },
  actions: {
    setUnrankedList: (context, newList) => {
      context.commit('setUnrankedList', newList);
    },
    setRankedList: (context, newList) => {
      context.commit('setRankedList', newList);
    },
    loadPowerRankFromAirtable: (context, id) => {
      let newList = []
      
      axios.get(`/RankLists/${id}`)
        .then(res => {
          console.log('Airtable Response', res)
          // Split on newlines because it's stored that way
          // Filter any blank items we are left with
          newList = res.data.fields.RankItems.split('\n').filter(each => {return each.trim() !== ""})
          console.log("new list", newList)

          context.commit('setUnrankedList', newList);
          context.commit('setRankedList', []);
        })
        .catch(error => console.log(error))
        
    },
    setCreatingList: (context, newList) => {
      context.commit('setCreatingList', newList);
    },
    resetCreatingList: (context) => {
      context.commit('setCreatingList', []);
    },
    setInputTitle: (context, title) => {
      context.commit('setInputTitle', title)
    },
    setInputParagraph: (context, newParagraph) => {
      context.commit('setInputParagraph', newParagraph)
    },
    sendInputParagraphToAirtable: (context, router) => {
      const payload = {
        fields: {
          RankItems: context.getters.inputParagraph,
          Name: context.getters.inputTitle
        }
      }
      console.log('payload', payload)
      axios.post('/RankLists', payload)
        .then(res => {
          console.log(res)
          context.commit('setCreatedId', res.data.id)
          router.push('/create/success')
        })
        .catch(error => console.log(error))
    }
  }
});
