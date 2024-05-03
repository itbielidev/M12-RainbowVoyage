<template>
  <div class="background">
    <section v-if="!isLoadingDetail && !error && reservation">
      <div class="print-button-container">
        <button class="btn mt-4" @click="printPDF()">Imprimir PDF</button>
      </div>
      <div class="cuerpo">
        <div class="header">
          <h1>RESERVA</h1>
        </div>
        <div class="alinear">
          <h3>Billetes de ida</h3>
          <div class="informacion text-center">
            <p class="fw-bolder">Nombre:</p>
            <p>{{ reservation.name }}</p>
            <p class="fw-bolder">Apellidos:</p>
            <p>{{ reservation.name }}</p>
            <p class="fw-bolder">DNI:</p>
            <p>{{ reservation.name }}</p>
          </div>
          <div class="informacion">
            <p class="fw-bolder">Aeropuerto de salida:</p>
            <p>{{ reservation.airportIn }}</p>
            <p class="fw-bolder">Fecha:</p>
            <p>{{ reservation.dates }}</p>
            <p class="fw-bolder">Hora:</p>
            <p>{{ reservation.partidaFirstDay }}</p>
            <p class="fw-bolder">Puerta:</p>
            <p>{{ randomGate }}</p>
          </div>
          <div class="informacion">
            <p class="fw-bolder">Aeropuerto de llegada:</p>
            <p>{{ reservation.airportOut }}</p>
            <p class="fw-bolder">Fecha:</p>
            <p>{{ reservation.dates }}</p>
            <p class="fw-bolder">Hora:</p>
            <p>{{ reservation.llegadaFirstDay }}</p>
          </div>

          <h3>Billetes de vuelta</h3>
          <div class="informacion text-center">
            <p class="fw-bolder">Nombre:</p>
            <p>{{ reservation.name }}</p>
            <p class="fw-bolder">Apellidos:</p>
            <p>{{ reservation.name }}</p>
            <p class="fw-bolder">DNI:</p>
            <p>{{ reservation.name }}</p>
          </div>
          <div class="informacion">
            <p class="fw-bolder">Aeropuerto de salida:</p>
            <p>{{ reservation.airportIn }}</p>
            <p class="fw-bolder">Fecha:</p>
            <p>{{ reservation.dates }}</p>
            <p class="fw-bolder">Hora:</p>
            <p>{{ reservation.partidaLastDay }}</p>
            <p class="fw-bolder">Puerta:</p>
            <p>{{ randomGate2 }}</p>
          </div>
          <div class="informacion">
            <p class="fw-bolder">Aeropuerto de llegada:</p>
            <p>{{ reservation.airportOut }}</p>
            <p class="fw-bolder">Fecha:</p>
            <p>{{ reservation.dates }}</p>
            <p class="fw-bolder">Hora:</p>
            <p>{{ reservation.llegadaLastDay }}</p>
          </div>
          <div class="mt-3 d-flex justify-content-around fotos">
            <div class="parte col-lg-4 col-md-4 col-xs-12">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="city" /><br />
              <img
                class="mt-4 rounded-5"
                :style="{ maxHeight: '200px', width: 'auto' }"
                :src="`/images/${reservation.experience?.city.images[0]}`"
              />
            </div>
            <div class="parte col-lg-4 col-md-4 col-xs-12">
              <font-awesome-icon icon="fa-solid fa-route" class="routes" /><br />
              <p class="rutas">{{ reservation.experience?.name }}</p>
            </div>
            <div class="parte col-lg-4 col-md-4 col-xs-12">
              <font-awesome-icon icon="fa-solid fa-hotel" class="hotel" /><br />
              <img
                class="mt-4 rounded-5"
                :style="{ maxHeight: '200px', width: 'auto' }"
                :src="`/images/${reservation.experience?.city.name}/${reservation.experience?.images[7]}`"
              />
            </div>
          </div>
        </div>
        <img src="../../public/images/logo.webp" width="200px" class="img-fluid mx-auto d-block" />
      </div>
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

const props = defineProps<{ reservationId: number }>()
const { getReservation, reservation, error, errorMessages, isLoadingDetail } = useReservations()

onMounted(async () => {
  await getReservation(props.reservationId)
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
  const element = document.querySelector('.background')

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

    const opt = {
      margin: 1,
      filename: 'confirmation_reserva.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf()
      .set(opt)
      .from(contentToPrint.innerHTML)
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
.alinear {
  margin-left: 25px;
  margin-top: 25px;
}
.rutas {
  font-size: 25px;
  font-weight: bolder;
  margin-top: 90px;
}
.parte {
  text-align: center; /* Para centrar el contenido de cada parte */
}
.fotos {
  margin-bottom: 15px;
}
.cuerpo {
  background-color: white;
  border-radius: 25px;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
}
.header {
  background-color: #d90594;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
}
h1 {
  color: white;
  text-align: center;
  padding: 10px;
  margin: 0;
}
button {
  border-radius: 50px;
  background-color: #d90594;
  color: white;
  text-align: center;
  font-weight: bold;
  justify-content: center;
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
.informacion p {
  display: inline-block;
  margin-right: 10px;
}
.hotel,
.routes,
.city {
  color: #d90594;
  font-size: 60px;
}
</style>
