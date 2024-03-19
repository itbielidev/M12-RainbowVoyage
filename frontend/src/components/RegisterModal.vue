<script setup lang="ts">
import { ref, watch} from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useRegister } from '@/composables/useRegister';
import ErrorMessages from './ErrorMessages.vue';


const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()

const {formData, error, errorMessages, validateEmail, validateSecondForm, validateCheckBox, manageRegister} = useRegister();

const currentIndex = ref<number>(0);

function handleRegister() {
  manageRegister();
  emit('confirm');
}

function modifyIndex(num: number) {
    
    if (num === 1) validateEmail();
    else if (num === 2) validateSecondForm();
    else if (num === 4) validateCheckBox(); 

    if (!error.value) {
      currentIndex.value = num;
    }
}

function goBack(num:number) {

  error.value = false;
  errorMessages.value = [];

  currentIndex.value = num;
}

watch(formData.value, ()=> {
  formData.value.email = formData.value.email.toLowerCase();
})
</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <section class="content-box register-box p-5">
      <section class="text-center">
        <img src="/logo.png" alt="Logo" class="img-fluid w-50">
      </section>
        <section class="d-flex flex-column flex-sm-row align-items-center gap-2 justify-content-around mb-5 w-100">
          <div :class="currentIndex === num ? 'border-pink' : ''" class="rounded-circle number-box fs-2 d-flex align-items-center justify-content-center" v-for="num in [0,1,2,3]" :key="num">
            {{ num + 1}}
          </div>
        </section>
        <form @submit.prevent="handleRegister()" novalidate>
            <template v-if="currentIndex === 0">
                <h1 class="display-5 mb-5">¡EMPECEMOS!</h1>
                <section class="d-flex flex-column">
                <label class="mb-2" for="email">Correo electónico *</label> 
                <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="usuario@gmail.com">
                </section>
                <button class="button fw-bold mt-5 px-1 py-2" @click="modifyIndex(1)" type="button">SIGUIENTE</button>
                <ErrorMessages :messages="errorMessages"></ErrorMessages>
            </template>
            <template v-if="currentIndex === 1">
                <section class="d-flex flex-column">
                <label class="mb-2" for="name">Nombre *</label> 
                <input v-model.trim="formData.name" type="text" name="name" id="name" placeholder="Nombre">
                </section>
                <section class="d-flex flex-column">
                <label class="mb-2" for="lastName">Apellidos *</label> 
                <input v-model.trim="formData.lastName" type="text" name="lastName" id="lastName" placeholder="Apellidos">
                </section>
                <section class="d-flex flex-column">
                <label class="mb-2" for="phone">Teléfono móvil *</label> 
                <input v-model.trim="formData.phone" type="text" name="phone" id="phone" placeholder="123 456 789">
                </section>
                <section class="d-flex flex-column">
                <label class="mb-2" for="password">Contraseña *</label> 
                <input v-model.trim="formData.password" type="password" name="password" id="password" placeholder="*********">
                </section>
                <section class="d-flex flex-column">
                <label class="mb-2" for="passwordConfirm">Confirmar contraseña *</label> 
                <input v-model.trim="formData.passwordConfirm" type="passwordConfirm" name="passwordConfirm" id="passwordConfirm" placeholder="*********">
                </section>
                <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
                  <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(0)" type="button">ATRÁS</button>
                  <button class="button fw-bold mt-2 px-1 py-2" @click="modifyIndex(2)" type="button">SIGUIENTE</button>
                </section>
                <ErrorMessages :messages="errorMessages"></ErrorMessages>
            </template>
            <template v-if="currentIndex === 2">
                <h2 class="h4 mb-5">Puedes indicar las preferencias de búsqueda las experiencias si lo deseas</h2>
                <section class="d-flex flex-column">
                  <label class="mb-2 fw-bold mb-4 h5" for="peopleSelect">Número de personas</label> 
                  <section class="d-flex justify-content-around gap-3">
                    <div class="d-flex gap-1 justify-content-between">
                      <label for="numPeopleMin">Mínimo</label>
                      <select name="numPeopleMin" id="numPeopleMin" v-model="formData.num_people_min">
                        <optgroup>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                        </optgroup>
                      </select>
                    </div>
                    <div class="d-flex gap-1">
                      <label for="numPeopleMax">Máximo</label>
                      <select name="numPeopleMax" id="numPeopleMax" v-model="formData.num_people_max">
                        <optgroup>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                        </optgroup>
                      </select>
                    </div>
                  </section>
                  <label class="mb-2 fw-bold mb-4 mt-5 h5" for="daysSelect">Número de días</label>
                  <section class="d-flex justify-content-around gap-3">
                    <div class="d-flex gap-1">
                      <label for="daysMin">Mínimo</label>
                      <select name="daysMin" id="daysMin" v-model="formData.duration_min">
                        <optgroup>
                          <option value="2">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                        </optgroup>
                      </select>
                    </div>
                    <div class="d-flex gap-1">
                      <label for="daysMax">Máximo</label>
                      <select name="daysMax" id="daysMax" v-model="formData.duration_max">
                        <optgroup>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
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
                  <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(1)" type="button">ATRÁS</button>
                  <button class="button fw-bold mt-2 px-1 py-2" @click="modifyIndex(3)" type="button">SIGUIENTE</button>
                </section>
                <ErrorMessages :messages="errorMessages"></ErrorMessages>
            </template>
            <template v-if="currentIndex === 3">
              <div class="terms d-flex align-items-center">
                <input v-model="formData.checkbox" type="checkbox" name="conditions" id="conditions-text">
                <label for="conditions" id="conditions">He leído y acepto las <u>Condiciones de uso</u> y la <u>Política de
                    privacidad de Rainbow Voyage</u>.
                Ver +info sobre protección de datos</label>
              </div>
                <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5 mt-4">
                  <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(2)" type="button">ATRÁS</button>
                  <button class="button fw-bold mt-2 px-1 py-2" type="submit">ENVIAR</button>
                </section>
                <ErrorMessages :messages="errorMessages"></ErrorMessages>

            </template>    
    </form>
  </section>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
    top: 100px;
}

.confirm-modal-content {
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 27px;
  border: 1px solid var(--Color-3, #000);
  background: var(--Color, white);
  padding: 2rem;
  height: auto;
  /*Scrollable content*/
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

.dark .confirm-modal-content {
  background: #000;
}

@media screen and (max-width: 568px) {
  .confirm-modal-content {
    width: 95% !important;
    background-color: #D90594;
  }
}

</style>
<style scoped>

form {
  display: flex;
  flex-direction: column;
}

form input {
  border-radius: 5px;
  border: 2px solid #D90594;
  background: white;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

form input #placeholder {
  color: #D3D3D3;
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
  color: #D90594;
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
}

.button {
    border-radius: 5px;
    background-color: #D90594 ;
    border: none;
    transition: all 0.3s ease-in-out;
}

.number-box {
  border: 2px solid rgb(77, 77, 77);
  width: 60px;
  height: 60px;
}

.border-pink {
  border: 2px solid #D90594;
}

h2,h3,h4 {
  color: #D90594;
  text-align: center;
}
select {
  background-color: white;
  border: none;
  border: 2px solid #D90594;
}

button {
  min-width: max-content;
}

button:hover {
  color: #D90594;
  background-color: white;
  border: 1px solid #D90594;
  transform: scale(1.05,1.05);
}

</style>
