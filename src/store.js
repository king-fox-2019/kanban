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
        context.commit('SET_USER_EMAIL', userEmail)
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
        members: [
          context.state.userEmail ||
            jwt.verify(
              localStorage.getItem('access_email'),
              process.env.VUE_APP_JWT_SECRET
            )
        ]
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
    },
    addTask(context, payload) {
      return db
        .collection('kanbans')
        .doc(payload.id)
        .collection('kanban_backlog')
        .add({
          assigner: context.state.userEmail,
          title: payload.title,
          desc: payload.desc,
          assignee: payload.assignee,
          status: 'backlog'
        })
    },
    deleteTask(context, payload) {
      return db
        .collection('kanbans')
        .doc(payload.kanban_id)
        .collection(`kanban_${payload.status}`)
        .doc(payload.id)
        .delete()
    },
    pushTask(context, payload) {
      return db.runTransaction(async transaction => {
        const kanbanRef = db.collection('kanbans').doc(payload.kanban_id)
        const taskRef = kanbanRef
          .collection(`kanban_${payload.status}`)
          .doc(payload.id)
        let newStatus = ''
        switch (payload.status) {
          case 'backlog':
            newStatus = 'todo'
            break
          case 'todo':
            newStatus = 'doing'
            break
          case 'doing':
            newStatus = 'done'
            break
        }
        const newTask = await taskRef.get()
        transaction
          .set(kanbanRef.collection(`kanban_${newStatus}`).doc(), {
            ...newTask.data(),
            status: newStatus
          })
          .delete(taskRef)
      })
    }
  },
  modules: {}
})
