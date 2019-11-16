import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebaseconfig'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: null,
    kanbanList: [],
    kanban_name: '',
    kanban_tab: 'doing'
  },
  mutations: {
    SET_USER_EMAIL(state, userEmail) {
      state.userEmail = userEmail
    },
    SET_KANBAN_LIST(state, kanbanList) {
      state.kanbanList = kanbanList
    },
    SET_KANBAN_NAME(state, kanban_name) {
      state.kanban_name = kanban_name
    },
    SWITCH_KANBAN_TAB(state, kanban_tab) {
      state.kanban_tab = kanban_tab
    }
  },
  actions: {
    authenticate(context) {
      try {
        const userEmail =
          context.state.userEmail ||
          jwt.verify(
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
              context.commit('SET_USER_EMAIL', payload.email)
              localStorage.setItem(
                'access_email',
                jwt.sign(payload.email, process.env.VUE_APP_JWT_SECRET)
              )
              return Promise.resolve()
            })
        })
    },
    signIn(context, payload) {
      return db
        .collection('users')
        .doc(payload.email)
        .get()
        .then(userRef => {
          if (userRef.exists) {
            if (userRef.data().email === payload.email) {
              context.commit('SET_USER_EMAIL', payload.email)
              localStorage.setItem(
                'access_email',
                jwt.sign(payload.email, process.env.VUE_APP_JWT_SECRET)
              )
              return Promise.resolve()
            } else {
              return Promise.reject('Invalid email/password')
            }
          } else return Promise.reject('Invalid email/password')
        })
    },
    createKanban(context, payload) {
      return db.collection('kanbans').add({
        kanban_name: payload.kanban_name,
        description: payload.description,
        members: [context.state.userEmail]
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
    },
    getKanbanName(context, id) {
      db.collection('kanbans')
        .doc(id)
        .get()
        .then(kanbanRef => {
          context.commit('SET_KANBAN_NAME', kanbanRef.data().kanban_name)
        })
    }
  },
  modules: {}
})
