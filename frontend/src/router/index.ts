import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import("@/views/TodosView.vue")
    },
    {
      path: '/experiences/:cityName',
      name: 'experiences',
      component: () => import("@/views/ExperiencesView.vue"),
      props: route => ({ ...route.params, cityName: route.params.cityName })
    },
    {
      path: '/experiences/:cityName/experienceDetail/:experienceId',
      name: 'experienceDetail',
      component: () => import("@/views/ExperienceDetail.vue"),
      props: route => ({ ...route.params, experienceId: route.params.experienceId, cityName: route.params.cityName })
    },
  ]
})

export default router
