import { useToast } from 'primevue/usetoast'


export default function useCustomToast() {
    const toast = useToast()

    const showSuccess = () => {
        toast.add({ severity: 'info', summary: 'Modificación de perfil', detail: 'Datos actualizados correctamente', life: 4000 });
    };

    const showSuccessPreferences = () => {
        toast.add({ severity: 'info', summary: 'Modificación de filtros', detail: 'Filtros establecidos correctamente', life: 4000 });

    }

    const showSuccessEmail = () => {
        toast.add({ severity: 'info', summary: 'Confirmación de reserva', detail: 'Confirmación enviada correctamente', life: 4000 });

    }
    return { showSuccess, showSuccessPreferences, showSuccessEmail }
}