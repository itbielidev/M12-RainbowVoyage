<template>
  <div class="container">
    <BreadCrumbs :items="items" class="p-5"></BreadCrumbs>
    <section v-if="!isLoadingDetail && !error && reservation">
      <div class="print-button-container">
        <button class="btn mt-4" @click="printPDF()">Imprimir PDF</button>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center mt-5 title-pdf">RESUMEN DE TU RESERVA</h1>
          <div class="text-center pasajero">
            <p class="fw-bolder">Nombre:</p>
            <p>{{ reservation?.name }}</p>
            <p class="fw-bolder">Apellidos:</p>
            <p>{{ reservation?.last_name }}</p>
            <p class="fw-bolder">DNI:</p>
            <p>{{ reservation?.dni }}</p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-12 col-sm-12 mt-4">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title rounded">Billetes de ida</h5>
              <p class="fw-bolder">Aeropuerto de salida:</p>
              <p class="card-text">{{ reservation?.airportIn }}</p>
              <p class="fw-bolder">Fecha</p>
              <p class="card-text">{{ reservation?.dates }}</p>
              <p class="fw-bolder">Hora:</p>
              <p>{{ reservation?.partidaFirstDay }}</p>
              <p class="fw-bolder">Puerta:</p>
              <p>{{ randomGate }}</p>
              <br />
              <p class="fw-bolder">Aeropuerto de llegada:</p>
              <p class="card-text">{{ reservation?.airportOut }}</p>
              <p class="fw-bolder">Fecha</p>
              <p class="card-text">{{ reservation?.dates }}</p>
              <p class="fw-bolder">Hora:</p>
              <p>{{ reservation?.llegadaFirstDay }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 mt-4">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title rounded">Billetes de vuelta</h5>
              <p class="fw-bolder">Aeropuerto de salida:</p>
              <p class="card-text">{{ reservation?.airportOut }}</p>
              <p class="fw-bolder">Fecha</p>
              <p class="card-text">{{ reservation?.dates }}</p>
              <p class="fw-bolder">Hora:</p>
              <p>{{ reservation?.partidaLastDay }}</p>
              <p class="fw-bolder">Puerta:</p>
              <p>{{ randomGate2 }}</p>
              <br />
              <p class="fw-bolder">Aeropuerto de llegada:</p>
              <p class="card-text">{{ reservation?.airportIn }}</p>
              <p class="fw-bolder">Fecha</p>
              <p class="card-text">{{ reservation?.dates }}</p>
              <p class="fw-bolder">Hora:</p>
              <p>{{ reservation?.llegadaLastDay }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card mt-4">
              <div class="card-body text-center">
                <!-- Primer icono -->
                <div class="icon-containerm">
                  <font-awesome-icon icon="fa-solid fa-location-dot" class="city" /><br />
                  <img
                    class="mt-4 rounded-5 experience"
                    :src="`/images/${reservation.experience?.city.images[0]}`"
                  />
                </div>
                <!-- Segundo icono -->
                <div class="icon-container">
                  <font-awesome-icon icon="fa-solid fa-route" class="routes" /><br />
                  <p class="rutas">{{ reservation.experience?.name }}</p>
                </div>
                <!-- Tercer icono -->
                <div class="icon-container">
                  <font-awesome-icon icon="fa-solid fa-hotel" class="hotel" /><br />
                  <img
                    class="mt-4 rounded-5 hotel"
                    :src="`/images/${reservation.experience?.city.name}/${reservation.experience?.images[7]}`"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/images/logo.webp" width="200px" class="img-fluid mx-auto d-block" />
    </section>
    <section v-else-if="error" class="d-flex justify-content-center">
      <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
    <section v-else-if="isLoadingDetail" class="d-flex justify-content-center">
      <ProgressSpinner></ProgressSpinner>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, defineProps } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useSeoMeta, type UseSeoMetaInput } from '@unhead/vue'
import html2pdf from 'html2pdf.js'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

const props = defineProps<{ reservationId: number }>()
const { getReservation, reservation, error, errorMessages, isLoadingDetail } = useReservations()

onMounted(async () => {
  await getReservation(props.reservationId)
})

const items = computed<any>(() => [
  { label: 'Página principal', route: '/' },
  {
    label: `Detalle reserva`
  }
])

useSeoMeta({
  title: `Rainbow Voyage | Detalle de reserva`,
  description: `Detalle con toda la información de la reserva que has realizado`,
  ogDescription: `Detalle con toda la información de la reserva que has realizado`,
  ogTitle: `Rainbow Voyage | Detalle de reserva`,
  ogImage: '/images/logo.webp'
})

const randomGate = computed(() => {
  const randomNumber = Math.floor(Math.random() * 5) + 1
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 5))
  return randomNumber + randomLetter
})

const randomGate2 = computed(() => {
  const randomNumber = Math.floor(Math.random() * 5) + 1
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 5))
  return randomNumber + randomLetter
})

const seoMeta = computed<UseSeoMetaInput>(() => {
  return {
    title: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    description: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${
      reservation.value?.user?.last_name || ''
    }`,
    ogDescription: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${
      reservation.value?.user?.last_name || ''
    }`,
    ogTitle: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    ogImage: '/images/logo.webp'
  }
})

useSeoMeta(seoMeta as UseSeoMetaInput)

const printPDF = () => {
  const element: any = document.querySelector('.container')

  if (element) {
    const contentToPrint: any = element.cloneNode(true)
    const printButton: any = contentToPrint.querySelector('.print-button-container')

    if (printButton) {
      printButton.remove()
    }

    const printButtonContainer: any = document.querySelector('.print-button-container')
    if (printButtonContainer) {
      printButtonContainer.style.display = 'none'
    }

    // Eliminar estilos, clases y elementos no deseados

    const contentWithoutStyles = document.createElement('div')
    contentWithoutStyles.appendChild(contentToPrint)

    // Mover el h1 más arriba
    const title: any = contentWithoutStyles.querySelector('.title-pdf')
    if (title) {
      title.style.marginTop = '-50px' // Ajusta el margen superior según tus necesidades
    }

    // Agregar salto de página antes del último recuadro
    const lastCard = contentWithoutStyles.querySelector('.container > .row:last-child')
    if (lastCard) {
      lastCard.insertAdjacentHTML('afterend', '<div style="page-break-before: always;"></div>')
    }

    const opt = {
      margin: 1,
      filename: 'confirmation_reserva.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf()
      .set(opt)
      .from(contentWithoutStyles.innerHTML)
      .save()
      .then(() => {
        if (printButtonContainer) {
          printButtonContainer.style.display = 'flex'
        }
      })
      .catch((error: any) => {
        console.error('Error al generar el PDF:', error)
        if (printButtonContainer) {
          printButtonContainer.style.display = 'flex'
        }
      })
  }
}
</script>

<style scoped>
button {
  border-radius: 50px;
  background-color: #d90594;
  color: white;
  text-align: center;
  font-weight: bold;
  justify-content: center;
}

.experience {
  max-height: 200px;
  width: auto;
}

.hotel {
  max-height: 200px;
  width: auto;
}
button:hover {
  background-color: white;
  border: 2px solid #d90594;
  color: black;
}
.print-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.rutas {
  font-size: 25px;
  font-weight: bolder;
  margin-top: 15px;
}
.hotel,
.routes,
.city {
  color: #d90594;
  font-size: 60px;
  margin-top: 15px;
}
.container {
  background-color: white;
  border-radius: 25px;
}

h1 {
  color: #d90594;
  font-size: 50px;
}

p {
  display: inline;
  margin-left: 15px;
}
.card-title {
  background-color: #d90594;
  color: white;
  width: 200px;
  text-align: center;
  padding: 10px;
}

.card {
  border: 2px solid #d90594;
}

@media screen and (min-width: 350px) and (max-width: 915px) {
  h1 {
    font-size: 30px;
  }
  .pasajero {
    font-size: 13px;
  }

  .hotel,
  .experience {
    width: 100%;
  }
}
</style>
