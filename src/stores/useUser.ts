import {defineStore} from "pinia";
import {computed, ref} from "vue";

const useUser = defineStore('userStore', () => {

    const user = ref({uno: 0});

    const personalAllergies = ref<{ anos: number[] }>({ anos: [] });

    const setUno = (uno: number) => user.value.uno = uno;

    const setPersonalAllergies = (anos: number[]) => {
        personalAllergies.value.anos = anos;
    };

    const getUno =  computed(() => user.value.uno);

    const getPersonalAllergies = computed(() => personalAllergies.value.anos);

    return {user, setUno, getUno, personalAllergies, setPersonalAllergies, getPersonalAllergies};
});

export default useUser