<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useRegister } from '@/composables/useRegister'
import ErrorMessages from './ErrorMessages.vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const {
  formData,
  error,
  errorMessages,
  validateEmail,
  validateSecondForm,
  validateCheckBox,
  manageRegister
} = useRegister()

const { getUser } = useAuthStore()

const checkConstraints = (min: string, max: string, tag: string) => {
  if (Number(min) > Number(max) || Number(max) < Number(min)) {
    switch (tag) {
      case 'num_people':
        formData.value.num_people_min = formData.value.num_people_max
        break
      case 'duration':
        formData.value.duration_min = formData.value.duration_max
        break
    }
  }
}

const currentIndex = ref<number>(0)

const passwordConfirmRevealed = ref<boolean>(true)
const passwordRevealed = ref<boolean>(true)

function revealPassword() {
  passwordRevealed.value = !passwordRevealed.value
}

function revealConfirmPassword() {
  passwordConfirmRevealed.value = !passwordConfirmRevealed.value
}

async function handleRegister() {
  if ((await manageRegister()) === false) return
  await emit('confirm')
  await getUser()
}

function modifyIndex(num: number) {
  if (num === 1) validateEmail()
  else if (num === 2) validateSecondForm()
  else if (num === 4) validateCheckBox()

  if (!error.value) {
    currentIndex.value = num
  }
}

function goBack(num: number) {
  error.value = false
  errorMessages.value = []

  currentIndex.value = num
}

watch(formData.value, () => {
  formData.value.email = formData.value.email.toLowerCase()
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
      <font-awesome-icon @click="emit('cancel')" icon="fa-solid fa-xmark" />
      <section class="d-none d-md-flex justify-content-center mb-2">
        <img src="/images/logo.webp" alt="Logo" class="img-fluid logo-img" />
      </section>
      <section
        class="d-flex flex-column flex-md-row align-items-center gap-2 justify-content-around mb-5 w-100"
      >
        <div
          :class="currentIndex === num ? 'border-pink' : ''"
          class="rounded-circle number-box fs-2 d-flex align-items-center justify-content-center"
          v-for="num in [0, 1, 2, 3]"
          :key="num"
        >
          {{ num + 1 }}
        </div>
      </section>
      <form @submit.prevent="handleRegister()" novalidate>
        <template v-if="currentIndex === 0">
          <h3 class="mb-5">¡EMPECEMOS!</h3>
          <section class="d-flex flex-column">
            <label class="mb-2 fs-5" for="email">Correo electrónico *</label>
            <input
              v-model.trim="formData.email"
              type="email"
              name="email"
              id="email"
              placeholder="usuario@gmail.com"
            />
          </section>
          <button class="button fw-bold mt-5 px-1 py-2" @click="modifyIndex(1)" type="button">
            SIGUIENTE
          </button>
          <ErrorMessages :messages="errorMessages"></ErrorMessages>
        </template>
        <template v-if="currentIndex === 1">
          <section class="d-flex flex-column">
            <label class="mb-2 fs-5" for="name">Nombre *</label>
            <input
              v-model.trim="formData.name"
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
            />
          </section>
          <section class="d-flex flex-column">
            <label class="mb-2 fs-5" for="lastName">Apellidos *</label>
            <input
              v-model.trim="formData.lastName"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Apellidos"
            />
          </section>
          <section class="d-flex flex-column">
            <label class="mb-2 fs-5" for="phone">Teléfono móvil *</label>
            <input
              v-model.trim="formData.phone"
              type="text"
              name="phone"
              id="phone"
              placeholder="123 456 789"
            />
          </section>
          <section class="d-flex flex-column pass-box">
            <label class="mb-2 fs-5" for="password">Contraseña *</label>
            <input
              v-model.trim="formData.password"
              :type="passwordRevealed ? 'password' : 'text'"
              name="password"
              id="password"
            />
            <font-awesome-icon
              v-if="!passwordRevealed"
              icon="eye"
              style="color: #a1a1a1; font-size: 20px; margin-right: 20px"
              class="eye-box"
              @click="revealPassword"
            ></font-awesome-icon>
            <font-awesome-icon
              v-else
              icon="fa-solid fa-eye-slash"
              style="color: #a1a1a1; font-size: 20px; margin-right: 20px"
              class="eye-box"
              @click="revealPassword"
            />
          </section>
          <section class="d-flex flex-column pass-box">
            <label class="mb-2 fs-5" for="passwordConfirm">Confirmar contraseña *</label>
            <input
              v-model.trim="formData.passwordConfirm"
              :type="passwordConfirmRevealed ? 'password' : 'text'"
              name="passwordConfirm"
              id="passwordConfirm"
            />
            <font-awesome-icon
              v-if="!passwordConfirmRevealed"
              icon="eye"
              style="color: #a1a1a1; font-size: 20px; margin-right: 20px"
              class="eye-box"
              @click="revealConfirmPassword"
            ></font-awesome-icon>
            <font-awesome-icon
              v-else
              icon="fa-solid fa-eye-slash"
              style="color: #a1a1a1; font-size: 20px; margin-right: 20px"
              class="eye-box"
              @click="revealConfirmPassword"
            />
          </section>
          <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
            <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(0)" type="button">
              ATRÁS
            </button>
            <button class="button fw-bold mt-2 px-1 py-2" @click="modifyIndex(2)" type="button">
              SIGUIENTE
            </button>
          </section>
          <ErrorMessages :messages="errorMessages"></ErrorMessages>
        </template>
        <template v-if="currentIndex === 2">
          <h2 class="h4 mb-5">
            Puedes indicar las preferencias de búsqueda de las experiencias si lo deseas
          </h2>
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
                      formData.num_people_min?.toString() as string,
                      formData.num_people_max?.toString() as string,
                      'num_people'
                    )
                  "
                >
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
                <select
                  name="numPeopleMax"
                  id="numPeopleMax"
                  v-model="formData.num_people_max"
                  @change="
                    checkConstraints(
                      formData.num_people_min?.toString() as string,
                      formData.num_people_max?.toString() as string,
                      'num_people'
                    )
                  "
                >
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
                <select
                  name="daysMin"
                  id="daysMin"
                  v-model="formData.duration_min"
                  @change="
                    checkConstraints(
                      formData.duration_min?.toString() as string,
                      formData.duration_max?.toString() as string,
                      'duration'
                    )
                  "
                >
                  <optgroup>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">6</option>
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
                      formData.duration_min?.toString() as string,
                      formData.duration_max?.toString() as string,
                      'duration'
                    )
                  "
                >
                  <optgroup>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">6</option>
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
                    <option value="all">Todas</option>
                  </optgroup>
                </select>
              </div>
            </section>
          </section>
          <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5 mt-4">
            <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(1)" type="button">
              ATRÁS
            </button>
            <button class="button fw-bold mt-2 px-1 py-2" @click="modifyIndex(3)" type="button">
              SIGUIENTE
            </button>
          </section>
          <ErrorMessages :messages="errorMessages"></ErrorMessages>
        </template>
        <template v-if="currentIndex === 3">
          <div class="terms d-flex flex-column flex-md-row align-items-center flex-wrap">
            <div class="d-flex gap-2">
              <input
                v-model="formData.checkbox"
                type="checkbox"
                name="conditions"
                id="conditions-text"
              />
              <label for="conditions" id="conditions"
                >He leído y acepto las <u>Condiciones de uso</u> y la
                <u>Política de privacidad de Rainbow Voyage</u>. Ver +info sobre protección de
                datos</label
              >
            </div>
            <div class="d-flex gap-2">
              <input v-model="formData.adult" type="checkbox" name="adult" id="adult" />
              <label for="adult" id="adult"> Confirmo que soy mayor de 18 años</label>
            </div>
          </div>
          <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5 mt-4">
            <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(2)" type="button">
              ATRÁS
            </button>
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

.confirm-modal-content {
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 27px;
  border: 1px solid var(--Color-3, #000);
  background: var(--Color, white);
  padding: 2rem;
  padding-top: 5px;
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
    padding: 0 !important;
  }

  .fa-xmark {
    top: 20px;
    left: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
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
