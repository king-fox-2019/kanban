import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebaseconfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRef: null
  },
  mutations: {
    SET_USER_REF(state, userRef) {
      state.userRef = userRef
    }
  },
  actions: {
    signUp(context, payload) {
      return db
        .collection('users')
        .doc(payload.email)
        .get()
        .then(userRef => {
          if (userRef.exists) {
            return Promise.reject('Email already registered')
          }
          db.collection('users')
            .doc(payload.email)
            .set(payload)
            .then(() => {
              context.commit(
                'SET_USER_REF',
                db.collection('users').doc(payload.email)
              )
              return Promise.resolve()
            })
        })
    }
  },
  modules: {}
})
