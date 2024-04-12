<script setup lang="ts">
import { ref, watch } from 'vue'
import { useReservations } from '@/composables/useReservations'
import ErrorMessages from '@/components/ErrorMessages.vue'

const { formData, error, errorMessages, validateForm, manageReservation, validateCheckBox } =
  useReservations()

const currentIndex = ref<number>(0)

async function handleReservation() {
  if ((await manageReservation()) === false) return
}

function modifyIndex(num: number) {
  if (num === 1) validateForm()
  else if (num === 2) validateCheckBox()
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
  <main
    class="content-box register-box p-5 d-flex justify-content-center flex-column align-items-center"
  >
    <section class="text-center d-none d-md-block">
      <img src="/images/logo.png" alt="Logo" class="img-fluid logo-img" />
    </section>
    <section
      class="d-flex flex-column flex-md-row align-items-center gap-2 justify-content-center mb-5 w-100"
    >
      <div
        :class="currentIndex === num ? 'border-pink' : ''"
        class="rounded-circle number-box fs-2 d-flex align-items-center justify-content-center"
        v-for="num in [0, 1]"
        :key="num"
      >
        {{ num + 1 }}
      </div>
    </section>
    <form class="w-75 px-5 py-2" @submit.prevent="handleReservation()" novalidate>
      <template v-if="currentIndex === 0">
        <h1 class="display-5 mb-5">DATOS DEL TITULAR</h1>
        <section class="d-flex flex-column">
          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="text">Nombre *</label>
            <input
              v-model.trim="formData.name"
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
            />
            <label class="mb-1" for="text">Apellidos *</label>
            <input
              v-model.trim="formData.lastName"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Apellidos"
            />
          </div>
          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="text">DNI *</label>
            <input
              v-model.trim="formData.dni"
              type="text"
              name="dni"
              id="dni"
              placeholder="12345678A"
            />
            <label class="mb-1" for="text">Teléfono *</label>
            <input
              v-model.trim="formData.phone"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="123 456 789"
            />
          </div>

          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-1" for="email">Correo electrónico *</label>
            <input
              v-model.trim="formData.email"
              type="email"
              name="email"
              id="email"
              placeholder="usuario@gmail.com"
            />
            <label class="mb-1" for="emailConfirmation">Confirma correo electrónico *</label>
            <input
              v-model.trim="formData.email"
              type="email"
              name="emailConfirmation"
              id="emailConfirmation"
              placeholder="usuario@gmail.com"
            />
          </div>
          <div class="d-flex flex-column gap-2 text-start">
            <label class="mb-2" for="address">Dirección *</label>
            <input
              v-model.trim="formData.address"
              type="text"
              name="address"
              id="address"
              placeholder="C/Calle num-1 3º-4ª"
            />
            <label class="mb-2" for="postalCode">Código Postal*</label>
            <input
              v-model.trim="formData.postalCode"
              type="text"
              name="postalCode"
              id="postalCode"
              placeholder="08111"
            />
            <label class="mb-2" for="location">Población*</label>
            <input
              v-model.trim="formData.location"
              type="text"
              name="location"
              id="location"
              placeholder="Barcelona"
            />
            <label class="mb-2" for="numPeople">Acompañantes*</label>
            <input
              v-model.trim="formData.numPeople"
              type="text"
              name="numPeople"
              id="numPeople"
              placeholder="5"
              disabled
            />
          </div>
        </section>

        <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
          <button class="button fw-bold mt-5 px-1 py-2" @click="$router.back()" type="button">
            VOLVER ATRÁS
          </button>
          <button class="button fw-bold mt-5 px-1 py-2" @click="modifyIndex(1)" type="button">
            SIGUIENTE
          </button>
        </section>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </template>
      <template v-if="currentIndex === 1">
        <section class="d-flex flex-column">
          <label class="mb-2" for="name">Nombre :</label>
          <input
            v-model.trim="formData.name"
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            disabled
          />
        </section>
        <section class="d-flex flex-column">
          <label class="mb-2" for="lastName">Apellidos :</label>
          <input
            v-model.trim="formData.lastName"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Apellidos"
            disabled
          />
        </section>
        <section class="d-flex flex-column">
          <label class="mb-2" for="phone">Teléfono móvil :</label>
          <input
            v-model.trim="formData.phone"
            type="text"
            name="phone"
            id="phone"
            placeholder="123 456 789"
            disabled
          />
        </section>
        <label class="mb-1" for="email">Correo electrónico :</label>
        <input
          v-model.trim="formData.email"
          type="email"
          name="email"
          id="email"
          placeholder="usuario@gmail.com"
          disabled
        />
        <label class="mb-1" for="email">DNI: </label>
        <input v-model.trim="formData.dni" type="dni" name="dni" id="dni" disabled />
        <label class="mb-1" for="email">Dirección: </label>
        <input
          v-model.trim="formData.location"
          type="location"
          name="location"
          id="location"
          disabled
        />
        <div class="d-flex gap-2">
          <input
            v-model="formData.checkbox"
            type="checkbox"
            name="conditions"
            id="conditions-text"
          />
          <label for="conditions" id="conditions"
            >Acepto los Términos y Condiciones de Rainbow Voyage</label
          >
        </div>
        <section class="d-flex flex-column flex-sm-row gap-2 gap-sm-5">
          <button class="button fw-bold mt-2 px-1 py-2" @click="goBack(0)" type="button">
            ATRÁS
          </button>
          <button class="button fw-bold mt-2 px-1 py-2" @click="modifyIndex(2)" type="submit">
            FINALIZAR RESERVA
          </button>
        </section>
        <button class="button fw-bold mt-5 px-1 py-2" @click="$router.back()" type="button">
          VOLVER AL DETALLE
        </button>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
      </template>
    </form>
  </main>
</template>

<style scoped>
@media screen and (max-width: 568px) {
  .confirm-modal-content {
    width: 95% !important;
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
main{
  background-color: rgba(171, 184, 195, 0.19);
}

form {
  display: flex;
  flex-direction: column;
  border: 2px solid #d90594;
  border-radius: 5px;
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
