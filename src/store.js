import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebaseconfig'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    kanbanList: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_KANBAN_LIST(state, kanbanList) {
      state.kanbanList = kanbanList
    }
  },
  actions: {
    authenticate(context) {
      try {
        const userEmail = context.state.user
          ? context.state.user.email
          : jwt.verify(
              localStorage.getItem('access_email'),
              process.env.VUE_APP_JWT_SECRET
            )
        return db
          .collection('users')
          .where('email', '==', userEmail)
          .get()
          .then(userDoc => {
            if (userDoc.docs[0].exists) return Promise.resolve()
            else return Promise.reject('User not found')
          })
      } catch (err) {
        return Promise.reject(err)
      }
    },
    signUp(context, payload) {
      return db
        .collection('users')
        .doc(payload.email)
        .get()
        .then(userRef => {
          if (userRef.exists) {
            return Promise.reject('Email already registered')
          }
          return db
            .collection('users')
            .doc(payload.email)
            .set(payload)
            .then(() => {
              context.commit('SET_USER', {
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name
              })
              localStorage.setItem(
                'access_email',
                jwt.sign(payload.email, process.env.VUE_APP_JWT_SECRET)
              )
              return Promise.resolve()
            })
        })
    },
    createKanban(context, payload) {
      return db.collection('kanbans').add({
        kanban_name: payload.kanban_name,
        description: payload.description,
        members: [context.state.user.email]
      })
    },
    getKanbans(context) {
      db.collection('kanbans').onSnapshot(kanbanSnapshot => {
        kanbanSnapshot = kanbanSnapshot.docs.map(kanban => {
          return {
            id: kanban.id,
            kanban_name: kanban.data().kanban_name,
            description: kanban.data().description,
            members: kanban.data().members.length
          }
        })
        context.commit('SET_KANBAN_LIST', kanbanSnapshot)
      })
    }
  },
  modules: {}
})
