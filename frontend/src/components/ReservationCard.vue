<script setup lang="ts">
import { useDates } from '@/composables/useDates'
import type { Reservation } from '@/types'

const props = defineProps<{
  reservation: Reservation
}>()

const { formatDateYear } = useDates()
</script>
<template>
  <article class="w-100">
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
        <p><b>Titular:</b> {{ reservation.name }} {{ reservation.last_name }}</p>
        <p><b>Email:</b> {{ reservation.reservation_email }}</p>
        <p><b>Realizada el:</b> {{ formatDateYear(reservation.date_creation) }}</p>
        <div class="d-flex flex-column gap-5 flex-lg-row dates-price-box fw-bold">
          <p>{{ reservation.dates }}</p>
          <p>{{ reservation.experience?.price }}€</p>
        </div>
      </div>
    </main>
    <footer class="text-start text-lg-end px-3 py-2">
      <button class="button">Confirmar <font-awesome-icon icon="fa-solid fa-envelope" /></button>
    </footer>
  </article>
</template>
<style scoped>
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
