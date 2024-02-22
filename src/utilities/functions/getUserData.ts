import { LOGIN_LOCAL_STORAGE } from "../envariables"
import { decryptData } from "./CryptoFunctions"
import hasWindow from "./hasWindow"

export type User_Session = {
    username: string,
    id: string,
    image_path?: string,
}
//@ts-ignore
export default function getUserData(): User_Session | false {
    if (hasWindow()) {
        try {
            const user = decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE))
            if (typeof user === 'string') return JSON.parse(user)
            if (typeof user.data === 'string') return JSON.parse(user.data)
            return user.data || user || false            
        } catch (error) {
            console.log(error)
            return false
        }
    }
}