<template>
  <div class="body">
    <NavBar></NavBar>
    <div class="content">
      <h1>¡Bienvenido a Axel Hotel Barcelona, Tu Destino en Barcelona!</h1>
    </div>
    <div class="container mt-5 text-center">
      <div class="row">
        <div class="col-md-6">
          <p>
            ¡Axel Hotel Barcelona, tu oasis de estilo, confort y diversión en el corazón de
            Barcelona!
          </p>
          <p>
            Nuestro hotel, ubicado en el emblemático barrio del Eixample, es mucho más que un lugar
            para alojarse; ¡es un destino en sí mismo! Con un enfoque único en la comunidad LGBTQ+,
            cada detalle refleja nuestra calidez y modernidad.
          </p>
          <p>
            Disfruta de lujosas habitaciones y suites, sumérgete en nuestra piscina en la azotea con
            vistas impresionantes, y explora la rica cultura y vida nocturna de Barcelona.
          </p>
          <p>
            ¡Estamos aquí para hacer que tu estancia sea inolvidable, ya sea por negocios o por
            placer! ¡Únete a nosotros y descubre por qué somos un destino vibrante para todos!
          </p>
        </div>
        <div class="col-md-6">
          <!-- Carrusel de Fotos -->
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="../../public/images/detalleBarcelona/hotel.webp"
                  class="d-block w-100 img-carousel"
                  alt="Slide 1"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/images/detalleBarcelona/habitación.webp"
                  class="d-block w-100 img-carousel"
                  alt="Slide 2"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/images/detalleBarcelona/copas.webp"
                  class="d-block w-100 img-carousel"
                  alt="Slide 3"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/images/detalleBarcelona/piscina.webp"
                  class="d-block w-100 img-carousel"
                  alt="Slide 3"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="../../public/images/detalleBarcelona/spa.webp"
                  class="d-block w-100 img-carousel"
                  alt="Slide 3"
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
              <ul class="text-center" style="list-style-type: none">
                <li>Asistencia a la llegada</li>
                <li>4 noches</li>
                <li>Todo incluido</li>
                <li>Teléfono de emergencias 24h/365días.</li>
                <li>
                  REGALO:
                  <ul style="list-style-type: none">
                    <li>1 día de SPA</li>
                  </ul>
                </li>
                <li>Rutas</li>
              </ul>
            </div>
          </div>
        </div>
        <!--Rutas-->
        <div class="d-flex justify-content-center">
          <div class="circle">
            <div class="contenidoRutas">
              <p class="dia">DIA 1</p>
              <p class="info">Casa Batlló visita guida de 16:30-18:00</p>
            </div>
          </div>
          <div class="circle">
            <div class="contenidoRutas">
              <p class="dia">DIA 2</p>
              <p class="info">Sagrada Familia visita guiada de 9:30-11:00</p>
            </div>
          </div>
          <div class="circle">
            <div class="contenidoRutas">
              <p class="dia">DIA 3</p>
              <p class="info">Excursión a Montserrat de 9:00-18:00</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="circle">
            <div class="contenidoRutas">
              <p class="dia">DIA 4</p>
              <p class="info">Parc Güell viista guiada de 12:30-14:00</p>
            </div>
          </div>
          <div class="circle">
            <div class="contenidoRutas">
              <p class="dia">DIA 5</p>
              <p class="info">La Pedrera visita guiada de 15:00-17:00</p>
              <p class="info">Paseo por la Ciutadella</p>
            </div>
          </div>
        </div>
      </div>
      <button class="reserva d-none" type="submit">RESERVA</button>
    </div>
    <DatesForm class="my-5" :experienceId="props.experienceId" @reserve="openModal"></DatesForm>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted, ref } from 'vue'
import { useExperiences } from '@/composables/useExperiences'
import DatesForm from '@/components/DatesForm.vue'
import GoToReservationFormModal from '@/components/GoToReservationFormModal.vue'
import { useModal } from 'vue-final-modal'
import { useRouter } from 'vue-router'

const { getExperience, experience } = useExperiences()
const router = useRouter()
const props = defineProps<{ experienceId: string }>()

const dateId = ref<number>(-1)
const date = ref<string>('')
const people = ref<string>('')

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
      people: people.value
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
  background-color: rgba(171, 184, 195, 0.19);
}

.content {
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
</style>
