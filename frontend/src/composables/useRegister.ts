import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { type RegisterPayLoad } from '@/types';
import { useAuthStore } from "@/stores/auth";
import type { TokenType } from "@/types";
import { storeToRefs } from "pinia";

export const useRegister = () => {

    const {token} = storeToRefs(useAuthStore());
    const {post, fetchError} = useFetch<TokenType>();

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
        num_people_min: null,
        num_people_max: null,
        duration_min: null,
        duration_max: null,
        experience_type: null,
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

        if (formData.value.phone === "" || /^[a-zA-ZáéíóúüÁÉÍÓÚÜ]+$/.test(formData.value.phone) || formData.value.phone.length !== 9) {
            errorMessages.value.push("El número de teléfono intorducido no es correcto");
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

    const validateCheckBox = () => {
        if (!formData.value.checkbox) {
            errorMessages.value.push("Debes aceptar las condiciones de uso y la Política de Privacidad.");
            error.value = true;
        }
    }

    const manageRegister = async () => {

        error.value = false;
        errorMessages.value = [];

        validateCheckBox();
        if (error.value) return;

        const tokenData = await post("/users/register", 
        {...formData.value , 
            num_people_min: Number(formData.value.num_people_min), 
            num_people_max: Number(formData.value.num_people_max), 
            duration_min: Number(formData.value.duration_min), 
            duration_max: Number(formData.value.duration_max)
        });

        if (fetchError.value) {
            error.value = true;
            errorMessages.value.push(fetchError.value);
        }
        else {
            token.value = tokenData?.token as string;
        }
    }

    return { formData, errorMessages, error, validateEmail, validateSecondForm, validateCheckBox, manageRegister};
};
