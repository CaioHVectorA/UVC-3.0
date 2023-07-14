import { LOGIN_LOCAL_STORAGE } from "../envariables"
import { decryptData } from "./CryptoFunctions"
import hasWindow from "./hasWindow"

export default function SameUser(id: string): boolean {
    const res = !!(hasWindow() &&
        localStorage.getItem(LOGIN_LOCAL_STORAGE) &&
        decryptData(localStorage.getItem(LOGIN_LOCAL_STORAGE)) &&
        decryptData(localStorage.getItem(LOGIN_LOCAL_STORAGE)).data.id === id)
    return res
}