import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, type Ref } from "vue";
import type { LoginPayLoad, RegisterPayLoad, User } from "@/types/index";
import { useFetch } from "@/composables/useFetch";
import router from "@/router";

export const useAuthStore = defineStore('auth', () => {

    const { getAuth } = useFetch<User>();

    const token: Ref<string> = useStorage("token", "", sessionStorage);
    const userIsLoggedIn = computed(() => token.value !== "" ? true : false);

    const isAdmin: Ref<boolean> = useStorage('admin', false, sessionStorage);

    const user: Ref<User | null> = useStorage("user", null, sessionStorage);



    const name: Ref<string | null> = useStorage("username", "", sessionStorage);
    const email: Ref<string | null> = useStorage("email", "", sessionStorage);
    const phone: Ref<string | null> = useStorage('phone', "", sessionStorage);
    const lastName: Ref<string | null> = useStorage('lastName', "", sessionStorage);


    async function logout() {
        token.value = "";
        isAdmin.value = false;
        user.value = null;

        name.value = "";
        lastName.value = "";
        phone.value = "";
        email.value = "";

        router.push("/");
    }

    async function getUser() {
        user.value = await getAuth("/users");

        name.value = user.value?.name as string;
        email.value = user.value?.email as string;
        phone.value = user.value?.phone as string;
        lastName.value = user.value?.last_name as string;
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

    return { token, userIsLoggedIn, user, isAdmin, logout, getUser, name, email, phone, lastName }
})