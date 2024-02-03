import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
})

export const get = async (url: string) => {
    const res = await api.get(url)
    const data = await res.data
    return data
}