<template>
  <div class="body">
    <NavBar></NavBar>
    <section class="breadcrumbs-box container">
      <BreadCrumbs :items="items"></BreadCrumbs>
    </section>
    <div class="content">
      <h1>{{ experience?.city.name }}: {{ experience?.name }}</h1>
    </div>

    <div class="container mt-5 text-center">
      <div class="row">
        <div class="col-md-6">
          <p class="exp-description">{{ experience?.descriptions[1] }}</p>
        </div>

        <div class="col-md-6">
          <!-- Carrusel de Fotos -->
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div
                v-for="(h, index) in experience?.images.slice(7)"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img
                  :src="`/images/${experience?.city.name}/${h}`"
                  class="d-block w-100 img-carousel"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
                style="color: transparent"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
                style="color: transparent"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="container d-flex justify-content-center align-items-center">
          <div class="border rounded-5 pack">
            <div>
              <h4 class="text-center fw-bold">Tu pack incluye</h4>
              <ul class="text-center includes" style="list-style-type: none">
                <li
                  v-for="(inc, index) in experience?.descriptions.slice(-1)[0].split('.')"
                  :key="index"
                >
                  {{ inc }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--Rutas-->
        <div class="d-flex justify-content-evenly flex-wrap">
          <div
            v-for="(day, index) in experience?.days_descriptions"
            :key="index"
            class="d-flex justify-content-center"
          >
            <div class="circle">
              <div class="contenidoRutas">
                <p class="dia">DIA {{ index + 1 }}</p>
                <p class="info">{{ day }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="reserva d-none" type="submit">RESERVA</button>
    </div>
    <DatesForm class="my-5" :experienceId="props.experienceId" @reserve="openModal"></DatesForm>
    <div class="container">
      <div class="row justify-content-center align-items-center flex-wrap">
        <div
          v-for="(image, index) in experience?.images.slice(1, 7)"
          class="col-lg-4 col-md-6 col-xs-12 mb-2 text-center"
          :key="index"
        >
          <img
            v-if="image !== ''"
            :src="`/images/${experience?.city.name}/${image}`"
            class="img-fluid rounded imagenDetalle"
            :alt="`Experience photo ${index + 1}`"
          />
        </div>
      </div>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { computed, onMounted, ref } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import DatesForm from '@/components/DatesForm.vue'
import GoToReservationFormModal from '@/components/GoToReservationFormModal.vue'
import { useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

const { getExperience, experience } = useExperiences()
const router = useRouter()
const props = defineProps<{ experienceId: string }>()

const dateId = ref<number>(-1)
const date = ref<string>('')
const people = ref<string>('')

const items = computed<any>(() => [
  { label: 'Home', route: '/' },
  {
    label: `Experiencias de ${experience.value?.city.name}`,
    route: `/experiences/${experience.value?.city.name}`
  },
  { label: 'Detalle de la experiencia' }
])

onMounted(async () => {
  await getExperience(props.experienceId)
})

function openModal(selectedDateId: number, dateSelected: string, numPeople: string) {
  dateId.value = selectedDateId
  date.value = dateSelected
  people.value = numPeople
  open()
}

function goToReservationForm() {
  router.push({
    name: 'reservation',
    query: {
      experienceName: experience.value?.name,
      experienceId: props.experienceId,
      dateId: dateId.value,
      date: date.value,
      image: experience.value?.images[0],
      people: people.value,
      cityName: experience.value?.city.name
    }
  })
}

const { open, close } = useModal({
  component: GoToReservationFormModal,
  attrs: {
    onConfirm() {
      close()
      goToReservationForm()
    },
    onCancel() {
      close()
    }
  }
})
</script>

<style scoped>
.body {
  background-color: #f8f9fa;
}

.breadcrumbs-box {
  /* el margin-top tiene que estar a 9 rem sino se oculta detras del nav */
  margin-top: 9rem !important;
  background-color: #f8f9fa;
}

.imagenDetalle {
  width: 350px;
  height: 200px;
}

.fotos {
  margin-bottom: 10px;
}

main .content {
  background-color: black;
  padding: 20px;
}

h1 {
  color: white;
  text-align: center;
}

p {
  text-align: center;
  margin-top: 35px;
  font-size: 20px;
}

.img-carousel {
  height: 400px;
  /* Ajusta la altura deseada */
}

li {
  list-style-type: none;
  /* Quita los puntos de la lista */
  padding-left: 1em;
  /* Añade un poco de espacio a la izquierda para simular los puntos */
  position: relative;
}

/* Estilo para los puntos */
li::before {
  content: '\2022';
  color: #d90594;
  font-size: 1.2em;
  position: absolute;
  left: 0;
}

.pack {
  background-color: white;
  width: 35%;
}

h4 {
  margin-top: 10px;
}

.circle {
  width: 200px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.dia {
  color: #d90594;
  font-size: 20px;
  font-weight: bold;
}

p {
  font-size: 14px;
}

.reserva {
  text-align: center;
  background-color: #d90594;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  width: 225px;
  border: none;
  margin-top: 15px;
}

.info {
  margin-top: -15px;
}

.contenidoRutas {
  margin-top: -25px;
}

.container {
  margin-top: 15px;
}

h1 {
  color: white;
  text-align: center;
}

p {
  text-align: center;
  margin-top: 35px;
  font-size: 20px;
}

.img-carousel {
  height: 400px;
  /* Ajusta la altura deseada */
}

li {
  list-style-type: none;
  /* Quita los puntos de la lista */
  padding-left: 1em;
  /* Añade un poco de espacio a la izquierda para simular los puntos */
  position: relative;
}

/* Estilo para los puntos */
li::before {
  content: '\2022';
  color: #d90594;
  font-size: 1.2em;
  position: absolute;
  left: 0;
}

.pack {
  background-color: white;
  width: 35%;
}

h4 {
  margin-top: 10px;
}

.circle {
  width: 200px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.dia {
  color: #d90594;
  font-size: 20px;
  font-weight: bold;
}

p {
  font-size: 14px;
}

.reserva {
  background-color: #d90594;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  width: 225px;
  border: none;
  margin-top: 15px;
}

.info {
  margin-top: -15px;
}

.contenidoRutas {
  margin-top: -25px;
}

.container {
  margin-top: 15px;
}

.exp-description {
  line-height: 30px;
}

ul.includes li:last-child {
  display: none;
}
</style>
