import './startup'

import Vue from 'vue'
import App from './App'
import router from './router'
import * as resources from './resources'
import resource from './plugins/resource'
import deviceQueries from './plugins/device-queries'

import {store} from './store'
import * as firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(resource, {
  resources,
  endpoint: '/static/api'
})

Vue.use(deviceQueries, {
  phone: 'max-width: 567px',
  tablet: 'min-width: 568px',
  mobile: 'max-width: 1024px',
  laptop: 'min-width: 1025px',
  desktop: 'min-width: 1280px',
  monitor: 'min-width: 1448px'
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCNGbcVTAIuYDbjMQIi5SRhQNHHuNe5Z2M',
      authDomain: 'vue-blog-52059.firebaseapp.com',
      databaseURL: 'https://vue-blog-52059.firebaseio.com',
      projectId: 'vue-blog-52059',
      storageBucket: 'vue-blog-52059.appspot.com'
    })
    this.$store.dispatch('loadPosts')
  }
}).$mount('#app')
