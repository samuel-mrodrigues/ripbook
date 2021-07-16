import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login/Login.vue'
import Inicio from "../components/home/Inicio.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/inicio',
    name: "Inicio",
    component: Inicio
  },
  {
    path: "",
    redirect: "/login"
  }
]

const router = new VueRouter({
  routes
})

export default router
