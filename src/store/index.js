import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [],
    allPosts: [],
    loading: null
  },
  mutations: {
    setAllPosts(state, payload) {
      state.allPosts = payload
    },
    setLoadedPosts(state, payload) {
      state.loadedPosts.push(...payload)
    },
    createPost(state, payload) {
      state.loadedPosts.push(payload)
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    loadPosts({commit}) {
      commit('setLoading', true)
      firebase.database().ref('posts')
        .orderByKey()
        .once('value')
        .then(data => {
          const posts = []
          const obj = data.val()
          for (let key in obj) {
            posts.push({
              id: key,
              title: obj[key].title,
              content: obj[key].content,
              image: obj[key].image,
              meta: obj[key].meta
            })
          }
          // console.log(posts)
          commit('setLoadedPosts', posts.reverse())
          commit('setAllPosts', posts)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    createPost({commit}, payload) {
      const post = {
        title: payload.title,
        content: payload.content,
        image: payload.image,
        meta: payload.meta
      }
      firebase.database().ref('posts').push(post)
        .then(data => {
          const key = data.key
          commit('createPost', {...post, id: key})
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    allPosts(state) {
      return state.allPosts.sort((postA, postB) => {
        return postA.meta.published < postB.meta.published
      })
    },
    loadedPost(state, getters) {
      return (postId) => {
        return state.loadedPosts.find(post => {
          return post.id === postId
        })
      }
    },
    loadedPosts(state) {
      return state.loadedPosts
    },
    loading(state) {
      return state.loading
    }
  }
})
