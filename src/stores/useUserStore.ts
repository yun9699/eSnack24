import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useUserStore = defineStore('userStore', () => {
    const user = ref<{ uno: number }>({uno: 0});
    const personalAllergies = ref<{ anos: number[] }>({ anos: [] });
    const userEmail = ref<{ email: string }>({email: ''});

    const setUno = (uno: number) => user.value.uno = uno;

    const setPersonalAllergies = (anos: number[]) => {

        personalAllergies.value.anos = anos;
    };

    const setUserEmail = (email: string) => {

        userEmail.value.email = email;
    }


    const getUno = computed(() => user.value.uno);

    const getPersonalAllergies = computed(() => personalAllergies.value.anos);

    const getUserEmail = computed(() => userEmail.value.email);

    return {
        user, setUno, getUno,
        personalAllergies, setPersonalAllergies, getPersonalAllergies,
        userEmail, getUserEmail, setUserEmail
    };
}, {
    persist: true
});

export default useUserStore;
