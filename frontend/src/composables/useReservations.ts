import type { Reservation, ReservationPayload } from "@/types";
import { computed, ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";


type Horarios = {
    [origen: string]: {
        [destino: string]: string;
    };
};


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
        adult: false,
        numPeople: "",
        cardNumber: "",
        cardExpirationDate: "",
        securityCode: "",
        dates: "",
        dateId: "",
        airportIn: "",
        airportOut: "",
        partidaFirstDay: "",
        llegadaFirstDay: "",
        partidaLastDay: "",
        llegadaLastDay: ""
    });

    const selectedAirportIn = computed<string>(() => formData.value.airportIn.split('-')[0].replace(/\s$/, ""))

    const availableAirportsOrigin = ref<string[]>([
        "Madrid - Adolfo Suárez, Barajas",
        "Barcelona - El Prat, Josep Tarradellas",
        "Palma de Mallorca - Son Sant Joan"
    ]
    )

    const availableAirportsDestination = ref<any>({
        "Barcelona": ["Barcelona - El Prat, Josep Tarradellas"],
        "Madrid": ["Madrid - Adolfo Suárez, Barajas",],
        "Málaga": ["Málaga - Aeropuerto de Costa Del Sol"],
        "Ibiza": ["Ibiza - Aeropuerto des Colodar"],
        "Gran Canaria": ["Gran Canaria - Aeropuerto de Gran Canaria"]
    });

    const horaPartidaFirstDay: Horarios = {
        "Barcelona": {
            "Madrid": '07:00h',
            "Gran Canaria": "06:50h",
            "Málaga": "06:50h",
            "Ibiza": "07:10h"
        },
        "Madrid": {
            "Barcelona": '06:45h',
            "Gran Canaria": "06:55h",
            "Málaga": "09:25h",
            "Ibiza": "09:30h"
        },
        "Palma de Mallorca": {
            "Barcelona": '06:45h',
            "Madrid": "06:45h",
            "Málaga": "09:25h",
            "Gran Canaria": "07:20h"
        }
    }

    const horaPartidaLastDay: Horarios = {
        "Barcelona": {
            "Madrid": '20:00h',
            "Gran Canaria": "20:50h",
            "Málaga": "20:00h",
            "Ibiza": "22:30h"
        },
        "Madrid": {
            "Barcelona": '21:05h',
            "Gran Canaria": "21:10h",
            "Málaga": "23:10h",
            "Ibiza": "22:30h"
        },
        "Palma de Mallorca": {
            "Barcelona": '22:40h',
            "Madrid": "20:00h",
            "Málaga": "23:10h",
            "Gran Canaria": "22:00h",
            "Ibiza": "22.50h"
        }
    }

    const horaLlegadaFirstDay: Horarios = {
        "Barcelona": {
            "Madrid": '08:25h',
            "Gran Canaria": "09:25h",
            "Málaga": "08:30h",
            "Ibiza": "08:15h"
        },
        "Madrid": {
            "Barcelona": '08:00h',
            "Gran Canaria": "08:50h",
            "Málaga": "10:45h",
            "Ibiza": "10:15h"
        },
        "Palma de Mallorca": {
            "Barcelona": '07:25h',
            "Madrid": "08:10h",
            "Málaga": "08:20h",
            "Gran Canaria": "10:40h",
            "Ibiza": "8:10h"
        }
    }


    const horaLlegadaLastDay: Horarios = {
        "Barcelona": {
            "Madrid": '21:20h',
            "Gran Canaria": "01:05h",
            "Málaga": "21:00h",
            "Ibiza": "23:30h"
        },
        "Madrid": {
            "Barcelona": '22:30h',
            "Gran Canaria": "00:55h",
            "Málaga": "00:30h",
            "Ibiza": "23:50h"
        },
        "Palma de Mallorca": {
            "Barcelona": '23:35h',
            "Madrid": "00:00h",
            "Málaga": "00:40h",
            "Gran Canaria": "23:00h",
            "Ibiza": "00:50h"
        }
    }

    const { fetchError, getAuth, isLoading: isLoadingReservations } = useFetch<Reservation[]>();
    const { getAuth: getDetail, fetchError: fetchErrorDetail, isLoading: isLoadingDetail } = useFetch<Reservation>();
    const { getAuth: sendEmailFetch, fetchError: sendEmailError } = useFetch<any>();
    const { postAuth: postReservation, fetchError: fetchErrorPost } = useFetch<any>();

    const reservations: Ref<Reservation[] | null> = ref([]);
    const reservation: Ref<Reservation | null> = ref(null);

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    async function getReservations(qs: string) {

        const reservationsData = await getAuth(`/reservations?${qs}`);

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

    async function getReservation(reservationId: number) {
        const reservationData = await getDetail(`/reservations/${reservationId}`);
        if (fetchErrorDetail.value) {
            reservation.value = null;
            error.value = true;
            errorMessages.value.push(fetchErrorDetail.value);
            return;
        }
        else {
            reservation.value = reservationData;
        }
    }

    async function getUserReservations() {
        const reservationsData = await getAuth(`/reservations/user`);

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
            formData.value.emailConfirmation.length === 0 ||
            !formData.value.emailConfirmation.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            formData.value.emailConfirmation.length > 255
        ) {
            errorMessages.value.push("La confirmación de email introducida no es válida.");
            error.value = true;
        }

        if (
            formData.value.email !== formData.value.emailConfirmation
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


    }

    function validateSecondForm() {

        error.value = false;
        errorMessages.value = [];

        if (! /^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/.test(formData.value.postalCode)) {
            errorMessages.value.push("El código postal introducido no es válido.");
            error.value = true;
        }

        if (formData.value.address.length === 0 || formData.value.location.length === 0) {
            errorMessages.value.push("Debes especificar la dirección y la localidad.");
            error.value = true;
        }

        if (!/^4[0-9]{12}(?:[0-9]{3})?$/.test(formData.value.cardNumber)) {
            errorMessages.value.push("El número de la tarjeta de crédito no es válido");
            error.value = true;
        }

        if (!/^[0-9]{3}$/.test(formData.value.securityCode)) {
            errorMessages.value.push("El código de seguridad no es válido");
            error.value = true;
        }




    }

    const validateCheckBox = () => {

        if (!formData.value.checkbox) {
            errorMessages.value.push("Debes aceptar las condiciones de reserva.");
            error.value = true;
        }

        if (!formData.value.adult) {
            errorMessages.value.push("El titular y los acompañantes deben ser mayores de edad.");
            error.value = true;
        }
    }

    const manageReservation = async (experienceId: string | number) => {

        error.value = false;
        errorMessages.value = [];

        validateCheckBox();
        if (error.value) return false;

        const data = await postReservation(`/reservations/${experienceId}`,
            {
                ...formData.value,
            });

        if (fetchErrorPost.value) {
            data.value = null;
            error.value = true;
            errorMessages.value.push(fetchErrorPost.value);

        }
        else {
            return;
        }
    }

    const sendEmail = async (reservationId: number) => {
        let reservationsData = await sendEmailFetch(`/reservations/sendEmail/${reservationId}`);

        if (sendEmailError.value) {
            error.value = true;
            errorMessages.value.push("Ha habido un problema al enviar el correo. Inteńtalo más tarde por favor.");
        }
        else {
            reservationsData = null;
            error.value = false;
        }

    }

    return { isLoadingDetail, isLoadingReservations, getReservation, reservation, selectedAirportIn, horaPartidaFirstDay, horaPartidaLastDay, horaLlegadaLastDay, horaLlegadaFirstDay, formData, reservations, error, errorMessages, getReservations, validateForm, validateSecondForm, availableAirportsDestination, availableAirportsOrigin, sendEmail, manageReservation, validateCheckBox, getUserReservations };
};
