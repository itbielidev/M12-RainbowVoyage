import { ref, type Ref } from "vue";
import axios, { type AxiosRequestConfig, AxiosError, type AxiosResponse } from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

interface FetchOptions {
    method?: string;
    payload?: any;
}

interface FetchReturn<T> {
    isLoading: Ref<boolean>;
    fetchError: Ref<string | null>;
    get: (url: string) => Promise<T | null>;
    post: (url: string, payload: any) => Promise<T | null>;
    put: (url: string, payload: any) => Promise<T | null>;
    patch: (url: string, payload: any) => Promise<T | null>;
    del: (url: string) => Promise<T | null>;
    getAuth: (url: string) => Promise<T | null>;
    postAuth: (url: string, payload: any) => Promise<T | null>;
    putAuth: (url: string, payload: any) => Promise<T | null>;
    patchAuth: (url: string, payload: any) => Promise<T | null>;
    delAuth: (url: string) => Promise<T | null>;
}

export const useFetch = <T>(): FetchReturn<T> => {
    const isLoading: Ref<boolean> = ref(false);
    const fetchError: Ref<string | null> = ref(null);
    const { logout } = useAuthStore();
    const { token } = storeToRefs(useAuthStore());

    const router = useRouter();

    const fetchData = async <T>(
        url: string,
        { method = 'GET', payload }: FetchOptions = {}
    ): Promise<T | null> => {
        isLoading.value = true;
        fetchError.value = null;

        const apiPrefix: string = import.meta.env.VITE_API_ENDPOINT;

        const apiEndpoint: string = `${apiPrefix}${url}`;

        const axiosConfig: AxiosRequestConfig = {
            method,
            url: apiEndpoint, //Cambiar esto por apiEndpoint !!!!!!!
            data: payload,
        };

        try {
            const response: AxiosResponse<T> = await axios(axiosConfig);
            return response.data;
        } catch (axiosErr: any) {
            handleAxiosError(axiosErr);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchDataAuth = async <T>(
        url: string,
        { method = 'GET', payload }: FetchOptions = {}
    ): Promise<T | null> => {
        isLoading.value = true;
        fetchError.value = null;

        const apiPrefix: string = import.meta.env.VITE_API_ENDPOINT;
        const apiEndpoint: string = `${apiPrefix}${url}`;

        const { token } = storeToRefs(useAuthStore());
        const axiosConfig: AxiosRequestConfig = {
            method,
            url: apiEndpoint, //Cambiar esto por apiEndpoint !!!!!!!
            data: payload,
            headers: {
                "Authorization": `Bearer ${token.value}`
            }
        };

        try {
            const response: AxiosResponse<T> = await axios(axiosConfig);
            return response.data;
        } catch (axiosErr: any) {
            handleAxiosError(axiosErr);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    const handleAxiosError = (error: AxiosError) => {
        if (error.response) {
            console.error("Error de respuesta de Axios:", error.response.data);
            fetchError.value = (error.response && error.response.data) ? error.response.data.toString() : "Error de respuesta del servidor";
            if (error.response?.status === 422) {
                fetchError.value = "La validación de datos en el servidor ha fallado."
            }
            else if (error.response?.status === 500) {
                fetchError.value = "El servidor ha experimentado un error. pPor favor, inténtalo de nuevo más tarde."
            }
            else if (error.response?.status === 403 || error.response?.status === 401) {
                fetchError.value = "La contraseña es incorrecta o el usuario no está autorizado en el sistema."
                router.push("/");
                logout();
            }
            else if (error.response?.status === 409) {
                fetchError.value = "El correo especificado ya existe en nuestro sistema. Por favor, escoge otro correo."
            }
            else if (error.response?.status === 404) {
                fetchError.value = "El correo especificado no existe en el sistema. Revísalo por favor."
            }
        } else if (error.request) {
            console.error("Error de solicitud de Axios:", error.request);
            fetchError.value = "Nuestro servidor no está disponible en estos momentos, por favor, inténtalo más tarde.";
        } else {
            console.error("Error de Axios:", error.message);
            fetchError.value = "Error al realizar la solicitud";
        }
    };

    const get = async (url: string): Promise<T | null> => fetchData<T>(url);
    const post = async (url: string, payload: any): Promise<T | null> => fetchData<T>(url, { method: 'POST', payload });
    const put = async (url: string, payload: any): Promise<T | null> => fetchData<T>(url, { method: 'PUT', payload });
    const patch = async (url: string, payload: any): Promise<T | null> => fetchData<T>(url, { method: 'PATCH', payload });
    const del = async (url: string): Promise<T | null> => fetchData<T>(url, { method: 'DELETE' });

    const getAuth = async (url: string): Promise<T | null> => fetchDataAuth<T>(url);
    const postAuth = async (url: string, payload: any): Promise<T | null> => fetchDataAuth<T>(url, { method: 'POST', payload });
    const putAuth = async (url: string, payload: any): Promise<T | null> => fetchDataAuth<T>(url, { method: 'PUT', payload });
    const patchAuth = async (url: string, payload: any): Promise<T | null> => fetchDataAuth<T>(url, { method: 'PATCH', payload });
    const delAuth = async (url: string): Promise<T | null> => fetchDataAuth<T>(url, { method: 'DELETE' });

    return { isLoading, fetchError, get, post, put, patch, del, getAuth, postAuth, putAuth, patchAuth, delAuth };
};
