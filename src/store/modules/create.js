import axios from '../../axios-powerrank'

const state = {
    creatingList: [],
    inputTitle: '',
    inputParagraph: '',
    createdId: '', //this one is for when you create a ranklist
    publiclyVisible: true,
    scaleName: '',
    creatorUsername: ''
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
    scaleName: state => {
      return state.scaleName;
    },
    creatorUsername: state => {
      return state.creatorUsername;
    },
    publiclyVisible: state => {
      return state.publiclyVisible;
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
    setScaleName: (state, scaleName) => {
      state.scaleName = scaleName
    },
    setCreatorUsername: (state, creatorUsername) => {
      state.creatorUsername = creatorUsername
    },
    setPubliclyVisible: (state, publiclyVisible) => {
      state.publiclyVisible = publiclyVisible
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
    setScaleName: (context, scaleName) => {
      context.commit('setScaleName', scaleName)
    },
    setCreatorUsername: (context, creatorUsername) => {
      context.commit('setCreatorUsername', creatorUsername)
    },
    setPubliclyVisible: (context, publiclyVisible) => {
      context.commit('setPubliclyVisible', publiclyVisible)
    },
    setInputParagraph: (context, newParagraph) => {
      context.commit('setInputParagraph', newParagraph)
    },
    sendInputParagraphToDatabase: (context, router) => {
      const payload = {
        rankItems: context.getters.inputParagraph.split('\n').filter(item => item.trim() !== ''),
        title: context.getters.inputTitle,
        scaleName: context.getters.scaleName,
        public: context.getters.publiclyVisible,
        user: context.getters.creatorUsername
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
    createClear: ({commit}) => {
      commit('setInputTitle','')
      commit('setScaleName','')
      commit('setCreatorUsername','')
      commit('setInputParagraph','')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}