import Vue from 'vue';
import Vuex from 'vuex';

import axios from '../axios-powerrank'
// import axios from '../axios-airtable'

Vue.use(Vuex);

const determineOrder = (currentList, referenceList) => {
  // console.log('current', currentList)
  // console.log('ref', referenceList)
  return currentList.map(item => {
    return referenceList.indexOf(item)
  })
}

export const store = new Vuex.Store({
  state: {
    itemOrder: [], // this is used to keep track of the indexes for submission to db
    unrankedList: [],
    rankedList: [],
    creatingList: [],
    currentPowerRankId: '',
    currentPowerRankIntegerId: -1,
    inputTitle: '',
    inputParagraph: '',
    createdId: '', //this one is for when you create a ranklist
    createdRankId: '', //this one is for when you rank something
    username: ''
  },
  getters: {
    itemOrder: state => {
      return state.itemOrder;
    },
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
    },
    createdRankId: (state) => {
      return state.createdRankId;
    },
    currentPowerRankId: (state) => {
      return state.currentPowerRankId;
    },
    currentPowerRankIntegerId: (state) => {
      return state.currentPowerRankIntegerId;
    },
    username: (state) => {
      return state.username;
    }
  },
  mutations: {
    setItemOrder: (state, newList) => {
      state.itemOrder = newList;
    },
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
    },
    setCreatedRankId: (state, id) => {
      state.createdRankId = id
    },
    moveFromUnrankedToRanked: (state, index) => {
      const item = state.unrankedList.splice(index, 1)[0] //splice returns an array
      state.rankedList.push(item)
    },
    moveFromRankedToUnranked: (state, index) => {
      const item = state.rankedList.splice(index, 1)[0] //splice returns an array
      state.unrankedList.push(item)
    },
    resetRankLists: (state) => {
      const allItems = state.unrankedList.concat(state.rankedList)
      state.unrankedList = allItems
      state.rankedList = []
    },
    setIntId: (state, id) => {
      state.currentPowerRankIntegerId = id
    },
    setId: (state, id) => {
      state.currentPowerRankId = id
    },
    setUsername: (state, username) => {
      state.username = username
    }
  },
  actions: {
    setUnrankedList: (context, newList) => {
      context.commit('setUnrankedList', newList);
    },
    setRankedList: (context, newList) => {
      context.commit('setRankedList', newList);
    },
    loadPowerRankFromDatabase: (context, id) => {      
      axios.get(`/ranklist/${id}`)
        .then(res => {
          console.log('Backend response', res)
          // Split on newlines because it's stored that way
          // Filter any blank items we are left with
          const newList = res.data.rankItems;
          console.log("new list", newList)

          context.commit('setId', res.data._id);
          context.commit('setItemOrder', newList); //keep a second copy for reference
          context.commit('setUnrankedList', newList.slice());
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
    moveFromUnrankedToRanked: (context, index) => {
      context.commit('moveFromUnrankedToRanked', index)
    },
    moveFromRankedToUnranked: (context, index) => {
      context.commit('moveFromRankedToUnranked', index)
    },
    resetRankLists: (context) => {
      context.commit('resetRankLists')
    },
    setUsername: (context, username) => {
      context.commit('setUsername', username)
    },
    sendInputParagraphToDatabase: (context, router) => {
      const payload = {
        rankItems: context.getters.inputParagraph.split('\n').filter(item => item.trim() !== ''),
        title: context.getters.inputTitle
      }
      console.log('payload', payload)
      axios.post('/createranklist', payload)
        .then(res => {
          console.log(res)
          context.commit('setCreatedId', res.data.RankList._id)
          router.push('/create/success')
        })
        .catch(error => console.log(error))
    },
    submitPowerRankToDatabase: (context, router) => {
      // console.log(context.getters.rankedList)
      // console.log(context.getters.itemOrder)
      const payload = {
        rankListId: context.getters.currentPowerRankId,
        rankOrder: determineOrder(context.getters.rankedList, context.getters.itemOrder),
        user: context.getters.username
      }
      console.log('payload', payload)
      axios.post('/createranking', payload)
        .then(res => {
          console.log(res)
          context.commit('setCreatedRankId', res.data.ranking._id)
          router.push(`/rank/${context.getters.currentPowerRankId}/success`)
        })
        .catch(error => console.log(error))
    }
  }
});