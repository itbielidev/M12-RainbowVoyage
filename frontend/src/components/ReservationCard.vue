<script setup lang="ts">
import { useDates } from '@/composables/useDates'
import type { Reservation } from '@/types'
import { useReservations } from '@/composables/useReservations'
import { ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import ErrorMessages from '@/components/ErrorMessages.vue'

const props = defineProps<{
  reservation: Reservation
}>()

const emit = defineEmits<{
  refresh: []
}>()

const loading = ref<boolean>(false)

const { formatDateYear } = useDates()

const { sendEmail, error, errorMessages } = useReservations()

const manageEmailSending = async (reservationId: number) => {
  loading.value = true
  await sendEmail(reservationId)
  //set fake loading spinner
  setTimeout(() => {
    loading.value = false
  }, 2500)
  //emit to refresh reservations view
  emit('refresh')
}
</script>
<template>
  <article class="w-100 position">
    <main class="content d-flex flex-column flex-md-row gap-3 w-100 p-3">
      <div class="w-25 img-box">
        <img
          :src="`/images/${reservation.experience?.images[0]}`"
          alt="Reservation Photo"
          class="img-fluid rounded"
        />
      </div>
      <div class="w-75 info-box">
        <h3 class="fw-bold">{{ reservation.experience?.name }}</h3>
        <p class="fs-5"><b>Titular:</b> {{ reservation.name }} {{ reservation.last_name }}</p>
        <p class="fs-5"><b>Email:</b> {{ reservation.reservation_email }}</p>
        <p class="fs-5"><b>Realizada el:</b> {{ formatDateYear(reservation.date_creation) }}</p>
        <div
          class="d-flex flex-column gap-1 flex-lg-row fw-bold align-items-start align-items-lg-center"
        >
          <p class="fs-5">Fechas: {{ reservation.dates }}</p>
          <p class="ms-lg-5 me-auto dates-price-box">{{ reservation.experience?.price }}€</p>
          <div class="text-start text-lg-end">
            <button
              v-if="!loading && reservation.state !== 'completed'"
              class="btn"
              @click="manageEmailSending(props.reservation.id)"
            >
              Confirmar <font-awesome-icon icon="fa-solid fa-envelope" />
            </button>
            <div v-else-if="loading" class="d-flex justify-content-center">
              <ProgressSpinner></ProgressSpinner>
            </div>
            <div v-else-if="error" class="d-flex justify-content-center">
              <ErrorMessages :messages="errorMessages"></ErrorMessages>
            </div>
            <RouterLink
              :to="{ name: 'reservationDetail', params: { reservationId: reservation.id } }"
              class="btn ms-md-2"
            >
              Ver detalle <font-awesome-icon icon="fa-solid fa-file" />
            </RouterLink>
            <!-- <button class="btn ms-md-2">
              Ver detalle <font-awesome-icon icon="fa-solid fa-file" />
            </button> -->
          </div>
        </div>
      </div>
    </main>
  </article>
</template>
<style scoped>
.btn {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 12px;
  width: max-content;
  padding: 0.6rem 1rem;
}
article {
  font-family: 'Roboto', sans-serif;
  border: 2px solid rgb(217, 5, 148);
  border-radius: 10px;
}

.dates-price-box {
  color: rgb(217, 5, 148);
  font-family: 'Roboto Slab', serif;
  font-size: xx-large;
}

.button {
  font-family: 'Roboto Slab', serif;
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  width: max-content;
  font-size: 24px;
}

@media screen and (max-width: 568px) {
  .img-box,
  .info-box {
    width: 100%;
  }
}
</style>
