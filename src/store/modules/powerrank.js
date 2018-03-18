import axios from '../../axios-powerrank'

const determineOrder = (currentList, referenceList) => {
  return currentList.map(item => {
    return referenceList.indexOf(item)
  })
}

const state = {
    itemOrder: [], // this is used to keep track of the indexes for submission to db
    unrankedList: [],
    rankedList: [],
    username: '',
    createdRankId: '', //this one is for when you rank something
    currentPowerRankId: ''
}

const getters = {
    itemOrder: state => {
      return state.itemOrder;
    },
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
    createdRankId: (state) => {
      return state.createdRankId;
    },
    currentPowerRankId: (state) => {
      return state.currentPowerRankId;
    },
    username: (state) => {
      return state.username;
    }
}

const mutations = {
    setItemOrder: (state, newList) => {
      state.itemOrder = newList;
    },
    setUnrankedList: (state, newList) => {
      state.unrankedList = newList;
    },
    setRankedList: (state, newList) => {
      state.rankedList = newList;
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
    setId: (state, id) => {
      state.currentPowerRankId = id
    },
    setUsername: (state, username) => {
      state.username = username
    }
}

const actions = {setUnrankedList: (context, newList) => {
        context.commit('setUnrankedList', newList);
    },
    setRankedList: (context, newList) => {
        context.commit('setRankedList', newList);
    },
    loadPowerRankFromDatabase: (context, id) => {      
        axios.get(`/ranklist/${id}`)
        .then(res => {
            // console.log('Backend response', res)
            // Split on newlines because it's stored that way
            // Filter any blank items we are left with
            const newList = res.data.rankItems;
            // console.log("new list", newList)

            context.commit('setId', res.data._id);
            context.commit('setItemOrder', newList); //keep a second copy for reference
            context.commit('setUnrankedList', newList.slice());
            context.commit('setRankedList', []);
        })
        .catch(error => console.log(error))
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
    submitPowerRankToDatabase: (context, router) => {
      const payload = {
        rankListId: context.getters.currentPowerRankId,
        rankOrder: determineOrder(context.getters.rankedList, context.getters.itemOrder),
        user: context.getters.username
      }
      axios.post('/createranking', payload)
        .then(res => {
        //   console.log(res)
          context.commit('setCreatedRankId', res.data.ranking._id)
          router.push(`/rank/${context.getters.currentPowerRankId}/success`)
        })
        .catch(error => console.log(error))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}