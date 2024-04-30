import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import { type UserPreference, type User } from "@/types/index";
import { useFetch } from "@/composables/useFetch";
import useCustomToast from '@/composables/useCustomToast'
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

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);
    const emailError: Ref<boolean> = ref(false);
    const emailErrorMessages: Ref<string[]> = ref([]);
    const passwordError: Ref<boolean> = ref(false);
    const passwordErrorMessages: Ref<string[]> = ref([]);

    const { getAuth } = useFetch<User>();
    const { postAuth, fetchError, isLoading } = useFetch<UserPreference>();
    const { postAuth: updateUserData, fetchError: updateUserDataError } = useFetch<any>()
    const { postAuth: updateEmail, fetchError: updateEmailError } = useFetch<any>()
    const { postAuth: updatePassword, fetchError: updatePasswordError } = useFetch<any>()

    const { showSuccess } = useCustomToast()

    const token: Ref<string> = useStorage("token", "", sessionStorage);
    const userIsLoggedIn = computed(() => token.value !== "" ? true : false);

    const isAdmin: Ref<boolean> = useStorage('admin', false, sessionStorage);

    const user: Ref<User | null> = useStorage("user", null, sessionStorage);

    const name: Ref<string | null> = useStorage("username", "", sessionStorage);
    const email: Ref<string | null> = useStorage("email", "", sessionStorage);
    const phone: Ref<string | null> = useStorage('phone', "", sessionStorage);
    const lastName: Ref<string | null> = useStorage('lastName', "", sessionStorage);


    /*First Data User Form*/
    const userData = ref<{ name: string, last_name: string, phone: string }>({
        name: name.value as string,
        last_name: lastName.value as string,
        phone: phone.value as string
    })

    /*New email form*/
    const newEmail = ref<{ email: string, confirmEmail: string }>({
        email: "",
        confirmEmail: ""
    })

    /*New password form */
    const newPassword = ref<{ password: string, confirmPassword: string }>({
        password: "",
        confirmPassword: ""
    })

    /*Verify first data user form*/
    function verifyUserData() {
        error.value = false;
        errorMessages.value = [];

        if (userData.value?.name?.length === 0 || userData?.value?.name?.length < 1 || userData?.value?.name?.length > 100) {
            errorMessages.value.push("El nombre de usuario debe tener entre 1 y 100 carácteres.");
            error.value = true;
        }
        if (userData.value?.last_name?.length === 0 || userData.value.last_name.length < 1 || userData.value.last_name.length > 100) {
            errorMessages.value.push("Los apellidos debe tener entre 1 y 100 carácteres.");
            error.value = true;
        }
        if (/\d/
            .test(userData?.value?.name) && userData?.value?.name?.length > 0) {
            errorMessages.value.push("El nombre no debe contener carácteres numéricos");
            error.value = true;
        }

        if (userData.value.phone === "" || /[\p{L}]/u.test(userData.value.phone as string) || userData?.value?.phone?.length !== 9) {
            errorMessages.value.push("El número de teléfono introducido no es correcto. El teléfono debe tener exactamente 9 dígitos.");
            error.value = true;
        }

        if (/\d/
            .test(userData.value.last_name as string) && userData?.value?.last_name?.length > 0) {
            errorMessages.value.push("Los apellidos no deben contener carácteres numéricos");
            error.value = true;
        }

        if (userData.value.name === name.value && userData.value.last_name === lastName.value && userData.value.phone === phone.value) {
            errorMessages.value.push("Algún dato deber ser diferente para poder realizar el cambio.");
            error.value = true;
        }
    }


    async function modifyUserData() {
        verifyUserData()

        //Restore previous value in case of error
        if (error.value) {
            userData.value.name = name.value as string;
            userData.value.last_name = lastName.value as string;
            userData.value.phone as string
            return;
        }

        await updateUserData("/users/updateData", userData.value);

        //Restore previous value in case of error
        if (updateUserDataError.value) {
            errorMessages.value.push(updateUserDataError.value as string);
            error.value = true;
            userData.value.name = name.value as string;
            userData.value.last_name = lastName.value as string;
            userData.value.phone as string
            return;
        }

        //We get the user's data again
        await getUser()

        //Show toast
        showSuccess()
    }

    function verifyEmail() {
        emailError.value = false;
        emailErrorMessages.value = [];

        if (
            newEmail.value.email.length === 0 ||
            !newEmail.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            newEmail.value.email.length > 255
        ) {
            emailErrorMessages.value.push("El email introducido no es válido.");
            emailError.value = true;
        }

        if (
            newEmail.value.confirmEmail.length === 0 ||
            !newEmail.value.confirmEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            newEmail.value.confirmEmail.length > 255
        ) {
            emailErrorMessages.value.push("La confirmación de email introducida no es válida.");
            emailError.value = true;
        }

        if (
            newEmail.value.email !== newEmail.value.confirmEmail
        ) {
            emailErrorMessages.value.push("Los correos no coinciden");
            emailError.value = true;
        }

        if (newEmail.value.email === email.value) {
            emailErrorMessages.value.push("El correo debe ser diferente para poder realizar el cambio.");
            emailError.value = true;
        }
    }

    async function modifyEmail() {
        verifyEmail()
        if (emailError.value) {
            return
        }

        await updateEmail("/users/updateEmail", newEmail.value);

        if (updateEmailError.value) {
            emailErrorMessages.value.push(updateEmailError.value as string);
            emailError.value = true;
            newEmail.value.email = ""
            newEmail.value.confirmEmail = ""
            return;
        }

        //We get the user's data again
        await getUser()

        newEmail.value.email = ""
        newEmail.value.confirmEmail = ""

        //Show toast
        showSuccess()

    }

    function verifyPassword() {
        passwordError.value = false;
        passwordErrorMessages.value = [];

        if (newPassword.value.password.length === 0 || newPassword.value.password.length < 6 || newPassword.value.password.length > 20) {
            passwordErrorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
            passwordError.value = true;
        }
        if (newPassword.value.password !== newPassword.value.confirmPassword) {
            passwordErrorMessages.value.push("Las contraseñas no coinciden.");
            passwordError.value = true;
        }

    }

    async function modifyPassword() {
        verifyPassword()

        if (passwordError.value) {
            newPassword.value.password = ""
            newPassword.value.confirmPassword = ""
            return
        }

        await updatePassword("/users/updatePassword", newPassword.value);

        if (updatePasswordError.value) {
            passwordErrorMessages.value.push(updatePasswordError.value as string);
            passwordError.value = true;
            newPassword.value.password = ""
            newPassword.value.confirmPassword = ""
            return
        }

        await getUser()

        newPassword.value.password = ""
        newPassword.value.confirmPassword = ""

        //Show toast
        showSuccess()
    }

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

        //User data
        name.value = user.value?.name as string;
        email.value = user.value?.email as string;
        phone.value = user.value?.phone as string;
        lastName.value = user.value?.last_name as string;

        //User filters data
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

            await getUser()
            //Show toast
            showSuccess()
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

    return {
        modifyEmail,
        newEmail,
        modifyUserData,
        newPassword,
        modifyPassword,
        error,
        passwordError,
        passwordErrorMessages,
        errorMessages,
        emailError,
        emailErrorMessages,
        userData,
        token,
        updatePreferences,
        formData,
        price_min,
        price_max,
        userIsLoggedIn,
        user,
        isAdmin,
        logout,
        getUser,
        name,
        email,
        phone,
        lastName,
        num_people_max,
        num_people_min,
        duration_max,
        duration_min,
        type
    }
})