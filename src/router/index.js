import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import TodoView from '../views/TodoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup/',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/todo/',
    name: 'todo',
    component: TodoView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const protectedRoutes = [
  'todo'
]

router.beforeEach((to, from, next) => {
  const isProtected = protectedRoutes.includes(to.name);
  if (isProtected && !localStorage.getItem('token')) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  }
  else {
    if (!isProtected && localStorage.getItem('token') && (to.name == 'home' || to.name == 'signup')) {
      next({
        path: '/todo'
      })
    }
    else {
      next();
    }
  }
})
export default router
