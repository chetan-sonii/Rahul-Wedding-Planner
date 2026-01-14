import axios from "axios";

export const AxiosClient = axios.create({
    baseURL:"http://localhost:1213/api/v1/",
})