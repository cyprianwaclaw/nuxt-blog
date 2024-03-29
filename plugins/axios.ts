import axios from 'axios';
import { useAuth } from "@/store/useAuth";

export default defineNuxtPlugin(() => {

    const auth = useAuth();
    const token = auth?.token
    const API_URL = useRuntimeConfig().public.API_URL
    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            'Access-Control-Allow-Headers': '*',
            Authorization: `Bearer ${token || ''}`,
        },
    });

    return {
        provide: {
            axiosInstance: axiosInstance
        }
    }
})