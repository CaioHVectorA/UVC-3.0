import { LOGIN_LOCAL_STORAGE } from "../envariables"
import { decryptData } from "./CryptoFunctions"
import hasWindow from "./hasWindow"

type User = {
    username: string,
    id: string,
}
export default function getUserData(): User | false {
    if (hasWindow()) {
        const user: any = decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE))
        return user.data || false
    }
}