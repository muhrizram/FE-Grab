import type { AxiosInstance } from "axios"
import axios from "axios"
// import Cookies from "js-cookie"
import { getUserToken } from "../utils"

export const apiApp: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

apiApp.interceptors.request.use((config) => {
    const token = getUserToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})