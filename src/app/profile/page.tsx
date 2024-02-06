"use client"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import getUserData from "@/utilities/functions/getUserData"
import axios from "axios"
import UserDataView from "./userDataView"
import { useEffect, useState } from "react"
import { User_Type } from "@/utilities/types"
import LoginModal from "@/components/Login"

export default function Page() {
    const [loginModal, setModal] = useState(false)
    const [userData, setUserData] = useState<User_Type | false>(false)
    const [isUser, setUser] = useState(false)
    useEffect(() => {
        const data = getUserData()
        console.log({ data })
        if (data && data.id) {
            setUser(true)
            console.log(data)
            axios.get(URL+`api/user/${data.id}`).then(res => {
                setUserData(res.data)
            })
        }
    }, [])
    return (
        <>
        {loginModal && <LoginModal isLogin={false} onClickKillThis={() => {
            window.location.reload()
        }} setUI={() => null}/>}
        {isUser ? <>
            {userData ? <>
                <UserDataView userData={userData} />
                </> : 
                <>
                Carregando...
                </>}
        </> : <>
        <main className=" flex flex-col gap-2 items-center">
            <h3 className=" text-center mt-3">Que pena! Você não tem uma conta.</h3>
            <p className=" text-2xl underline cursor-pointer" onClick={() => setModal(true)}>Experimente Criar uma!</p>
        </main>
        </>}
        </>
    )
}