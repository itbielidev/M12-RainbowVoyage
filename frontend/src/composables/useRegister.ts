import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { type RegisterPayLoad } from '@/types';
import { useAuthStore } from "@/stores/auth";
import type { TokenType } from "@/types";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export const useRegister = () => {

    const { token, isAdmin } = storeToRefs(useAuthStore());
    const { post, fetchError } = useFetch<TokenType>();

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const router = useRouter();

    const formData: Ref<RegisterPayLoad> = ref({
        name: "",
        email: "",
        lastName: "",
        phone: "",
        type: "client",
        password: "",
        passwordConfirm: "",
        num_people_min: 3,
        num_people_max: 10,
        duration_min: 3,
        duration_max: 5,
        experience_type: 'all',
        checkbox: false,
        adult: false
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
        if (/\d/
            .test(formData.value.name) && formData.value.name.length > 0) {
            errorMessages.value.push("El nombre no debe contener carácteres numéricos");
            error.value = true;
        }

        if (formData.value.phone === "" || /[\p{L}]/u.test(formData.value.phone) || formData.value.phone.length !== 9) {
            errorMessages.value.push("El número de teléfono introducido no es correcto. El teléfono debe tener exactamente 9 dígitos.");
            error.value = true;
        }

        if (/\d/
            .test(formData.value.lastName) && formData.value.lastName.length > 0) {
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

        if (!formData.value.adult) {
            errorMessages.value.push("Debes ser mayor de 18 años para poder reservar viajes en Rainbow Voyage.");
            error.value = true;
        }
    }

    const manageRegister = async () => {

        error.value = false;
        errorMessages.value = [];

        validateCheckBox();
        if (error.value) return false;

        const tokenData = await post("/users/register",
            {
                ...formData.value,
                num_people_min: Number(formData.value.num_people_min),
                num_people_max: Number(formData.value.num_people_max),
                duration_min: Number(formData.value.duration_min),
                duration_max: Number(formData.value.duration_max)
            });

        if (fetchError.value) {
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {
            token.value = tokenData?.token as string;

            if (formData.value.email === "admin@gmail.com") {
                isAdmin.value = true;
                router.push("/admin");
            }

            return true;
        }
    }

    return { formData, errorMessages, error, validateEmail, validateSecondForm, validateCheckBox, manageRegister };
};
