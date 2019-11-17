import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/kanban',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
      store
        .dispatch('authenticate')
        .then(() => next())
        .catch(() => next('/signin'))
    },
    component: () =>
      import(/* webpackChunkName: "kanban" */ '@/views/Kanban.vue'),
    children: [
      {
        path: '',
        name: 'kanbanList',
        component: () =>
          import(
            /* webpackChunkName: "kanbanlist" */ '@/components/kanban/KanbanList.vue'
          )
      },
      {
        path: ':id',
        name: 'theKanban',
        beforeEnter(to, from, next) {
          store.dispatch('prepareKanban', to.params.id).finally(() => next())
        },
        component: () =>
          import(
            /* webpackChunkName: "thekanban" */ '@/components/kanban/TheKanban.vue'
          )
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ './views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () =>
      import(/* webpackChunkName: "signup" */ './views/Signin.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
