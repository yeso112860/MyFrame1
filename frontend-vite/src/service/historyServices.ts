import axios from "axios";
import { apiBaseURL } from "~/utilities/constants";

export const getHistory = async (
    id: string,
    url: string,
) => {
    return await axios.post(`${apiBaseURL}${url}`, {
        object: { id: id },
    });
};
