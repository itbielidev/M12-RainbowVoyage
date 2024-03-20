import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, type Ref } from "vue";
import type { City } from "@/types/index";
import { useFetch } from "@/composables/useFetch";

export const useCitiesStore = defineStore('cities', () => {

    const { get } = useFetch<{ cities: City[] }>();

    const cities: Ref<City[] | null | undefined> = useStorage("cities", [], sessionStorage);

    //To apply hover effect in main page.
    const hoveredCities = computed(() => {
        return cities.value?.map(city => ({ ...city, hovered: false }))
    })

    async function getAll() {
        const citiesData = await get("/cities");
        cities.value = citiesData?.cities;
    }

    return { cities, getAll, hoveredCities }
})