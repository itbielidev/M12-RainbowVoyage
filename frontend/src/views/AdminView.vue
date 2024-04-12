<script setup lang="ts">
import InputText from 'primevue/inputtext'
import ReservationCard from '@/components/ReservationCard.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReservations } from '@/composables/useReservations'

const route = useRoute()
const router = useRouter()

const { getReservations, reservations, errorMessages, error } = useReservations()

const name = ref<string>('')

const query = ref({
  name: '',
  ...route.query
})

watch(
  query,
  async () => {
    await getData()
    router.push({ query: query.value })
  },
  { deep: true }
)

async function getData() {
  const qs = new URLSearchParams(query.value).toString()
  await getReservations(qs)
}

onMounted(async () => await getData())
</script>
<template>
  <nav
    class="w-100 d-flex flex-column gap-3 flex-xs-column flex-lg-row align-items-center justify-content-start mb-5"
  >
    <div class="text-center w-25">
      <img src="/images/logo.png" alt="Logo" class="logo" />
    </div>
    <div
      class="text-center w-50 d-flex justify-content-center justify-content-xs-center justify-content-lg-start"
    >
      <InputText
        type="text"
        v-model.trim="query.name"
        placeholder="Buscar por nombre de titular"
        @change="getData()"
      ></InputText>
    </div>
    <div class="text-center d-flex justify-content-center w-25 justify-self-end m-auto">
      <input type="button" class="button" value="Cerrar sesión" />
    </div>
  </nav>

  <!-- Mobile Menu-->
  <section class="d-flex d-xs-flex d-md-none w-100 fixed-bottom p-1 mobile-menu">
    <ul>
      <input type="button" class="button" value="Reservas" />
    </ul>
  </section>
  <main class="d-flex gap-3 flex-column flex-lg-row">
    <!-- Desktop Menu-->
    <section class="d-none d-lg-flex tabs-menu w-25 p-5">
      <ul>
        <input type="button" class="button" value="Reservas" />
      </ul>
    </section>
    <!-- Tablet Menu-->
    <section class="w-100 d-none d-md-flex d-lg-none align-items-center tablet-menu">
      <ul class="w-100 d-flex justify-space-around mt-auto align-items-center">
        <input type="button" class="button" value="Reservas" />
      </ul>
    </section>
    <section class="reservations-section px-4 d-flex flex-column py-3">
      <h2 class="fw-bold">Reservas recientes</h2>
      <!-- TO-DO: For loop-->

      <ReservationCard></ReservationCard>
    </section>
  </main>
</template>

<style scoped>
.tablet-menu,
.mobile-menu {
  background-color: #f4f8fb;
}
main{
  background-color: rgba(171, 184, 195, 0.19);
}
.reservations-section,
.tabs-menu {
  background-color: #f4f8fb;
  border-radius: 10px;
}

.tabs-menu {
  height: 25vh;
}

.reservations-section {
  width: 75%;
}

ul {
  list-style-type: none;
  padding: 0;
}

.logo {
  width: 180px;
  height: auto;
}

.button {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 10px;
  width: max-content;
  font-size: 24px;
}

@media screen and (max-width: 991px) {
  .reservations-section {
    width: 100%;
  }
}
</style>
<style>
.p-inputtext {
  width: 50%;
}

.p-inputtext:enabled:focus {
  outline: 1px solid black;
  outline-offset: -1px;
  box-shadow: none;
  border-color: #94a3b8;
}

@media screen and (max-width: 868px) {
  .p-inputtext {
    width: 100%;
  }
}
</style>
