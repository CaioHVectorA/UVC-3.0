import { LOGIN_LOCAL_STORAGE } from "../envariables"
import { decryptData } from "./CryptoFunctions"
import hasWindow from "./hasWindow"

type User = {
    username: string,
    id: string,
    image_path?: string,
}
//@ts-ignore
export default function getUserData(): User | false {
    if (hasWindow()) {
        try {
            const user: any = decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE))
            console.log(user)
            if (typeof user === 'string') return JSON.parse(user)
            if (typeof user.data === 'string') return JSON.parse(user.data)
            return user.data || user || false            
        } catch (error) {
            return false
        }
    }
}