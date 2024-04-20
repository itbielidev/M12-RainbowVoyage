import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import type { City } from "@/types/index";
import { useFetch } from "@/composables/useFetch";

export const useCitiesStore = defineStore('cities', () => {

    const { get, fetchError, isLoading } = useFetch<{ cities: City[] }>();

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const cities: Ref<City[] | null | undefined> = useStorage("cities", [], sessionStorage);

    //To apply hover effect in main page.
    const hoveredCities = computed(() => {
        return cities.value?.map(city => ({ ...city, hovered: false }))
    })

    async function getAll() {
        const citiesData = await get("/cities");

        if (fetchError.value) {
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {
            cities.value = citiesData?.cities;
        }
    }

    function getCityByName(name: string): number | undefined {
        return cities.value?.find(city => city.name === name)?.id
    }

    function getCityCoverImgByName(name: string, index: number): string | undefined {
        return cities.value?.find(city => city.name === name)?.images[index]
    }

    function getDescriptionDetailByName(name: string): string | undefined {
        return cities.value?.find(city => city.name === name)?.description_detail
    }

    return { cities, getAll, getCityByName, hoveredCities, error, errorMessages, isLoading, getDescriptionDetailByName, getCityCoverImgByName }
})