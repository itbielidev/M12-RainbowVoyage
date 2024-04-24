import { ref, type Ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useAuthStore } from "@/stores/auth";
import type { LoginPayLoad, TokenType } from "@/types";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

export const useLogin = () => {

    const { token, isAdmin } = storeToRefs(useAuthStore());
    const { post, fetchError } = useFetch<TokenType>();

    const error: Ref<boolean> = ref(false);
    const errorMessages: Ref<string[]> = ref([]);

    const router = useRouter();


    const formData: Ref<LoginPayLoad> = ref({
        email: "",
        password: "",
    });

    const validateEmail = () => {
        if (
            formData.value.email.length === 0 ||
            !formData.value.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
            formData.value.email.length > 255
        ) {
            errorMessages.value.push("El email introducido no es válido.");
            error.value = true;
        }

    }

    const validatePassword = () => {

        if (formData.value.password.length === 0 || formData.value.password.length < 6 || formData.value.password.length > 20) {
            errorMessages.value.push("La contraseña debe tener entre 6 y 20 carácteres.");
            error.value = true;
        }
    }


    const manageLogin = async () => {

        error.value = false;
        errorMessages.value = [];

        validateEmail();
        validatePassword();

        if (error.value) return false;

        const tokenData = await post("/users/login",
            {
                ...formData.value,
            });

        token.value = tokenData?.token as string;

        if (fetchError.value) {
            error.value = true;
            errorMessages.value.push(fetchError.value);
            return false;
        }
        else {

            if (formData.value.email === "admin@gmail.com") {
                isAdmin.value = true;
                router.push("/admin");

            }

            return true;
        }
    }

    return { formData, errorMessages, error, manageLogin };
};
