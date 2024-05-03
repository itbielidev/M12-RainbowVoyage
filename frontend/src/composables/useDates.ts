import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import type { DateAvailability } from "@/types";

export const useDates = () => {

    const { post, fetchError, isLoading } = useFetch<DateAvailability[] | null>();
    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const monthsSelect = ["Mayo 2024", "Junio 2024", "Julio 2024", "Agosto 2024", "Setiembre 2024", "Octubre 2024", "Noviembre 2024", "Diciembre 2024", "Enero 2025", "Febrero 2025", "Marzo 2025"]

    const formData = ref<any>({
        selectedMonth: "Mayo 2024",
        numPeople: null
    })

    const dateSelected = ref<string>("");
    const selectedDateId = ref<number>(-1)

    const datesAvailable = ref<DateAvailability[] | null>([]);

    const checkAvailableDates = async (experienceId: string) => {

        const [monthSelected, yearSelected] = formData.value.selectedMonth.split(" ");

        const datesData = await post(`/dates/${experienceId}`, {
            month: monthSelected,
            year: yearSelected,
            people: formData.value.numPeople
        });

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

    function formatDate(dateReceived: Date) {
        const date = new Date(dateReceived);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = `${day}/${month}`;
        return formattedDate;
    }

    function formatDateYear(dateReceived: Date) {
        const date = new Date(dateReceived);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = (date.getFullYear()).toString().padStart(4, '0');

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    return { monthsSelect, formData, formatDate, formatDateYear, checkAvailableDates, selectedDateId, datesAvailable, isLoading, error, errorMessages, dateSelected };
};
