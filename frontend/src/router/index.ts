import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.userIsLoggedIn || !authStore.isAdmin) {
          next();
        } else {
          next('/admin');
        }
      }
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
      props: route => ({ ...route.params, ...route.query, people: Number(route.query.people) }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.userIsLoggedIn || !authStore.isAdmin) {
          next();
        } else {
          next('/');
        }
      }

    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import("@/views/AdminView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()

        if (authStore.userIsLoggedIn && authStore.isAdmin) {
          next();
        }
        else {
          next("/");
        }

      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("@/views/ProfileView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.userIsLoggedIn && !authStore.isAdmin) { next() }
        else {
          next("/")
        }
      }
    },
    {
      path: '/policy',
      name: 'policy',
      component: () => import("@/views/PolicyView.vue")
    },
    {
      path: '/reservationDetail/:reservationId',
      name: 'reservationDetail',
      component: () => import("@/views/ReservationDetail.vue"),
      props: route => ({ ...route.params, reservationId: Number(route.params.reservationId) }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.userIsLoggedIn) { next() }
        else {
          next("/")
        }
      }
    }
  ]
})

export default router
