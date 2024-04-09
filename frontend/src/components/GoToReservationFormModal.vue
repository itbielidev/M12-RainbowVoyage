<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <section
      class="content-box register-box p-5 d-flex justify-content-center flex-column align-items-center"
    >
      <font-awesome-icon @click="emit('cancel')" icon="fa-solid fa-xmark" />
      <p class="mb-4">Serás redirigido al formulario de reserva ¿Quieres continuar?</p>
      <button @click="emit('confirm')" class="button fw-bold mt-1 px-1 py-2" type="button">
        IR A RESERVA
      </button>
      <button @click="emit('cancel')" class="button fw-bold mt-1 px-1 py-2" type="button">
        VOLVER ATRÁS
      </button>
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
button {
  color: white;
  margin: 0 auto;
  width: 150px;
  min-width: fit-content;
}

.register-box {
  background-color: white;
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
