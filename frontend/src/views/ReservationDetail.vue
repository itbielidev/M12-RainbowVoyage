<template>
  <div class="background">
    <section v-if="!isLoadingDetail && !error && reservation">
      <h1 class="text-center text-white">Detalle reserva</h1>
      <div class="billete">
        <div class="encabezado">
          <span>
            <font-awesome-icon icon="fa-solid fa-plane plane"/>
          </span>
          <p class="tituloBillete fw-bolder embarque">
            TARJETA DE EMBARQUE
          </p>
        </div>
      </div>
      <div class="cuerpo">
        <div class="billeteIda">
          <p>Aeropuerto de salida</p>
          <p>{{ reservation.airportIn }}</p>

          <p>Día</p>
          <p>{{ reservation.dates }}</p>

          <p>Hora</p>
          <p>{{ reservation.llegadaFirstDay }}</p>

          <p>Puerta</p>
          <p>4A</p>
        </div>

        <hr class="vertical-line">
        
        <div class="billeteIda">
          <p>Aeropuerto de salida</p>
          <p>{{ reservation.airportIn }}</p>

          <p>Día</p>
          <p>{{ reservation.dates }}</p>

          <p>Hora</p>
          <p>{{ reservation.llegadaFirstDay }}</p>

          <p>Puerta</p>
          <p>4A</p>
        </div>
      </div>
      <div class="billete">
        <div class="encabezado">
          <span>
            <font-awesome-icon icon="fa-solid fa-plane plane"/>
          </span>
        </div>
      </div>
    </section>
    <section v-else-if="error" class="d-flex justify-content-center">
      <ErrorMessages :messages="errorMessages"></ErrorMessages>
    </section>
    <section v-else-if="isLoadingDetail" class="d-flex justify-content-center">
      <ProgressSpinner></ProgressSpinner>
    </section>
    <img src="../../public/images/logo.webp" width="200px" class="img-fluid mx-auto d-block">
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useSeoMeta, type UseSeoMetaInput } from '@unhead/vue'
import jsPDF from 'jspdf'

const props = defineProps<{ reservationId: number }>()
const { getReservation, reservation, error, errorMessages, isLoadingDetail } = useReservations()

onMounted(async () => {
  await getReservation(props.reservationId)
  generatePDF()
})

const seoMeta = computed<UseSeoMetaInput>(() => {
  return {
    title: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    description: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${reservation.value?.user?.last_name || ''}`,
    ogDescription: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${reservation.value?.user?.last_name || ''}`,
    ogTitle: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    ogImage: '/images/logo.webp'
  }
})

useSeoMeta(seoMeta as UseSeoMetaInput)

const generatePDF = () => {
  if (reservation.value) {
    const doc = new jsPDF()
    doc.text(`Detalle de la reserva: ${reservation.value.id}`, 10, 10)
    doc.text(`Aeropuerto de salida: ${reservation.value.airportIn}`, 10, 20)
    doc.text(`Aeropuerto de llegada: ${reservation.value.airportOut}`, 10, 30)
    
    // Agregar línea vertical rosa
    doc.setLineWidth(1)
    doc.setDrawColor(217, 5, 148) // Color rosa
    doc.line(100, 40, 100, 160) // Coordenadas de la línea vertical
    
    doc.save('detalle_reserva.pdf')
  }
}
</script>

<style scoped>
.cuerpo{
  background-color: white;
  margin-top: -12px;
  height: 250px;
}

.background {
  background-color: rgba(171, 184, 195, 0.19);
}

h1{
  background-color: black;
}

.billete, .cuerpo {
  margin-left: 450px;
  margin-right: 450px;
  height: 50px;
}

.embarque{
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}

span{
  display: inline-block; 
  vertical-align: middle;
}

.plane{
  background-color: #ffffff;
}

.encabezado{
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #D90594;
  width: 100%;
}

.vertical-line {
  background-color:#D90594; 
  height: 120px; /* Altura de la línea */
  width: 20px;
}

.billeteIda{
  display: inline-block;
}
</style>
