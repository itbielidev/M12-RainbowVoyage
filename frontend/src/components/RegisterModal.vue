<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';
import { useAuthStore } from "@/stores/auth";


const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()


const currentIndex = ref<number>(0);

function modifyIndex(num: number) {
    currentIndex.value = num;
}

const authStore = useAuthStore();

const error: Ref<boolean> = ref(false);
const errorMessages: Ref<string[]> = ref([]);

interface RegisterType {
  username: string,
  email: string,
  password: string,
  password2: string,
  checkbox: boolean
}

const formData: Ref<RegisterType> = ref({
  username: "",
  email: "",
  password: "",
  password2: "",
  checkbox: false
})

interface TokenType {
  message: string,
  token: string
}

// const validateRegister = () => {

//   if (formData.value.username.length === 0 || formData.value.username.length < 3 || formData.value.username.length > 20) {
//     errorMessages.value.push("El nombre de usuario debe tener entre 3 y 20 carácteres.");
//     error.value = true;
//   }
//   if (/^[0-9]*$/.test(formData.value.username[0])) {
//     errorMessages.value.push("El nombre de usuario debe empezar por un carácter alfabético.");
//     error.value = true;
//   }
//   if (
//     formData.value.email.length === 0 ||
//     !formData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
//     formData.value.email.length > 150
//   ) {
//     errorMessages.value.push("El email introducido no es válido.");
//     error.value = true;
//   }
//   if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
//     errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
//     error.value = true;
//   }
//   if (formData.value.password !== formData.value.password2) {
//     errorMessages.value.push("Las contraseñas no coinciden.");
//     error.value = true;
//   }
//   if (!formData.value.checkbox) {
//     errorMessages.value.push("Debes aceptar las condiciones de uso y la Política de Privacidad.");
//     error.value = true;
//   }
// }



</script>

<template>
  <VueFinalModal class="confirm-modal" content-class="confirm-modal-content" overlay-transition="vfm-fade"
    content-transition="vfm-fade">
    <section class="content-box register-box p-5">
        <form @submit.prevent="" novalidate>
            <template v-if="currentIndex === 0">
                <h1 class="display-5 mb-5">¡EMPECEMOS!</h1>
                <section class="d-flex flex-column">
                <label class="mb-2" for="email">Correo electónico *</label> 
                <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="usuario@gmail.com">
                </section>
                <button class="button fw-bold mt-5" @click="modifyIndex(1)" type="button">SIGUIENTE</button>
            </template>
            <template v-if="currentIndex === 1">
                <h1 class="display-5 mb-5">¡EMPECEMOS!</h1>
                <section class="d-flex flex-column">
                <label class="mb-2" for="email">Correo electónico *</label> 
                <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="usuario@gmail.com">
                </section>
                <button class="button fw-bold mt-5" @click="modifyIndex(2)" type="button">SIGUIENTE</button>
            </template>
            <template v-if="currentIndex === 2">
                <h1 class="display-5 mb-5">¡EMPECEMOS!</h1>
                <section class="d-flex flex-column">
                <label class="mb-2" for="email">Correo electónico *</label> 
                <input v-model.trim="formData.email" type="email" name="email" id="email" placeholder="usuario@gmail.com">
                </section>
                <button class="button fw-bold mt-5" @click="modifyIndex(0)" type="button">SIGUIENTE</button>
            </template>
           
            <!-- <input v-model.trim="formData.username" type="name" name="name" id="name" placeholder="Nombre" maxlength="20">
            <input v-model.trim="formData.password" type="password" name="password" id="password" placeholder="Contraseña"
                maxlength="20">
            <input v-model.trim="formData.password2" type="password" name="password2" id="password2"
                placeholder="Repite contraseña" maxlength="20">
            <div class="terms">
                <input v-model="formData.checkbox" type="checkbox" name="conditions" id="conditions-text">
                <label for="conditions" id="conditions">He leído y acepto las <u>Condiciones de uso</u> y la <u>Política de
                    privacidad de GameSwap</u>.
                Ver +info sobre protección de datos</label>
            </div> -->
           
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
  background-color: #9F87F5;
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
</style>
<style scoped>
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
}
</style>
