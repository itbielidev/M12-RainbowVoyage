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
import { useSeoMeta } from '@unhead/vue'

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
  {
    label: 'Detalle de la experiencia',
    route: `/experiences/${experience.value?.city.name}/experienceDetail/${experience.value?.id}`
  }
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

useSeoMeta({
  title: `Rainbow Voyage | Detalle de la experiencia.`,
  description: `Detalle de la experiencia`,
  ogDescription: `Detalle de la experiencia`,
  ogTitle: `Rainbow Voyage | Detalle de la experiencia`,
  ogImage: '/images/logo.webp'
})
</script>

<template>
  <div class="body">
    <NavBar></NavBar>
    <div class="container">
      <h1 class="py-2 px-3">{{ experience?.city.name }}: {{ experience?.name }}</h1>
      <section class="breadcrumbs-box">
        <BreadCrumbs :items="items"></BreadCrumbs>
      </section>
      <div class="row">
        <!-- Texto a la izquierda -->
        <div class="col-md-6">
          <p class="exp-description fs-5">{{ experience?.descriptions[1] }}</p>
        </div>
        <!-- Carrusel de fotos a la derecha -->
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
      </div>
      <div class="d-flex justify-content-center align-items-center mt-4">
        <div class="rounded-5 pack">
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
      <div class="d-flex justify-content-evenly flex-wrap mt-4">
        <div
          v-for="(day, index) in experience?.days_descriptions"
          :key="index"
          class="d-flex justify-content-center"
        >
          <div class="contenidos">
            <div class="contenidoRutas">
              <p class="dia">DIA {{ index + 1 }}</p>
              <p class="info">{{ day }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="reserva d-none" type="submit">RESERVA</button>
    <div class="fechasReservas">
      <DatesForm
        class="my-5 mt-5"
        :experienceId="props.experienceId"
        @reserve="openModal"
      ></DatesForm>
    </div>
    <div class="container mt-4">
      <div class="row justify-content-center align-items-center flex-wrap">
        <div
          v-for="(image, index) in experience?.images.slice(1, 7)"
          class="col-lg-4 col-md-6 col-xs-12 mb-2 text-center"
          :key="index"
        >
          <img
            v-if="image !== ''"
            :src="`/images/${experience?.city.name}/${image}`"
            class="img-fluid imagenDetalle"
            :alt="`Experience photo ${index + 1}`"
          />
        </div>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<style scoped>
h1 {
  color: white;
  background-color: black;
  text-align: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}

.exp-description {
  text-align: justify;
}

.img-carousel {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 50px;
}

h4 {
  margin-top: 10px;
  color: #d90594;
  font-size: 30px;
}

.pack {
  background-color: white;
  width: 35%;
  border: 2px solid #d90594;
  border-radius: 50px;
}

.dia {
  color: #d90594;
  font-size: 30px;
  font-weight: bold;
}

.contenidoRutas {
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
}

.contenidos {
  background-color: white;
  margin: 10px;
  display: flex;
  width: 200px;
  justify-content: center;
  border-radius: 50px;
  align-items: center;
  margin-top: 50px;
  border: 2px solid #d90594;
}

.info {
  margin-top: -15px;
}

p {
  font-size: 14px;
}

.imagenDetalle {
  width: 350px;
  height: 200px;
  box-shadow: 0 6px 35px rgba(0, 0, 0, 0.1) !important;
  margin-bottom: 60px;
  border-radius: 50px;
}

.fechasReservas {
  background-color: white;
  justify-content: center;
  border: 2px solid #d90594;
  border-radius: 50px;
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
}

@media screen and (max-width: 768px) {
  .fechasReservas {
    width: 95%;
  }
}

@media screen and (min-width: 350px) and (max-width: 915px) {
  h1 {
    font-size: 25px; /* Tamaño de fuente para pantallas dentro del rango */
  }
  .exp-description,
  .img-carousel {
    margin-left: 15px;
    margin-right: 15px;
  }

  .pack {
    width: 100%;
  }
}
</style>
