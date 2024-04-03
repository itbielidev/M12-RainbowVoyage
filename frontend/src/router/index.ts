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
      path: '/:pathMatch(.*)*',
      component: () => import("@/views/ErrorView.vue")
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
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import("@/views/ReservationFormView.vue"),
      props: route => ({ ...route.params, ...route.query })

    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import("@/views/AdminView.vue")
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("@/views/ProfileView.vue")
    }
  ]
})

export default router
