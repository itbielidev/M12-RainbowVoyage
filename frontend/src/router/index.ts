import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosView from '@/views/TodosView.vue'
import ExperiencesView from '../views/ExperiencesView.vue'
import ExperienceDetail from '../views/ExperienceDetail.vue'

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
      path: '/experiences/:cityName',
      name: 'experiences',
      component: ExperiencesView,
      props: route => ({ ...route.params, cityName: route.params.cityName })
    },
    {
      path: '/experiences/:cityName/experienceDetail/:experienceId',
      name: 'experienceDetail',
      component: ExperienceDetail,
      props: route => ({ ...route.params, experienceId: route.params.experienceId, cityName: route.params.cityName })
    },
  ]
})

export default router
