import axios from '../../axios-powerrank'

const state = {
    creatingList: [],
    inputTitle: '',
    inputParagraph: '',
    createdId: '', //this one is for when you create a ranklist
}

const getters = {
    creatingList: state => {
      return state.creatingList;
    },
    inputParagraph: state => {
      return state.inputParagraph;
    },
    inputTitle: state => {
      return state.inputTitle;
    },
    createdId: (state) => {
      return state.createdId;
    }
}

const mutations = {
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
}

const actions = {
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
}

export default {
    state,
    getters,
    mutations,
    actions
}