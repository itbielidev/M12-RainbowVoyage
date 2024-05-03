<template>
  <div v-if="!error && !isLoading" class="container">
    <div class="row">
      <div
        v-for="(city, index) in hoveredCities"
        :key="index"
        class="col-md-6 mb-3 position-relative text-center city"
        style="overflow: hidden"
      >
        <RouterLink :to="{ name: 'experiences', params: { cityName: city.name } }">
          <div class="image-container">
            <img
              :src="`/images/${city.images[0]}`"
              class="img-fluid imgCities"
              alt="City photo"
              @mouseover="hoverCity(index, true)"
              @mouseout="hoverCity(index, false)"
            />
            <div class="overlay">
              <p>{{ city.description }}</p>
            </div>
            <div class="text-container">
              <p class="m-0 fw-bolder text">{{ city.name }}</p>
            </div>
          </div>
          <RouterLink :to="{ name: 'experiences', params: { cityName: city.name } }">
            <button class="btn btn-lg mt-3">
              Visitar {{ city.name }}
              <font-awesome-icon icon="ms-1 fa-solid fa-arrow-up-right-from-square" />
            </button>
          </RouterLink>
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center" v-else-if="error">
    <ErrorMessages :messages="errorMessages"></ErrorMessages>
  </div>
  <div v-else-if="isLoading" class="d-flex justify-content-center">
    <ProgressSpinner></ProgressSpinner>
  </div>
</template>

<script setup lang="ts">
import { useCitiesStore } from '@/stores/cities'
import { storeToRefs } from 'pinia'
import ErrorMessages from './ErrorMessages.vue'
import ProgressSpinner from 'primevue/progressspinner'

const { hoveredCities, error, errorMessages, isLoading } = storeToRefs(useCitiesStore())

const hoverCity = (index: number, hovered: boolean) => {
  //hoveredCities[index]?.hovered = hovered
}
</script>

<style scoped>
.btn {
  background-color: rgba(217, 5, 148, 1);
  color: white;
  margin-bottom: 10px;
  border-radius: 12px;
  width: max-content;
  padding: 0.6rem 1rem;
}

.btn:hover {
  background-color: rgb(234, 96, 188);
  color: white;
}

.image-container {
  position: relative;
  width: 100%;
}

.text {
  text-transform: uppercase;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50px;
}

.overlay p {
  color: white;
  font-size: 18px;
  text-align: center;
  padding: 20px;
}

.col-md-6:hover .overlay {
  opacity: 1;
}

.col-md-6:hover .text-container {
  display: none;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.column {
  flex: 1;
  padding: 10px;
}

.center {
  justify-content: center;
}

.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: black;
}

.imgCities {
  width: 100%;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.col-md-6:hover .overlay {
  opacity: 1;
}
</style>
