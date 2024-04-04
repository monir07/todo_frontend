import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import TodoView from '../views/TodoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: "Login" }
  },
  {
    path: '/signup/',
    name: 'signup',
    component: SignUpView,
    meta: { title: "Sign up" }
  },
  {
    path: '/todo/',
    name: 'todo',
    component: TodoView,
    meta: { title: "Todo list" }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const protectedRoutes = [
  'todo'
]

// if login redirect to to do list page
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

// set the title based on the route
router.beforeEach((to, from, next) => {
  document.title =
    to.meta.title || "Default Title";
  next();
});
export default router
