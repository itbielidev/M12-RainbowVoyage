import type { Reservation, ReservationPayload } from "@/types";
import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";

export const useReservations = () => {

    const formData: Ref<ReservationPayload> = ref({
        name: "",
        email: "",
        emailConfirmation: "",
        lastName: "",
        phone: "",
        dni: "",
        address: "",
        postalCode: "",
        location: "",
        type: "client",
        checkbox: false,
        numPeople: ""
    });


    const { get, fetchError } = useFetch<Reservation[]>();
    const { postAuth: postReservation, fetchError: fetchErrorPost } = useFetch<any>();

    const reservations: Ref<Reservation[] | null> = ref([]);

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    async function getReservations(qs: string) {

        const reservationsData = await get(`/reservations?${qs}`);

        if (fetchError.value) {
            reservations.value = null;
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {
            reservations.value = reservationsData;
        }
    }

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

        if (
            formData.value.emailConfirmation !== formData.value.emailConfirmation
        ) {
            errorMessages.value.push("Los correos no coinciden");
            error.value = true;
        }

    }

    const validateForm = () => {
        // error.value = false;
        // errorMessages.value = [];

        validateEmail();

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
            errorMessages.value.push("Los apellidos no deben contener carácteres numéricos.");
            error.value = true;
        }

        if (! /^(\d{8}[A-Z])$/.test(formData.value.dni)) {
            errorMessages.value.push("El DNI intoducido no es válido.");
            error.value = true;
        }

        if (! /^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/.test(formData.value.postalCode)) {
            errorMessages.value.push("El código postal introducido no es válido.");
            error.value = true;
        }

        if (formData.value.address.length === 0 || formData.value.location.length === 0) {
            errorMessages.value.push("Debes especificar la dirección y la localidad.");
            error.value = true;
        }

    }

    const validateCheckBox = () => {
        if (!formData.value.checkbox) {
            errorMessages.value.push("Debes aceptar las condiciones de uso y la Política de Privacidad.");
            error.value = true;
        }


    }

    const manageReservation = async () => {

        error.value = false;
        errorMessages.value = [];

        validateCheckBox();
        if (error.value) return false;

        const data = await postReservation("/reservations",
            {
                ...formData.value,
            });

        if (fetchErrorPost.value) {
            error.value = true;
            errorMessages.value.push(fetchErrorPost.value);
            return false;
        }
        else {
            // token.value = tokenData?.token as string;
            return true;
        }
    }



    return { formData, reservations, error, errorMessages, getReservations, validateForm, manageReservation, validateCheckBox };
};
