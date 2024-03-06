import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosView from '@/views/TodosView.vue'
import ProfileView from '@/views/ProfileView.vue'
import UserEducation from '@/views/UserEducation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView
    },  
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/userEducation',
      name: 'userEducation',
      component: UserEducation
    }
  ]
})

export default router
