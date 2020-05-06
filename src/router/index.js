import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './../layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/Home/index')
      },
      {
        path: '/paper',
        name: 'Paper',
        component: () => import(/* webpackChunkName: "paper" */ '../views/Paper/index')
      },
      {
        path: '/exam',
        name: 'Exam',
        component: () => import(/* webpackChunkName: "exam" */ '../views/Exam/index')
      },
      {
        path: '/score',
        name: 'Score',
        component: () => import(/* webpackChunkName: "score" */ '../views/Score/index')
      },
      {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "score" */ '../views/Test/index')
      },
      {
        path: '/wrong-question',
        name: 'WrongQuestion',
        component: () => import(/* webpackChunkName: "wrong-question" */ '../views/WrongQuestion/index')
      }
    ]
  },
  {
    path: '/examing',
    name: 'Examing',
    component: () => import(/* webpackChunkName: "examing" */ '../views/Examing/index')
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index')
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
