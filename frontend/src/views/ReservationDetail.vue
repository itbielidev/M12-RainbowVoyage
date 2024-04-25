<template>
  <div class="background">
    <section v-if="!isLoadingDetail && !error && reservation">
      <div class="billete">
        <div class="encabezado">
          <div class="mover">
            <span>
              <font-awesome-icon icon="fa-solid fa-plane" class="plane" />
            </span>
            <p class="tituloBillete fw-bolder embarque">
              TARJETA DE EMBARQUE
            </p>
          </div>
        </div>
      </div>
      <div class="cuerpo">
        <div class="detalle-info">
          <div class="detalle-info-columna">
            <div class="billeteIda">
              <p class="fw-bolder">Aeropuerto de salida</p>
              <p>{{ reservation.airportIn }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Día</p>
              <p>{{ reservation.dates }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Hora</p>
              <p>{{ reservation.llegadaFirstDay }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Puerta</p>
              <p>{{ randomGate }}</p>
            </div>
          </div>
          <div class="detalle-info-columna">
            <div class="informacionPasajero">
              <div class="informaciónVuelo">
                <p class="fw-bolder">Nombre</p>
                <p>{{ reservation.name }}</p>
              </div>
              <div class="informaciónVuelo">
                <p class="fw-bolder">Apellidos</p>
                <p>{{ reservation.last_name }}</p>
              </div>
              <div class="informaciónVuelo">
                <p class="fw-bolder">DNI</p>
                <p>{{ reservation.dni }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="detalle-info">
          <div class="detalle-info-columna">
            <div class="billeteIda">
              <p class="fw-bolder">Aeropuerto de llegada</p>
              <p>{{ reservation.airportOut }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Día</p>
              <p>{{ reservation.dates }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Hora</p>
              <p>{{ reservation.llegadaFirstDay }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Puerta</p>
              <p>{{ randomGate }}</p>
            </div>
          </div>
        </div>
        <div class="vertical-line"></div>
      </div>
      <div class="billete">
        <div class="footer">
          <div class="mover">
            <span>
              <font-awesome-icon icon="fa-solid fa-plane" class="plane invertirAvion" />
            </span>
            <p class="tituloBillete fw-bolder embarque">
              TARJETA DE EMBARQUE
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!isLoadingDetail && !error && reservation" class="mt-4">
      <div class="billete">
        <div class="encabezado">
          <div class="mover">
            <span>
              <font-awesome-icon icon="fa-solid fa-plane" class="plane" />
            </span>
            <p class="tituloBillete fw-bolder embarque">
              TARJETA DE EMBARQUE
            </p>
          </div>
        </div>
      </div>
      <div class="cuerpo">
        <div class="detalle-info">
          <div class="detalle-info-columna">
            <div class="billeteIda">
              <p class="fw-bolder">Aeropuerto de salida</p>
              <p>{{ reservation.airportOut }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Día</p>
              <p>{{ reservation.dates }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Hora</p>
              <p>{{ reservation.llegadaLastDay }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Puerta</p>
              <p>{{ randomGate }}</p>
            </div>
          </div>
          <div class="detalle-info-columna">
            <div class="informacionPasajero">
              <div class="informaciónVuelo">
                <p class="fw-bolder">Nombre</p>
                <p>{{ reservation.name }}</p>
              </div>
              <div class="informaciónVuelo">
                <p class="fw-bolder">Apellidos</p>
                <p>{{ reservation.last_name }}</p>
              </div>
              <div class="informaciónVuelo">
                <p class="fw-bolder">DNI</p>
                <p>{{ reservation.dni }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="detalle-info">
          <div class="detalle-info-columna">
            <div class="billeteIda">
              <p class="fw-bolder">Aeropuerto de llegada</p>
              <p>{{ reservation.airportIn }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Día</p>
              <p>{{ reservation.dates }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Hora</p>
              <p>{{ reservation.llegadaLastDay }}</p>
            </div>
            <div class="informaciónVuelo">
              <p class="fw-bolder">Puerta</p>
              <p>{{ randomGate }}</p>
            </div>
          </div>
        </div>
        <div class="vertical-line"></div>
      </div>
      <div class="billete">
        <div class="footer">
          <div class="mover">
            <span>
              <font-awesome-icon icon="fa-solid fa-plane" class="plane invertirAvion" />
            </span>
            <p class="tituloBillete fw-bolder embarque">
              TARJETA DE EMBARQUE
            </p>
          </div>
        </div>
      </div>
      <div class="container mt-4">
        <div class="parte">
          <font-awesome-icon icon="fa-solid fa-location-dot" class="city"/>
          <!-- <img :src="`/images/${reservation.experience?.city.images[0]}/reservation.experience?.images[7]`" alt=""> -->
        </div>
        <div class="parte">
          <font-awesome-icon icon="fa-solid fa-route" class="routes"/>
          <p>{{ reservation.experience?.name }}</p>
        </div>
        <div class="parte">
          <font-awesome-icon icon="fa-solid fa-hotel" class="hotel"/>
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
import { computed, onMounted, defineProps } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useSeoMeta, type UseSeoMetaInput } from '@unhead/vue'
import jsPDF from 'jspdf'

const props = defineProps<{ reservationId: number }>()
const { getReservation, reservation, error, errorMessages, isLoadingDetail } = useReservations()

onMounted(async () => {
  await getReservation(props.reservationId)
})

const randomGate = computed(() => {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 5));
  return randomNumber + randomLetter;
});

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
</script>

<style scoped>
.container{
  background-color: white;
  border-radius: 50px;
  border-color: #D90594;
}

.background {
  background-color: rgba(171, 184, 195, 0.19);
  padding: 20px;
}

.cuerpo {
  background-color: white;
  margin-top: -12px;
  padding: 20px;
  /* Agregar espacio interno */
  position: relative;
  /* Agregar posición relativa */
}

.billete,
.cuerpo {
  margin-left: 100px;
  /* Ajustar el margen izquierdo */
  margin-right: 100px;
  /* Ajustar el margen derecho */
}

.embarque {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 20px;
  margin-top: 10px;
  color: white;
}

.mover {
  margin-left: 80px;
}

.span {
  display: inline-block;
  vertical-align: middle;
}

.plane {
  color: white;
  font-size: 25px;
}

.hotel, .routes, .city{
  color: #D90594;
  font-size: 60px
}

.invertirAvion {
  transform: scaleX(-1);
}

.encabezado {
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #D90594;
  width: 100%;
  height: 60px;
}

.footer {
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: #D90594;
  width: 100%;
  height: 60px;
  text-align: end;
}


.detalle-info {
  display: flex;
  justify-content: space-between;
  /* Alinea las columnas al inicio y al final */
  gap: 30px;
  text-align: center;
  margin-right: 250px;
}

.detalle-info-columna {
  display: flex;
}

.billeteIda p,
.informaciónVuelo p {
  margin-left: 10px;
}

.vertical-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  width: 25px;
  background-color: #D90594;
  transform: translateX(-50%);
}

.informacionPasajero {
  display: flex;
}

.mover {
  margin-right: 80px;
}

.container {
  display: flex;
  justify-content: space-around;
}

.parte {
  text-align: center;
}
</style>
