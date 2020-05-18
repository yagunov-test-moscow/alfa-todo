// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(
  Vuelidate,
  Uimini
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyAy3vy99pbJj1DmiudRoABzbtTcQg9BRwM',
      authDomain: 'dream-list-c7943.firebaseapp.com',
      databaseURL: 'https://dream-list-c7943.firebaseio.com',
      projectId: 'dream-list-c7943',
      storageBucket: 'dream-list-c7943.appspot.com',
      messagingSenderId: '951230043655',
      appId: '1:951230043655:web:648794dec16765f733bca2'
    }
    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  }
})
