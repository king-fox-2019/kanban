import Vue from 'vue'
import Vuex from 'vuex'
import db from './config/db'
import auth from './config/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userEmail: null,
    kanbanList: [],
    kanban_name: '',
    kanban_tab: 'backlog'
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
    signUp(context, payload) {
      const { email, password, first_name, last_name } = payload
      return auth.createUserWithEmailAndPassword(email, password).then(() => {
        return db
          .collection('users')
          .doc(email)
          .set({ email, first_name, last_name })
      })
    },
    signIn(context, payload) {
      return auth.signInWithEmailAndPassword(payload.email, payload.password)
    },
    createKanban(context, payload) {
      return db.collection('kanbans').add({
        kanban_name: payload.kanban_name,
        description: payload.description,
        members: [auth.currentUser.email]
      })
    },
    prepareKanban(context, id) {
      return db
        .collection('kanbans')
        .doc(id)
        .get()
        .then(kanbanRef => {
          context.commit('SET_KANBAN_NAME', kanbanRef.data().kanban_name)
          if (!kanbanRef.data().members.includes(context.state.userEmail)) {
            const members = kanbanRef.data().members
            members.push(context.state.userEmail)
            db.collection('kanbans')
              .doc(id)
              .update({ members })
          }
        })
    },
    addTask(context, payload) {
      return db
        .collection('kanbans')
        .doc(payload.id)
        .collection('kanban_items')
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
        .collection('kanban_items')
        .doc(payload.id)
        .delete()
    },
    pushTask(context, payload) {
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
      return db
        .collection('kanbans')
        .doc(payload.kanban_id)
        .collection('kanban_items')
        .doc(payload.id)
        .update({ status: newStatus })
    }
  },
  modules: {}
})
