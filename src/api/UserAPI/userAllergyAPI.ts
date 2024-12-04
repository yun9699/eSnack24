import axios from "axios";
import useUserStore from "../../stores/useUserStore.ts";

const user = useUserStore();

const host = "http://localhost:8080/api/v1/user"

export const compareUserAllergies = async (uno: number, imageAllergies: string[]) => {

    const response = await axios.post(`${host}/compare-allergies/${uno}`, imageAllergies);
    return response.data;
};

export const editUserAllergies = async (anos: number[]) => {

    const personalAllergy = { anos };

    user.setPersonalAllergies(anos);

    const res = await axios.post(`${host}/editAllergies/${user.getUno}`, personalAllergy);

    return res.data;
}
