import {defineStore} from "pinia";
import {computed, ref} from "vue";

const useUser = defineStore('userStore', () => {

    const user = ref({uno: 0});

    const setUno = (uno: number) => user.value.uno = uno;

    const getUno =  computed(() => user.value.uno);

    return {user, setUno, getUno};
});

export default useUser