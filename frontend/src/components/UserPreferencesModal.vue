<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const {
  num_people_max,
  num_people_min,
  duration_max,
  duration_min,
  type,
  price_min,
  price_max,
  updatePreferences
} = useAuthStore()

const { formData } = storeToRefs(useAuthStore())

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm', data: any): void
}>()

const update = async () => {
  await updatePreferences()
  await emit('confirm', formData)
}

const checkConstraints = (min: string, max: string, tag: string) => {
  if (Number(min) > Number(max) || Number(max) < Number(min)) {
    switch (tag) {
      case 'price':
        formData.value.price_min = formData.value.price_max
        break
      case 'num_people':
        formData.value.num_people_min = formData.value.num_people_max
        break
      case 'duration':
        formData.value.duration_min = formData.value.duration_max
        break
    }
  }
}

onMounted(() => {
  //Set user preferences
  formData.value.duration_max = duration_max || '1'
  formData.value.duration_min = duration_min || '1'
  formData.value.num_people_max = num_people_max || '1'
  formData.value.num_people_min = num_people_min || '1'
  formData.value.type = type || 'all'
  formData.value.price_max = price_max || '600'
  formData.value.price_min = price_min || '1500'
})
</script>
<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <section class="content-box register-box p-5">
      <h2 class="h4 mb-5">Mis preferencias</h2>
      <section class="d-flex flex-column">
        <label class="mb-2 fw-bold mb-4 h5" for="peopleSelect">Número de personas</label>
        <section class="d-flex justify-content-around gap-3">
          <div class="d-flex gap-1 justify-content-between">
            <label for="numPeopleMin">Mínimo</label>
            <select
              name="numPeopleMin"
              id="numPeopleMin"
              v-model="formData.num_people_min"
              @change="
                checkConstraints(
                  formData.num_people_min as string,
                  formData.num_people_max as string,
                  'num_people'
                )
              "
            >
              <optgroup>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </optgroup>
            </select>
          </div>
          <div class="d-flex gap-1">
            <label for="numPeopleMax">Máximo</label>
            <select
              name="numPeopleMax"
              id="numPeopleMax"
              v-model="formData.num_people_max"
              @change="
                checkConstraints(
                  formData.num_people_min as string,
                  formData.num_people_max as string,
                  'num_people'
                )
              "
            >
              <optgroup>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </optgroup>
            </select>
          </div>
        </section>
        <label class="mb-2 fw-bold mb-4 mt-5 h5" for="daysSelect">Duración (días)</label>
        <section class="d-flex justify-content-around gap-3">
          <div class="d-flex gap-1">
            <label for="daysMin">Mínimo</label>
            <select
              name="daysMin"
              id="daysMin"
              v-model="formData.duration_min"
              @change="
                checkConstraints(
                  formData.duration_min as string,
                  formData.duration_max as string,
                  'duration'
                )
              "
            >
              <optgroup>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </optgroup>
            </select>
          </div>
          <div class="d-flex gap-1">
            <label for="daysMax">Máximo</label>
            <select
              name="daysMax"
              id="daysMax"
              v-model="formData.duration_max"
              @change="
                checkConstraints(
                  formData.duration_min as string,
                  formData.duration_max as string,
                  'duration'
                )
              "
            >
              <optgroup>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </optgroup>
            </select>
          </div>
        </section>
        <label class="mb-2 fw-bold mb-4 mt-5 h5" for="daysSelect">Precio</label>
        <section class="d-flex justify-content-around gap-3">
          <div class="d-flex gap-1">
            <label for="minPrice">Mínimo</label>
            <select
              name="minPrice"
              id="minPrice"
              v-model="formData.price_min"
              @change="
                checkConstraints(
                  formData.price_min as string,
                  formData.price_max as string,
                  'price'
                )
              "
            >
              <optgroup>
                <option value="600" selected>600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="1100">1100</option>
                <option value="1300">1300</option>
                <option value="1500">1500</option>
              </optgroup>
            </select>
          </div>
          <div class="d-flex gap-1">
            <label for="maxPrice">Máximo</label>
            <select
              name="maxPrice"
              id="maxPrice"
              v-model="formData.price_max"
              @change="
                checkConstraints(
                  formData.price_min as string,
                  formData.price_max as string,
                  'price'
                )
              "
            >
              <optgroup>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="1100">1100</option>
                <option value="1300">1300</option>
                <option value="1500" selected>1500</option>
              </optgroup>
            </select>
          </div>
        </section>
        <label class="mb-2 fw-bold mb-3 mt-5 h5" for="peopleSelect">Tipo de experiencia</label>
        <section class="d-flex justify-content-center">
          <div class="d-flex gap-1">
            <select name="typeExp" id="typeExp" v-model="formData.type">
              <optgroup>
                <option value="festive" selected>Festiva</option>
                <option value="cultural">Cultural</option>
                <option value="gastronomic">Gastrónomica</option>
                <option value="all">Todas</option>
              </optgroup>
            </select>
          </div>
        </section>
      </section>
      <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5 mt-4">
        <button class="button fw-bold mt-2 px-1 py-2" @click="emit('cancel')" type="button">
          ATRÁS
        </button>
        <button class="button fw-bold mt-2 px-1 py-2" @click="update" type="button">GUARDAR</button>
      </section>
    </section>
  </VueFinalModal>
</template>
<style scoped>
/* form {
  display: flex;
  flex-direction: column;
} */

form input {
  border-radius: 5px;
  border: 2px solid #d90594;
  background: white;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

form input #placeholder {
  color: #d3d3d3;
}

button {
  color: white;
  margin: 0 auto;
  width: 70%;
}

.terms {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.register-box {
  background-color: white;
}
h1 {
  color: #d90594;
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
}

.button {
  border-radius: 5px;
  background-color: #d90594;
  border: none;
  transition: all 0.3s ease-in-out;
}

.number-box {
  border: 2px solid rgb(77, 77, 77);
  width: 60px;
  height: 60px;
}

.border-pink {
  border: 2px solid #d90594;
}

h2,
h3,
h4 {
  color: #d90594;
  text-align: center;
}
select {
  background-color: white;
  border: none;
  border: 2px solid #d90594;
}

button {
  min-width: max-content;
}

button:hover {
  color: #d90594;
  background-color: white;
  border: 1px solid #d90594;
  transform: scale(1.05, 1.05);
}

.pass-box {
  position: relative;
}

.eye-box {
  position: absolute;
  right: 0;
  top: 50%;
  cursor: pointer;
}

.logo-img {
  width: 30%;
}

.fa-xmark {
  font-size: x-large;
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.fa-xmark:hover {
  color: #d90594;
}
</style>
