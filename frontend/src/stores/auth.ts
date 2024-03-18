import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, type Ref } from "vue";
import type {LoginPayLoad, RegisterPayLoad, User} from "@/types/index";
import { useFetch } from "@/composables/useFetch";

export const useAuthStore = defineStore('auth', () => {

    const {post} = useFetch<User>();

    const token: Ref<string> = useStorage("token", "", sessionStorage);
    const userIsLoggedIn = computed(() => token.value !== "" ? true : false);
    
    const user: Ref<User | null> = useStorage("user", null, sessionStorage);
    
    // const username: Ref<string | null> = useStorage("username", "");
    // const email: Ref<string | null> = useStorage("email", "");
    // const type: Ref<string| null> = useStorage('type', "");
    // const userphoto: Ref<string | null> = useStorage("userPhoto", "");

    async function register(payload: RegisterPayLoad) {
        user.value = await post("/users/register", payload);
    }

    async function login(payload: LoginPayLoad) {
        user.value = await post("/users/login", payload);
    }

    async function logout() {
        token.value = "";
        user.value = null;
    }

    // function setToken(tokenValue: string) {
    //     token.value = tokenValue;
    //     localStorage.setItem("token", tokenValue);
    // }

    // function getToken() {
    //     return token.value;
    // }

    // function deleteToken() {
    //     token.value = '';
    //     username.value = null;
    //     userEmail.value = null;
    //     userPhoto.value = null;
    //     localStorage.removeItem('token');
    // }
    // const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

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

    return { token, userIsLoggedIn, user, register, login, logout }
})