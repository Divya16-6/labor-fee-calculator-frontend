import axios from "axios";
import { API_BASE_URL } from "./apiConfig"

export const calculateLaborFee = async ({ startDate, endDate, perHourCharge, overTimeCharge }) => {
    const response = await axios.post(`${API_BASE_URL}/Labor/calculate`, {
        startDate,
        endDate,
        perHourCharge: perHourCharge ? Number(perHourCharge) : null,
        overTimeCharge: overTimeCharge ? Number(overTimeCharge) : null
    });
    return response.data;
};