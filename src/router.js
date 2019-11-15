import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
  },
  {
    path: '/kanban',
    name: 'kanbanList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "kanbanlist" */ './views/Kanban.vue'),
    children: [
      {
        path: ':id',
        component: import(
          /* webpackChunkName: "kanbanlist" */ './components/TheKanban.vue'
        )
      }
    ]
  },
  {
    path: '/kanban/:id',
    name: 'kanban',

    component: () =>
      import(/* webpackChunkName: "kanban" */ './views/Kanban.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ './views/Signup.vue')
  },
  {
    path: '/signin',
    name: 'signin'
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
