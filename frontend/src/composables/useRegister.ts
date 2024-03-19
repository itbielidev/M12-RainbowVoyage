import type { Experience } from "@/types";
import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { type RegisterPayLoad } from '@/types';
import { useAuthStore } from "@/stores/auth";
import type { TokenType } from "@/types";
import { faListNumeric } from "@fortawesome/free-solid-svg-icons";

export const useRegister = () => {

    const {token} = useAuthStore();
    const {post} = useFetch<TokenType>();

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const formData: Ref<RegisterPayLoad> = ref({
        name: "",
        email: "",
        lastName: "",
        phone: "",
        type: "client",
        password: "",
        passwordConfirm: "",
        num_people_min: -1,
        num_people_max: -1,
        duration_min: -1,
        duration_max: -1,
        experience_type: "gastronomic",
        checkbox: false
      })

    
    const validateEmail = () => {

        error.value = false;
        errorMessages.value = [];

        if (
            formData.value.email.length === 0 ||
            !formData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            formData.value.email.length > 255
        ) {
            errorMessages.value.push("El email introducido no es válido.");
            error.value = true;
        }

    }

    const validateSecondForm = () => {
        error.value = false;
        errorMessages.value = [];

        if (formData.value.name.length === 0 || formData.value.name.length < 1 || formData.value.name.length > 100) {
            errorMessages.value.push("El nombre de usuario debe tener entre 1 y 100 carácteres.");
            error.value = true;
        }
        if (formData.value.lastName.length === 0 || formData.value.lastName.length < 1 || formData.value.lastName.length > 100) {
            errorMessages.value.push("Los apellidos debe tener entre 1 y 100 carácteres.");
            error.value = true;
        }
        if (/^[0-9]*$/.test(formData.value.name)) {
            errorMessages.value.push("El nombre no debe contener carácteres numéricos");
            error.value = true;
        }

        if (/^[0-9]*$/.test(formData.value.lastName)) {
            errorMessages.value.push("Los apellidos no deben contener carácteres numéricos");
            error.value = true;
        }
        
        if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
            errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
            error.value = true;
        }
        if (formData.value.password !== formData.value.passwordConfirm) {
            errorMessages.value.push("Las contraseñas no coinciden.");
            error.value = true;
        }

    }

    const validateRegister = () => {

        if (formData.value.name.length === 0 || formData.value.name.length < 1 || formData.value.name.length > 100) {
            errorMessages.value.push("El nombre de usuario debe tener entre 1 y 100 carácteres.");
            error.value = true;
        }
        if (/^[0-9]*$/.test(formData.value.name)) {
            errorMessages.value.push("El nombre no debe contener carácteres numéricos");
            error.value = true;
        }
        
        if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
            errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
            error.value = true;
        }
        if (formData.value.password !== formData.value.passwordConfirm) {
            errorMessages.value.push("Las contraseñas no coinciden.");
            error.value = true;
        }
        if (!formData.value.checkbox) {
            errorMessages.value.push("Debes aceptar las condiciones de uso y la Política de Privacidad.");
            error.value = true;
        }
    }
   

    return { formData, errorMessages, error, validateEmail, validateSecondForm};
};
