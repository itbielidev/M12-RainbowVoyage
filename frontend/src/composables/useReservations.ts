import type { Reservation } from "@/types";
import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";

export const useReservations = () => {

    const { get, fetchError } = useFetch<Reservation[]>();

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


    return { reservations, error, errorMessages, getReservations };
};
