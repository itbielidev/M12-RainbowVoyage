import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";

export const useDates = () => {

    const { get, fetchError, isLoading } = useFetch<any>();
    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const monthsSelect = ["Mayo 2024", "Junio 2024", "Julio 2024", "Agosto 2024", "Setiembre 2024", "Octubre 2024", "Noviembre 2024", "Diciembre 2024", "Enero 2025", "Febrero 2025", "Marzo 2025"]

    const formData = ref<any>({
        selectedMonth: "Mayo 2024",
        numPeople: "2"
    })

    const datesAvailable = ref<string[] | null>([]);

    const checkAvailableDates = async () => {
        const datesData = await get("/dates")

        if (fetchError.value) {
            datesAvailable.value = null;
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {
            datesAvailable.value = datesData;
        }
    }

    return { monthsSelect, formData, checkAvailableDates, datesAvailable, isLoading };
};
