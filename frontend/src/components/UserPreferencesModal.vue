<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useModal } from 'vue-final-modal'
import UserPreferencesModal from '@/components/UserPreferencesModal.vue'

const { open, close } = useModal({
  component: UserPreferencesModal,
  attrs: {
    onConfirm() {
      close()
    },
    onCancel() {
      close()
    }
  }
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
        <template v-if="currentIndex === 2">
          <h2 class="h4 mb-5">
          Mis preferencias
          </h2>
          <section class="d-flex flex-column">
            <label class="mb-2 fw-bold mb-4 h5" for="peopleSelect">Número de personas</label>
            <section class="d-flex justify-content-around gap-3">
              <div class="d-flex gap-1 justify-content-between">
                <label for="numPeopleMin">Mínimo</label>
                <select name="numPeopleMin" id="numPeopleMin" v-model="formData.num_people_min">
                  <optgroup>
                    <option value="1">1</option>
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
                <select name="numPeopleMax" id="numPeopleMax" v-model="formData.num_people_max">
                    <optgroup>
                    <option value="1">1</option>
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
                <select name="daysMin" id="daysMin" v-model="formData.duration_min">
                  <optgroup>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </optgroup>
                </select>
              </div>
              <div class="d-flex gap-1">
                <label for="daysMax">Máximo</label>
                <select name="daysMax" id="daysMax" v-model="formData.duration_max">
                  <optgroup>
                    <option value="1">1</option>
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
                <select name="minPrice" id="minPrice" v-model="formData.price_min">
                  <optgroup>
                    <option value="1">650</option>
                    <option value="2">750</option>
                    <option value="3">850</option>
                    <option value="4">950</option>
                    <option value="5">1150</option>
                </select>
              </div>
              <div class="d-flex gap-1">
                <label for="maxPrice">Máximo</label>
                <select name="maxPrice" id="maxPrice" v-model="formData.price_max">
                  <optgroup>
                    <option value="1">650</option>
                    <option value="2">750</option>
                    <option value="3">850</option>
                    <option value="4">950</option>
                    <option value="5">1150</option>
                </optgroup>
                </select>
              </div>
            </section>
            <label class="mb-2 fw-bold mb-3 mt-5 h5" for="peopleSelect">Tipo de experiencia</label>
            <section class="d-flex justify-content-center">
              <div class="d-flex gap-1">
                <select name="typeExp" id="typeExp" v-model="formData.experience_type">
                  <optgroup>
                    <option value="festive">Festiva</option>
                    <option value="cultural">Cultural</option>
                    <option value="gastronomic">Gastrónomica</option>
                  </optgroup>
                </select>
              </div>
            </section>
          </section>
          <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5 mt-4">
            <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(1)" type="button">
              ATRÁS
            </button>
            <button class="button fw-bold mt-2 px-1 py-2" @click="open()" type="button">
              GUARDAR
            </button>
          </section>
        </template>
    </section>
  </VueFinalModal>
</template>
<style scoped>
</style>