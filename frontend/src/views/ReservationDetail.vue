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
</script>
<template>
  <section v-if="!isLoadingDetail && !error && reservation">
    <h1>Detalle reserva</h1>
  </section>
  <section v-else-if="error" class="d-flex justify-content-center">
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
  </section>
  <section v-else-if="isLoadingDetail" class="d-flex justify-content-center">
    <ProgressSpinner></ProgressSpinner>
  </section>
</template>
<style scoped></style>
