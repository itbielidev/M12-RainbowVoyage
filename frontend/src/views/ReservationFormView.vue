<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps<{
  experienceId: string
  experienceName: string
  dateId: string
  date: string
  image: string
  people: number
  cityName: string
}>()

const {
  selectedAirportIn,
  formData,
  horaLlegadaFirstDay,
  horaPartidaFirstDay,
  horaLlegadaLastDay,
  horaPartidaLastDay,
  error,
  errorMessages,
  validateForm,
  validateSecondForm,
  manageReservation,
  availableAirportsDestination,
  availableAirportsOrigin
} = useReservations()

const currentIndex = ref<number>(0)

const { name, lastName, email, phone } = storeToRefs(useAuthStore())

const loading = ref<boolean>(false)

async function handleReservation() {
  await manageReservation(props.experienceId)
  await modifyIndex(3)
  loading.value = true

  setTimeout(() => (loading.value = false), 2000)
}

function modifyIndex(num: number) {
  if (num === 1) validateForm()
  else if (num === 2) validateSecondForm()
  // else if (num === 3) validateCheckBox()
  if (!error.value) {
    currentIndex.value = num
  }
}

function goBack(num: number) {
  error.value = false
  errorMessages.value = []

  currentIndex.value = num
}

const numVisitors = props.people - 1

watch(formData.value, () => {
  formData.value.email = formData.value.email.toLowerCase()
  formData.value.emailConfirmation = formData.value.emailConfirmation.toLowerCase()
})

function setHours() {
  formData.value.partidaFirstDay =
    horaPartidaFirstDay[formData.value.airportIn.split('-')[0].replace(/\s$/, '')][props.cityName]

  formData.value.llegadaFirstDay =
    horaLlegadaFirstDay[formData.value.airportIn.split('-')[0].replace(/\s$/, '')][props.cityName]

  formData.value.partidaLastDay =
    horaPartidaLastDay[formData.value.airportIn.split('-')[0].replace(/\s$/, '')][props.cityName]

  formData.value.llegadaLastDay =
    horaLlegadaLastDay[formData.value.airportIn.split('-')[0].replace(/\s$/, '')][props.cityName]
}

onMounted(() => {
  formData.value.name = name.value as string
  formData.value.lastName = lastName.value as string
  formData.value.email = email.value as string
  formData.value.emailConfirmation = ''
  formData.value.phone = phone.value as string
  formData.value.numPeople = numVisitors.toString()
  formData.value.dates = props.date
  formData.value.dateId = props.dateId as string
})

onMounted(() => {
  formData.value.name = name.value as string
  formData.value.lastName = lastName.value as string
  formData.value.email = email.value as string
  formData.value.emailConfirmation = ''
  formData.value.phone = phone.value as string
  formData.value.numPeople = numVisitors.toString()
  formData.value.dates = props.date
  formData.value.dateId = props.dateId as string
})

onMounted(() => {
  formData.value.name = name.value as string
  formData.value.lastName = lastName.value as string
  formData.value.email = email.value as string
  formData.value.emailConfirmation = ''
  formData.value.phone = phone.value as string
  formData.value.numPeople = numVisitors.toString()
  formData.value.dates = props.date
  formData.value.dateId = props.dateId as string
})

onMounted(() => {
  formData.value.name = name.value as string
  formData.value.lastName = lastName.value as string
  formData.value.email = email.value as string
  formData.value.emailConfirmation = ''
  formData.value.phone = phone.value as string
  formData.value.numPeople = numVisitors.toString()
  formData.value.dates = props.date
  formData.value.dateId = props.dateId as string
})
</script>

<template>
  <main
    class="content-box register-box d-flex justify-content-center flex-column align-items-center"
  >
    <section class="text-center d-none d-md-block">
      <img src="/images/logo.webp" alt="Logo" class="img-fluid logo-img" />
    </section>
    <section
      class="d-flex flex-column flex-md-row align-items-center gap-2 justify-content-center mb-5 w-100"
    >
      <div
        :class="currentIndex === num ? 'border-pink' : ''"
        class="rounded-circle number-box fs-2 d-flex align-items-center justify-content-center"
        v-for="num in [0, 1, 2, 3]"
        :key="num"
      >
        {{ num + 1 }}
      </div>
    </section>
    <form class="px-5 py-2" @submit.prevent="handleReservation()" novalidate>
      <template v-if="currentIndex === 0">
        <h1 class="display-5 mb-5">DATOS DEL TITULAR</h1>
        <section class="d-flex flex-column">
          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="name">Nombre *</label>
            <input
              v-model.trim="formData.name"
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
            />
            <label class="mb-1" for="lastName">Apellidos *</label>
            <input
              v-model.trim="formData.lastName"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Apellidos"
            />
          </div>
          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="dni">DNI *</label>
            <input
              v-model.trim="formData.dni"
              type="text"
              name="dni"
              id="dni"
              placeholder="12345678A"
            />
            <label class="mb-1" for="phone">Teléfono *</label>
            <input
              v-model.trim="formData.phone"
              type="text"
              name="phone"
              id="phone"
              placeholder="123 456 789"
            />
          </div>

          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="email">Correo electrónico *</label>
            <input
              v-model.trim="formData.email"
              type="email"
              name="email"
              id="email"
              placeholder="usuario@gmail.com"
            />
            <label class="mb-1" for="emailConfirmation">Confirma correo electrónico *</label>
            <input
              v-model.trim="formData.emailConfirmation"
              type="email"
              name="emailConfirmation"
              id="emailConfirmation"
              placeholder=""
            />
          </div>
        </section>

        <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
          <button class="button fw-bold mt-3 px-1 py-2" @click="$router.back()" type="button">
            VOLVER ATRÁS
          </button>
          <button class="button fw-bold mt-3 px-1 py-2" @click="modifyIndex(1)" type="button">
            SIGUIENTE
          </button>
        </section>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </template>
      <template v-if="currentIndex === 1">
        <section class="d-flex flex-column">
          <div class="d-flex flex-column gap-2 text-start mt-5">
            <label class="mb-2" for="address">Dirección *</label>
            <input
              v-model.trim="formData.address"
              type="text"
              name="address"
              id="address"
              placeholder="C/Calle num-1 3º-4ª"
            />
            <label class="mb-2" for="postalCode">Código Postal*</label>
            <input
              v-model.trim="formData.postalCode"
              type="text"
              name="postalCode"
              id="postalCode"
              placeholder="08111"
            />
            <label class="mb-2" for="location">Población*</label>
            <input
              v-model.trim="formData.location"
              type="text"
              name="location"
              id="location"
              placeholder="Barcelona"
            />
            <label class="mb-2" for="numPeople">Acompañantes*</label>
            <input
              v-model.trim="formData.numPeople"
              type="text"
              name="numPeople"
              id="numPeople"
              :placeholder="numVisitors.toString()"
              disabled
            />
            <label class="mb-2" for="cardNumber">Número de tarjeta*</label>
            <input
              v-model.trim="formData.cardNumber"
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="4123456789012345"
            />
            <div class="d-flex flex-column flex-md-row gap-2">
              <div class="d-flex flex-column">
                <label class="mb-2" for="securityCode">Código de seguridad *</label>
                <input
                  v-model.trim="formData.securityCode"
                  type="text"
                  name="securityCode"
                  id="securityCode"
                />
              </div>
              <div class="d-flex flex-column">
                <label class="mb-2" for="cardExpirationDate">Fecha de validez*</label>
                <input
                  v-model.trim="formData.cardExpirationDate"
                  type="text"
                  name="cardExpirationDate"
                  id="cardExpirationDate"
                  placeholder="12/06/2030"
                  disabled
                />
              </div>
            </div>
          </div>
          <label class="mb-2">Aeropuerto de origen :</label>
          <select class="mb-4" v-model="formData.airportIn" @change="setHours()">
            <optgroup>
              <template v-for="(airport, index) in availableAirportsOrigin">
                <option v-if="!airport.includes(props.cityName)" :value="airport" :key="index">
                  {{ airport }}
                </option>
              </template>
            </optgroup>
          </select>
          <label>Aeropuerto de destino :</label>
          <select class="mb-4" v-model="formData.airportOut" @change="setHours()">
            <optgroup>
              <option
                v-for="(airport, index) in availableAirportsDestination[props.cityName]"
                :value="airport"
                :key="index"
              >
                {{ airport }}
              </option>
            </optgroup>
          </select>
        </section>
        <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
          <button class="button fw-bold mt-3 px-1 py-2" @click="goBack(0)" type="button">
            VOLVER ATRÁS
          </button>
          <button class="button fw-bold mt-3 px-1 py-2" @click="modifyIndex(2)" type="button">
            SIGUIENTE
          </button>
        </section>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </template>
      <template v-if="currentIndex === 2">
        <h1 class="display-4 text-start mb-3">Resumen de la reserva</h1>
        <section class="d-flex flex-row gap-3 mb-3 w-100 flex-wrap">
          <p class="display-5">{{ props.experienceName }}</p>
          <img :src="`./images/${props.image}`" alt="Experience photo" class="rounded exp_photo" />
        </section>
        <section class="w-100 row">
          <div class="col-12 col-md-6">
            <section class="d-flex">
              <p>
                <b>Nombre Titular de la reserva: </b>{{ formData.name }} {{ formData.lastName }}
              </p>
            </section>
            <section class="d-flex">
              <p><b>DNI del titular: </b>{{ formData.dni }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Teléfono móvil: </b>{{ formData.phone }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Correo electrónico: </b>{{ formData.email }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Acompañantes: </b>{{ formData.numPeople }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Fechas reservadas: </b>{{ props.date }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Localidad: </b>{{ formData.location }}</p>
            </section>
            <section class="d-flex flex-column">
              <p><b>Dirección: </b>{{ formData.address }}</p>
            </section>
          </div>
          <div class="col-12 col-md-6">
            <section>
              <h3 class="text-start">
                IDA: <font-awesome-icon class="ms-2" icon="fa-solid fa-plane" />
              </h3>
              <p>
                <b>{{ selectedAirportIn }} - {{ props.cityName }}</b>
              </p>
              <p>
                Hora salida:
                {{ formData.partidaFirstDay }}
              </p>
              <p>
                Hora llegada:
                {{ formData.llegadaFirstDay }}
              </p>
            </section>
            <section>
              <h3 class="text-start">
                VUELTA: <font-awesome-icon class="ms-2 reverse" icon="fa-solid fa-plane" />
              </h3>
              <p>
                <b>{{ props.cityName }} - {{ selectedAirportIn }}</b>
              </p>
              <p>
                Hora salida:
                {{ formData.partidaLastDay }}
              </p>
              <p>
                Hora llegada:
                {{ formData.llegadaLastDay }}
              </p>
            </section>
          </div>
        </section>
        <section class="mt-5">
          <div class="d-flex flex-column gap-2 align-items-baseline">
            <div class="d-flex d-lg-block align-items-center mb-1">
              <input
                v-model="formData.checkbox"
                type="checkbox"
                name="confirm"
                id="confirm"
                class="me-2"
              />
              <label for="confirm" id="confirm">
                Acepto las condiciones de reserva de Rainbow Voyage.</label
              >
            </div>
            <div class="d-flex d-lg-block mb-4 align-items-center">
              <input
                v-model="formData.adult"
                type="checkbox"
                name="adult"
                id="adult"
                class="me-2"
              />
              <label for="adult" id="adult">
                Declaro que tanto el titular (yo) como los acompañantes han cumplido la mayoría de
                edad.</label
              >
            </div>
          </div>
        </section>
        <section class="d-flex flex-column align-items-center flex-sm-row gap-2 gap-sm-5">
          <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(1)" type="button">
            ATRÁS
          </button>
          <button class="button fw-bold mt-2 px-1 py-2" type="submit">FINALIZAR RESERVA</button>
        </section>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </template>
      <template v-else-if="currentIndex === 3">
        <section
          v-if="!loading"
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <p class="fw-bold fs-4">¡Reserva realizada con éxito!</p>
          <p class="text-center">Ya puedes consultar tu reserva en tu perfil.</p>
          <RouterLink to="/profile">
            <button class="button fw-bold mt-2 px-1 py-2" type="button">IR AL PERFIL</button>
          </RouterLink>
        </section>
        <section v-else-if="loading" class="d-flex justify-content-center">
          <ProgressSpinner></ProgressSpinner>
        </section>
      </template>
    </form>
  </main>
</template>

<style scoped>
@media screen and (max-width: 568px) {
  .confirm-modal-content {
    width: 95% !important;
  }

  .fa-xmark {
    top: 20px;
    left: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style scoped>
.reverse {
  transform: scaleX(-1);
}
main {
  background-color: rgba(171, 184, 195, 0.19);
  padding: 3rem;
}

form {
  display: flex;
  flex-direction: column;
  border: 2px solid #d90594;
  border-radius: 5px;
  width: 75%;
}

form input {
  border-radius: 5px;
  border: 2px solid #d90594;
  background: white;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

form input #placeholder {
  color: #d3d3d3;
}

button {
  color: white;
  margin: 0 auto;
  width: 70%;
}

.terms {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.register-box {
  background-color: white;
}
h1 {
  color: #d90594;
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
}

.button {
  border-radius: 5px;
  background-color: #d90594;
  border: none;
  transition: all 0.3s ease-in-out;
}

.number-box {
  border: 2px solid rgb(77, 77, 77);
  width: 60px;
  height: 60px;
}

.border-pink {
  border: 2px solid #d90594;
}

h2,
h3,
h4 {
  color: #d90594;
  text-align: center;
}
select {
  background-color: white;
  border: none;
  border: 2px solid #d90594;
}

button {
  min-width: max-content;
}

button:hover {
  color: #d90594;
  background-color: white;
  border: 1px solid #d90594;
  transform: scale(1.05, 1.05);
}

.pass-box {
  position: relative;
}

.eye-box {
  position: absolute;
  right: 0;
  top: 50%;
  cursor: pointer;
}

.logo-img {
  width: 30%;
}

.fa-xmark {
  font-size: x-large;
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.fa-xmark:hover {
  color: #d90594;
}

.exp_photo {
  min-width: 30%;
  width: 40%;
}

select {
  border-radius: 5px;
  height: 60px;
  padding: 5px;
}

@media screen and (max-width: 598px) {
  .exp_photo {
    min-width: 30%;
    width: 100%;
  }

  form {
    width: 100%;
  }

  main {
    padding: 10px;
  }
}
</style>
