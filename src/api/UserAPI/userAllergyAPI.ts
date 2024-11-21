import axios from "axios";

export const compareUserAllergies = async (uno: number, imageAllergies: string[]) => {

    const response = await axios.post(`http://localhost:8080/api/v1/user/compare-allergies/${uno}`, imageAllergies);
    return response.data;
};
