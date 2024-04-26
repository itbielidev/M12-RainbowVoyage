import { useToast } from 'primevue/usetoast'


export default function useCustomToast() {
    const toast = useToast()

    const showSuccess = () => {
        toast.add({ severity: 'info', summary: 'Modificación de perfil', detail: 'Datos actualizados correctamente', life: 3000 });
    };
    return { showSuccess }
}