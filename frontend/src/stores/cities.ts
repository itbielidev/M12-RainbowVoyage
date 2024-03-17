import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { type Ref } from "vue";
import type {City} from "@/types/index";
import { useFetch } from "@/composables/useFetch";

export const useAuthStore = defineStore('cities', () => {

    const {get} = useFetch<City[]>();

    const cities : Ref<City[]|null> = useStorage("cities", [], sessionStorage);

    async function getAll() {
        cities.value = await get("/cities");
    }

    return { cities, getAll }
})