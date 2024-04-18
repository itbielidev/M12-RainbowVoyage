import type { Experience } from "@/types";
import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";

export const useExperiences = () => {

    const { get, fetchError, isLoading } = useFetch<Experience[]>();

    const { get: getExperienceFetch, fetchError: fetchErrorExperience } = useFetch<Experience>();

    const experiences: Ref<Experience[] | null> = ref([]);
    const experience: Ref<Experience | null> = ref(null);

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    async function getExperiences(cityId: string | number, qs: string) {
        //experiences.value = await get(`/experiences/${cityId}?${qs}`);
        const experiencesData = await get(`/experiences/${cityId}?${qs}`);

        if (fetchError.value) {
            experiences.value = null;
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {
            experiences.value = experiencesData;
        }
    }

    async function getExperience(experienceId: string | number) {
        const experienceData = await getExperienceFetch(`/experiences/detail/${experienceId}`);
        if (fetchErrorExperience.value) {
            experience.value = null;
            error.value = true;
            errorMessages.value.push(fetchErrorExperience.value);
            return false;
        }
        else {
            experience.value = experienceData;
        }
    }

    return { experiences, experience, getExperiences, getExperience, error, errorMessages, isLoading };
};
