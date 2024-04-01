<script setup lang="ts">
import { useDates } from '@/composables/useDates'
import ProgressSpinner from 'primevue/progressspinner'

const { monthsSelect, formData, checkAvailableDates, datesAvailable, isLoading } = useDates()
</script>
<template>
  <section class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex gap-1">
      <label for="months">Escoge el mes</label>
      <select name="months" id="months" v-model="formData.selectedMonth">
        <optgroup>
          <option v-for="month in monthsSelect" :value="month" :key="month">{{ month }}</option>
        </optgroup>
      </select>
    </div>
    <div>
      <label for="numPeople">Indica el número de personas </label>
      <select
        name="numPeople"
        id="numPeople"
        v-model="formData.numPeople"
        @change="checkAvailableDates"
      >
        <optgroup>
          <option v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :value="num" :key="num">
            {{ num }}
          </option>
        </optgroup>
      </select>
    </div>

    <div v-if="datesAvailable && datesAvailable.length > 0">
      <label for="numPeople">Fechas disponibles para {{ formData.selectedMonth }}</label>
      <select
        name="numPeople"
        id="numPeople"
        v-model="formData.numPeople"
        @change="checkAvailableDates"
      >
        <optgroup>
          <option v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :value="num" :key="num">
            {{ num }}
          </option>
        </optgroup>
      </select>
    </div>
    <div v-else-if="isLoading">
      Comprobando fechas para {{ formData.selectedMonth }}
      <template>
        <div class="card flex justify-content-center">
          <ProgressSpinner />
        </div>
      </template>
    </div>
    <div v-else>No hay fechas disponibles</div>
  </section>
</template>
<style scoped>
select {
  background-color: white;
  border: none;
  border: 2px solid #d90594;
}
</style>
