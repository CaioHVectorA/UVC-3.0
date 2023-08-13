import { LOGIN_LOCAL_STORAGE } from "../envariables"
import { decryptData } from "./CryptoFunctions"

type User = {
    username: string,
    id: string,
}
export default function getUserData(): User | false {
    const user: any = decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE))
    return user.data || false
}