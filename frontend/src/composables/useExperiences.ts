import type { Experience } from "@/types";
import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";

export const useExperiences = () => {

    const {get} = useFetch<Experience[]>();
    
    const experiences : Ref<Experience[]|null> = ref([]);

    async function getByCityId(cityId : string|number) {
        experiences.value = await get(`/experiences/${cityId}`);
    }

    return { experiences, getByCityId };
};
