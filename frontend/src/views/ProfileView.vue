<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import TripIcon from '@/components/icons/TripIcon.vue'
import { useReservations } from '@/composables/useReservations'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import ErrorMessages from '@/components/ErrorMessages.vue'

import Chip from 'primevue/chip'

const translateStates = {
  pending: 'Pendiente de confirmar',
  completed: 'Confirmada',
  cancelled: 'Cancelada'
}

onMounted(async () => {
  await getUserReservations()
})

const { reservations, getUserReservations } = useReservations()
const { error, errorMessages, userData, email } = storeToRefs(useAuthStore())
const { modifyUserData } = useAuthStore()

const reservationActivated = ref(true)
const updatingEmail = ref(false)
const updatingPassword = ref(false)

onMounted(async () => {
  await getUserReservations()
})

function toggleReservationActivated() {
  reservationActivated.value = !reservationActivated.value
}

import UserPreferencesModal from '@/components/UserPreferencesModal.vue'
import { useModal } from 'vue-final-modal'

const { open, close } = useModal({
  component: UserPreferencesModal,
  attrs: {
    onConfirm(data: any) {
      close()
    },
    onCancel() {
      close()
    }
  }
})
</script>

<template>
  <NavBar></NavBar>
  <main
    class="gap-2 d-flex flex-column justify-content-center text-center pt-3 container"
    style="margin-top: 6rem"
  >
    <h2 class="text-center">Mi perfil</h2>
    <div class="mt-3 me-5 text-center text-lg-start d-flex justify-content-end">
      <a href="#" class="btn pink-button" @click="toggleReservationActivated">
        {{ !reservationActivated ? 'Mis datos' : 'Mis reservas' }}
      </a>
    </div>

    <!-- PERSONAL INFORMATION -->
    <section v-if="reservationActivated" class="card border p-2 my-4 mx-5 d-flex text-start">
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Información Personal</h4>
      </div>
      <div class="card-body">
        <form class="row g-3">
          <!-- name -->
          <div class="col-md-6">
            <label class="form-label">
              Nombre
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Introduce tu nombre"
              v-model="userData.name"
            />
          </div>
          <!-- surnames -->
          <div class="col-md-6">
            <label class="form-label"
              >Apellidos
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Introduce tus apellidos"
              v-model="userData.last_name"
            />
          </div>
          <!-- phone -->
          <div class="col-md-6">
            <label class="form-label">
              Teléfono
              <span class="text-danger">*</span>
            </label>
            <input
              type="phone"
              class="form-control"
              placeholder="Introduce tu nº teléfono"
              v-model="userData.phone"
            />
          </div>
          <!-- mail -->
          <div class="col-md-6">
            <label class="form-label"> Email </label>
            <input
              type="email"
              class="form-control"
              placeholder="Introduce tu email"
              v-model="email"
              disabled
            />
          </div>

          <div class="col-12 text-end">
            <a href="#" class="btn pink-button" @click="modifyUserData">Guardar</a>
          </div>
        </form>
      </div>
      <section v-if="error">
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </section>
    </section>

    <!-- UPDATE EMAIL -->
    <section
      v-if="reservationActivated && !updatingEmail"
      class="card border p-2 my-4 mx-5 d-flex text-start"
    >
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Actualizar Email</h4>
      </div>
      <div class="card-body">
        <form>
          <label class="form-label"> Nuevo email </label>
          <input type="email" class="form-control" placeholder="Introduce tu nuevo email" />
          <div class="text-end mt-3">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
    </section>

    <!-- UPDATE PASSWORD  -->
    <section
      v-if="reservationActivated && !updatingPassword"
      class="card border p-2 my-4 mx-5 d-flex text-start"
    >
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Actualizar Contraseña</h4>
      </div>
      <div class="card-body">
        <form>
          <label class="form-label"> Contraseña nueva </label>
          <input type="password" class="form-control" placeholder="Introduce tu nueva contraseña" />
          <div class="text-end mt-3">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
    </section>

    <!-- BOOKINGS -->
    <section v-if="!reservationActivated" class="card border p-2 my-4 mx-5 d-flex text-start">
      <div
        class="card-header border-bottom d-flex justify-content-between align-items-center"
        style="background-color: white"
      >
        <h4 class="card-header-title">Mis Reservas</h4>
        <h5 class="d-flex align-items-center gap-3">
          Preferencias de Búsqueda<button @click="open" class="btn pink-button me-0">
            Cambiar
          </button>
        </h5>
      </div>
      <template v-if="reservations && reservations.length > 0">
        <article v-for="reservation in reservations" :key="reservation.id" class="card-body">
          <div class="card border mb-4">
            <div
              class="card-header border-bottom d-md-flex justify-content-md-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <div class="bg-light rounded-circle flex-shrink-0">
                  <TripIcon></TripIcon>
                </div>
                <div class="ms-2">
                  <h6 class="ms-0">{{ reservation.airportIn }} | {{ reservation.airportOut }}</h6>
                  <ul class="small d-flex flex-column">
                    <li>Nº reserva: {{ reservation.id }}</li>
                    <li>Experiencia: {{ reservation.experience?.name }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-sm-6 col-md-4">
                <span>Ida</span>
                <h6 class="mb-0">
                  {{ reservation.dates.split('-')[0] }} | {{ reservation.partidaFirstDay }} -
                  {{ reservation.llegadaFirstDay }}
                </h6>
              </div>
              <div class="col-sm-6 col-md-4">
                <span>Vuelta</span>
                <h6 class="mb-0">
                  {{ reservation.dates.split('-')[1] }} | {{ reservation.partidaLastDay }} -
                  {{ reservation.llegadaLastDay }}
                </h6>
              </div>
              <div class="col-md-4">
                <span>Reserva a nombre de: </span>
                <h6 class="mb-0">{{ reservation.name }} {{ reservation.last_name }}</h6>
              </div>
            </div>
            <div class="d-flex w-100 gap-3">
              <Chip :label="translateStates[reservation.state]" class="mt-4 me-auto" />
              <div class="mt-3 text-center text-lg-start d-flex justify-content-start">
                <RouterLink
                  :to="{ name: 'reservationDetail', params: { reservationId: reservation.id } }"
                  class="btn pink-button"
                >
                  Ver detalle
                </RouterLink>
              </div>
            </div>
          </div>
        </article>
      </template>
      <template v-else-if="reservations && reservations.length === 0">
        <h3>Todavía no has hecho ninguna reserva</h3>
      </template>
    </section>
  </main>

  <FooterComponent></FooterComponent>
</template>

<style scoped>
* {
  font-family: 'Roboto';
}

.pink-button {
  background-color: #d90594;
  padding: 0.6rem 1rem;
  border-radius: 4rem;
  color: white;
}

.pink-button:hover {
  background-color: #f2a0d7;
}

.pink-button a {
  text-decoration: none;
}

h5 {
  font-size: 1rem;
}
</style>
