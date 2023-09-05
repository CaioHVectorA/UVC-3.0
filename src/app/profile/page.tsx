"use client"
import { URL } from "@/utilities/envariables"
import fetchData from "@/utilities/functions/FetchData"
import getUserData from "@/utilities/functions/getUserData"
import axios from "axios"
import UserDataView from "./userDataView"
import { useEffect, useState } from "react"
import { User_Type } from "@/utilities/Types"
import hasWindow from "@/utilities/functions/hasWindow"

export default function Page() {
    const data = getUserData()
    const [userData, setUserData] = useState<User_Type | false>(false)
    const [isUser, setUser] = useState(false)
    useEffect(() => {
        if (data) {
            setUser(true)
            axios.get(URL+`user/${data.id}`).then(res => {
                console.log(res.data)
                setUserData(res.data)
            })
        }
    }, [])
    return (
        <>
        {isUser ? <>
            {userData ? <>
                <UserDataView userData={userData} />
                </> : 
                <>
                Carregando...
                </>}
        </> : <>
        <main>
            <h1>Que pena! Você não tem uma conta.</h1>
        </main>
        </>}
        </>
    )
}