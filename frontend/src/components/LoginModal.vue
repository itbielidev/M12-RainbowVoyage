<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import ErrorMessages from './ErrorMessages.vue'
import { useLogin } from '@/composables/useLogin'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const { formData, errorMessages, manageLogin } = useLogin()

const { getUser } = useAuthStore()

const passwordRevealed = ref<boolean>(true)

function revealPassword() {
  passwordRevealed.value = !passwordRevealed.value
}

async function handleLogin() {
  if ((await manageLogin()) === false) return
  await emit('confirm')
  await getUser()
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
      <section class="d-none d-md-flex justify-content-center">
        <img src="/images/logo.webp" alt="Logo" class="img-fluid logo-img" />
      </section>
      <form @submit.prevent="handleLogin()" novalidate>
        <h3 class="mb-5">¡BIENVENIDX!</h3>
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
        <button class="button fw-bold mt-5 px-1 py-2" type="submit">ENVIAR</button>
        <ErrorMessages :messages="errorMessages"></ErrorMessages>
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
  position: relative;
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
  width: 40%;
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
