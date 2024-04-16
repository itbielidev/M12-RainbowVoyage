<template>
  <NavBar></NavBar>
  <main
    class="gap-2 d-flex flex-column justify-content-center text-center pt-3 container"
    style="margin-top: 6rem"
  >
    <h2>Mi perfil</h2>
    <div class="text-end mt-3 me-5">
      <a href="#" class="btn pink-button" @click="toggleReservationActivated"> Mis Reservas </a>
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
              v-model="formData.name"
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
              v-model="lastName"
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
              v-model="phone"
            />
          </div>
          <!-- mail -->
          <div class="col-md-6">
            <label class="form-label">
              Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control"
              placeholder="Introduce tu email"
              v-model="email"
            />
          </div>
          <!-- address -->
          <!-- <div class="col-md-12">
            <label class="form-label">
              Dirección
              <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" placeholder="calle número población" />
          </div> -->
          <div class="col-12 text-end">
            <a href="#" class="btn pink-button">Guardar</a>
          </div>
        </form>
      </div>
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
      <div class="card-header border-bottom" style="background-color: white">
        <h4 class="card-header-title">Mis Reservas</h4>
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
                  <h6 class="ms-0">Barcelona - Málaga</h6>
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
                <h6 class="mb-0">Martes 30 abril 9:00h</h6>
              </div>
              <div class="col-sm-6 col-md-4">
                <span>Vuelta</span>
                <h6 class="mb-0">Domingo 5 mayo 10:45h</h6>
              </div>
              <div class="col-md-4">
                <span>Reserva a nombre de: </span>
                <h6 class="mb-0">{{ reservation.name }} {{ reservation.last_name }}</h6>
              </div>
            </div>
            <Chip :label="translateStates[reservation.state]" class="mt-4" />
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

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import TripIcon from '@/components/icons/TripIcon.vue'
import { useReservations } from '@/composables/useReservations'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
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
const { name, email, phone, lastName } = storeToRefs(useAuthStore())

const formData = ref({
  name: name,
  email: email,
  phone: phone,
  lastName: lastName
})

const reservationActivated = ref(true)
const updatingEmail = ref(false)
const updatingPassword = ref(false)

onMounted(async () => {
  await getUserReservations()
})

function toggleReservationActivated() {
  reservationActivated.value = !reservationActivated.value
}
</script>

<style scoped>
* {
  font-family: 'Roboto';
}

.pink-button {
  background-color: #d90594;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  color: white;
}

.pink-button:hover {
  background-color: #f2a0d7;
}

.pink-button a {
  text-decoration: none;
}
</style>
