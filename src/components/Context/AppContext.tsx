"use client"
import getUserData from "@/utilities/functions/getUserData";
import hasWindow from "@/utilities/functions/hasWindow";
import { ReactNode, createContext, useContext, useState } from "react";

type createContext = {
    img: string,
    setImg: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<createContext>({
    img: '',
    setImg: () => '',
})

export default function AppContextProvider({ children }: {children: ReactNode}) {
    //@ts-ignore
    const [img,setImg] = useState<string>('')
    console.log(img)
    return (
        <AppContext.Provider value={{setImg,img}}>
            {children}
        </AppContext.Provider>
    )
}