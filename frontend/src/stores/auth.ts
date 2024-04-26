import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import { type UserPreference, type LoginPayLoad, type RegisterPayLoad, type User } from "@/types/index";
import { useFetch } from "@/composables/useFetch";
import router from "@/router";

export const useAuthStore = defineStore('auth', () => {

    interface Preferences {
        num_people_min: null | string | number
        num_people_max: null | string | number
        duration_min: null | string | number
        duration_max: null | string | number
        type: null | string
        price_min: null | string | number
        price_max: null | string | number
    }
    const formData = ref<Preferences>({
        num_people_min: "1",
        num_people_max: "10",
        duration_min: "1",
        duration_max: "5",
        type: "festive",
        price_min: "600",
        price_max: "1500"
    })

    const { getAuth } = useFetch<User>();
    const { postAuth, fetchError, isLoading } = useFetch<UserPreference>();
    const token: Ref<string> = useStorage("token", "", sessionStorage);
    const userIsLoggedIn = computed(() => token.value !== "" ? true : false);

    const isAdmin: Ref<boolean> = useStorage('admin', false, sessionStorage);

    const user: Ref<User | null> = useStorage("user", null, sessionStorage);

    const name: Ref<string | null> = useStorage("username", "", sessionStorage);
    const email: Ref<string | null> = useStorage("email", "", sessionStorage);
    const phone: Ref<string | null> = useStorage('phone', "", sessionStorage);
    const lastName: Ref<string | null> = useStorage('lastName', "", sessionStorage);

    /*USER FILTERS EXPERIENCES*/
    const num_people_min: Ref<string | null> = useStorage("num_people_min", "", sessionStorage);
    const num_people_max: Ref<string | null> = useStorage("num_people_max", "", sessionStorage);
    const duration_min: Ref<string | null> = useStorage("duration_min", "", sessionStorage);
    const duration_max: Ref<string | null> = useStorage("duration_max", "", sessionStorage);
    const type: Ref<string | null> = useStorage("experience_type", "", sessionStorage);
    const price_min: Ref<string | null> = useStorage("price_min", "", sessionStorage);
    const price_max: Ref<string | null> = useStorage("price_max", "", sessionStorage);

    async function logout() {
        token.value = "";
        isAdmin.value = false;
        user.value = null;

        name.value = "";
        lastName.value = "";
        phone.value = "";
        email.value = "";

        num_people_max.value = ""
        num_people_min.value = ""
        duration_min.value = ""
        duration_max.value = ""
        type.value = ""
        price_min.value = ""
        price_max.value = ""

        router.push("/");
    }

    async function getUser() {
        user.value = await getAuth("/users");

        name.value = user.value?.name as string;
        email.value = user.value?.email as string;
        phone.value = user.value?.phone as string;
        lastName.value = user.value?.last_name as string;

        num_people_max.value = user.value?.preference?.num_people_max?.toString() as string;
        num_people_min.value = user.value?.preference?.num_people_min?.toString() as string;
        duration_min.value = user.value?.preference?.duration_min?.toString() as string;
        duration_max.value = user.value?.preference?.duration_max?.toString() as string;
        type.value = user.value?.preference?.type?.toString() as string;
        price_min.value = user.value?.preference?.price_min?.toString() as string;
        price_max.value = user.value?.preference?.price_max?.toString() as string;
    }

    async function updatePreferences() {

        formData.value.duration_max = Number(formData.value.duration_max) || 0;
        formData.value.duration_min = Number(formData.value.duration_min) || 0;
        formData.value.num_people_max = Number(formData.value.num_people_max) || 0;
        formData.value.num_people_min = Number(formData.value.num_people_min) || 0;
        formData.value.price_min = Number(formData.value.price_min) || 0;
        formData.value.price_max = Number(formData.value.price_max) || 0;
        formData.value.type = formData.value.type || "";

        const preferences = await postAuth("/users/preferences", formData.value);

        if (fetchError.value) {
            num_people_max.value = ""
            num_people_min.value = ""
            duration_min.value = ""
            duration_max.value = ""
            type.value = ""
            price_min.value = ""
            price_max.value = ""
        }
        else {
            num_people_max.value = preferences?.num_people_max?.toString() as string
            num_people_min.value = preferences?.num_people_min?.toString() as string
            duration_min.value = preferences?.duration_min?.toString() as string
            duration_max.value = preferences?.duration_max?.toString() as string
            type.value = preferences?.type?.toString() as string
            price_min.value = preferences?.price_min?.toString() as string
            price_max.value = preferences?.price_max?.toString() as string
        }

    }

    // async function fetchUserData() {
    //     try {
    //         const response: Response = await fetch(`${apiEndpoint}/users/getData`, {
    //             method: 'GET',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Authorization": `Bearer ${token.value}`
    //             }
    //         });

    //         if (!response.ok) return;

    //         const userData: { email: string, name: string, photo: string } = await response.json();

    //         username.value = userData.name;
    //         userEmail.value = userData.email;
    //         userPhoto.value = userData.photo === "" ? "/imgs/avatar-profile.svg" : userData.photo;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return { token, updatePreferences, formData, price_min, price_max, userIsLoggedIn, user, isAdmin, logout, getUser, name, email, phone, lastName, num_people_max, num_people_min, duration_max, duration_min, type }
})