import axios from "axios";

const host = "http://localhost:8080/api/v1/user"

export const compareUserAllergies = async (uno: number, imageAllergies: string[]) => {

    const response = await axios.post(`${host}/compare-allergies/${uno}`, imageAllergies);
    return response.data;
};
