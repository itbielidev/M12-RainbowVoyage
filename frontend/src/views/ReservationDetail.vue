<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { useSeoMeta, type UseSeoMetaInput } from '@unhead/vue'

const props = defineProps<{ reservationId: number }>()
const { getReservation, reservation, error, errorMessages, isLoadingDetail } = useReservations()

onMounted(async () => {
  await getReservation(props.reservationId)
})

const seoMeta = computed<UseSeoMetaInput>(() => {
  return {
    title: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    description: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${reservation.value?.user?.last_name || ''
      }`,
    ogDescription: `Detalle de la reserva realizada por ${reservation.value?.user?.name || ''} ${reservation.value?.user?.last_name || ''
      }`,
    ogTitle: `Rainbow Voyage | Detalle Reserva ${reservation.value?.id || ''} `,
    ogImage: '/images/logo.webp'
  }
})

useSeoMeta(seoMeta as UseSeoMetaInput)
</script>

<template>
  <div class="background">
    <section v-if="!isLoadingDetail && !error && reservation">
      <h1 class="text-center">Detalle reserva</h1>
      <div class="billete">
        <span style="display: inline-block; vertical-align: middle;">
          <font-awesome-icon icon="fa-solid fa-plane" style="color: #ffffff;" />
        </span>
        <p class="tituloBillete fw-bolder" style="display: inline-block; vertical-align: middle; margin-left: 10px;">
          TARJETA DE EMBARQUE</p>
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

<style scoped>
.background {
  background-color: rgba(171, 184, 195, 0.19);
}

.billete {
  background-color: white;
  border-radius: 50px;
  margin-left: 450px;
  margin-right: 450px;
}
</style>
