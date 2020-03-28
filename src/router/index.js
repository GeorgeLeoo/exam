import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './../layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Home/index')
      },
      {
        path: '/paper',
        name: 'Paper',
        component: () => import(/* webpackChunkName: "about" */ '../views/Paper/index')
      },
      {
        path: '/exam',
        name: 'Exam',
        component: () => import(/* webpackChunkName: "about" */ '../views/Exam/index')
      },
      {
        path: '/score',
        name: 'Score',
        component: () => import(/* webpackChunkName: "about" */ '../views/Score/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
