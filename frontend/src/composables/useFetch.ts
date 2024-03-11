import { ref, type Ref } from "vue";
import axios, { type AxiosRequestConfig, AxiosError, type AxiosResponse } from "axios";

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
}

export const useFetch = <T>(): FetchReturn<T> => {
    const isLoading: Ref<boolean> = ref(false);
    const fetchError: Ref<string | null> = ref(null);

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
        } catch (axiosErr : any) {
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
        } else if (error.request) {
            console.error("Error de solicitud de Axios:", error.request);
            fetchError.value = "No se recibió respuesta del servidor";
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

    return { isLoading, fetchError, get, post, put, patch, del };
};
