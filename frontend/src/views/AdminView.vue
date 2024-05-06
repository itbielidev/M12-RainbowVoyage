<script setup lang="ts">
import InputText from 'primevue/inputtext'
import ReservationCard from '@/components/ReservationCard.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReservations } from '@/composables/useReservations'
import { useAuthStore } from '@/stores/auth'
import ErrorMessages from '@/components/ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useSeoMeta } from '@unhead/vue'

const route = useRoute()
const router = useRouter()

import Toast from 'primevue/toast'
import useCustomToast from '@/composables/useCustomToast'

const { showSuccessEmail } = useCustomToast()

useSeoMeta({
  title: `Rainbow Voyage | Panel del administrador`,
  description: `Panel del administrador para gestionar las reservas de la web.`,
  ogDescription: `Panel del administrador para gestionar las reservas de la web.`,
  ogTitle: `Rainbow Voyage | Panel del administrador`,
  ogImage: '/images/logo.webp'
})

const { getReservations, reservations, errorMessages, error, isLoadingReservations } =
  useReservations()

// const name = ref<string>('')

function setReservationState(state: string) {
  query.value.state = state
}

const { logout } = useAuthStore()

const query = ref({
  name: '',
  state: 'pending',
  ...route.query
})

const refreshReservations = async () => {
  await getData()
  showSuccessEmail()
}

watch(
  query,
  async () => {
    await getData()
    router.push({ query: query.value })
  },
  { deep: true }
)

async function getData() {
  const qs = new URLSearchParams(query.value).toString()
  await getReservations(qs)
}

onMounted(async () => await getData())
</script>
<template>
  <nav
    class="w-100 d-flex flex-column gap-3 flex-lg-row align-items-center justify-content-center justify-content-md-start mb-5"
  >
    <div class="text-center w-25 d-flex justify-content-center">
      <img src="/images/logo.webp" alt="Logo" class="logo" />
    </div>
    <div
      class="text-center w-50 d-flex justify-content-center justify-content-xs-center align-items-lg-end"
    >
      <InputText
        type="text"
        v-model.trim="query.name"
        placeholder="Buscar por nombre de titular"
        @change="getData()"
      ></InputText>
    </div>
    <div class="text-end d-flex justify-content-end w-25 justify-self-end me-4">
      <button type="button" class="btn" value="Cerrar sesión" @click="logout">
        Cerrar sesión
        <font-awesome-icon icon="fa-solid fa-power-off" />
      </button>
    </div>
  </nav>
  <!-- Mobile Menu-->
  <section
    class="d-flex d-xs-flex d-md-none w-100 fixed-bottom p-1 justify-content-center align-items-center mobile-menu"
  >
    <ul class="d-flex flex-row gap-3 justify-content-center m-0">
      <li>
        <input
          type="button"
          class="btn w-100"
          value="Por confirmar"
          @click="setReservationState('pending')"
        />
      </li>
      <li>
        <input
          type="button"
          class="btn w-100"
          value="Confirmadas"
          @click="setReservationState('completed')"
        />
      </li>
    </ul>
  </section>
  <main class="d-flex gap-3 flex-column flex-lg-row p-3">
    <Toast></Toast>
    <!-- Desktop Menu-->
    <section
      class="d-none d-lg-flex flex-column justify-content-start align-items-center tabs-menu w-25 p-5"
    >
      <ul class="d-flex flex-column gap-3">
        <li>
          <input
            type="button"
            class="btn w-100"
            value="Por confirmar"
            @click="setReservationState('pending')"
          />
        </li>
        <li>
          <input
            type="button"
            class="btn w-100"
            value="Confirmadas"
            @click="setReservationState('completed')"
          />
        </li>
      </ul>
    </section>
    <!-- Tablet Menu-->
    <section class="w-100 d-none d-md-flex d-lg-none align-items-center tablet-menu">
      <ul class="w-100 d-flex px-2 justify-content-around align-items-center gap-5">
        <li>
          <input
            type="button"
            class="btn w-100"
            value="Por confirmar"
            @click="setReservationState('pending')"
          />
        </li>
        <li>
          <input
            type="button"
            class="btn w-100"
            value="Confirmadas"
            @click="setReservationState('completed')"
          />
        </li>
      </ul>
    </section>
    <section
      v-if="reservations && reservations.length > 0 && !isLoadingReservations && !error"
      class="reservations-section px-4 d-flex flex-column py-3 gap-2"
    >
      <h2 class="fw-bold">Reservas recientes</h2>
      <ReservationCard
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
        @refresh="refreshReservations()"
      ></ReservationCard>
    </section>
    <section
      class="text-center"
      v-else-if="reservations && reservations.length === 0 && !isLoadingReservations && !error"
    >
      <h3>No hay reservas que mostrar.</h3>
    </section>
    <section class="d-flex justify-content-center" v-else-if="error">
      <h2 class="fw-bold">Reservas recientes</h2>
      <ReservationCard
        v-for="reservation in reservations"
        :key="reservation.id"
        :reservation="reservation"
        @refresh="refreshReservations()"
      ></ReservationCard>
      <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
    <section class="d-flex justify-content-center" v-else-if="isLoadingReservations">
      <ProgressSpinner></ProgressSpinner>
    </section>
  </main>
</template>

<style scoped>
.tablet-menu,
.mobile-menu {
  background-color: #f4f8fb;
}
main {
  background-color: rgba(171, 184, 195, 0.19);
}

.reservations-section,
.tabs-menu {
  background-color: #f4f8fb;
  border-radius: 10px;
}

.tabs-menu {
  height: auto;
}

.reservations-section {
  width: 75%;
}

ul {
  list-style-type: none;
  padding: 0;
}

.logo {
  width: 180px;
  height: auto;
}

.btn {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  border-radius: 12px;
  width: max-content;
  padding: 0.6rem 1rem;
}

.btn:hover {
  background-color: rgb(241, 78, 187);
}

.fa-power-off {
  color: white;
}

@media screen and (max-width: 991px) {
  .reservations-section {
    width: 100%;
  }
}
</style>
<style>
.p-inputtext {
  width: 50%;
}

.p-inputtext:enabled:focus {
  outline: 1px solid black;
  outline-offset: -1px;
  box-shadow: none;
  border-color: #94a3b8;
}

@media screen and (max-width: 868px) {
  .p-inputtext {
    width: 100%;
  }
}
</style>
