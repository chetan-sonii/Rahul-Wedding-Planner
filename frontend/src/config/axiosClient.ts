import axios from "axios";

export const AxiosClient = axios.create({
    baseURL:"http://localhost:5001/api/v1/",
})