import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useUserStore = defineStore('userStore', () => {
    const user = ref< {
        uno: number, anos: number[], email: string, username: string, accessToken: string, refreshToken: string } >(
            {
                uno: 0,
                anos: [],
                email: '',
                username: '',
                accessToken: '',
                refreshToken: ''
            });

    const setUno = (uno: number) => user.value.uno = uno;

    const setPersonalAllergies = (anos: number[]) => {

        user.value.anos = anos;
    };

    const setUserEmail = (email: string) => {

        user.value.email = email;
    }

    const setUserName = (username: string) => {

        user.value.username = username;
    }

    const setAccessToken = (accessToken: string) => {

        user.value.accessToken = accessToken;
    }

    const setRefreshToken = (refreshToken: string) => {

        user.value.refreshToken = refreshToken;
    }


    const getUno = computed(() => user.value.uno);

    const getPersonalAllergies = computed(() => user.value.anos);

    const getUserEmail = computed(() => user.value.email);

    const getUserName = computed(() => user.value.username);

    const getAccessToken = computed(() => user.value.accessToken);

    const getRefreshToken = computed(() => user.value.refreshToken);

    return {
        user, setUno, getUno,
        setPersonalAllergies, getPersonalAllergies,
        setUserEmail, getUserEmail,
        setUserName, getUserName,
        setAccessToken, getAccessToken,
        setRefreshToken, getRefreshToken,
    };
}, {
    persist: true
});

export default useUserStore;
