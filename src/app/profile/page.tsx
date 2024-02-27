"use client"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import getUserData from "@/utilities/functions/getUserData"
import axios from "axios"
import { UserDataView } from "../../components/profile/user-dashboard"
import { useEffect, useState } from "react"
import { UserWithAllData, User_Type } from "@/utilities/types"
import LoginModal from "@/components/Login"
import { Fav, ReadLater, User } from "@prisma/client"
import { getAllUserData } from "@/server/getAllUserData"
import { DashboardContainer } from "@/components/profile/dashboard-container"
import { Skeleton } from "@/components/ui/skeleton"

export default () => {
    const [loginModal, setModal] = useState(false)
    const [userData, setUserData] = useState<UserWithAllData | null | false>(false)
    const [isUser, setUser] = useState(false)
    const data = getUserData()
    useEffect(() => {
        if (data) {
            setUser(true)
            console.log(data)
            getAllUserData(data.id).then(setUserData)
        }
    }, [])
    if (!userData) return (
    <DashboardContainer>
        <div className=" flex flex-col items-center">
            <Skeleton className=" w-32 aspect-square rounded-full"/>
            <Skeleton className={` w-32 h-6 mt-4`}/>
            <Skeleton className={` w-48 h-4 mt-2`}/>
        </div>
    </DashboardContainer>
    )
    return (
        <>
        {loginModal && <LoginModal isLogin={false} onClickKillThis={() => {
            window.location.reload()
        }} setUI={() => null}/>}
        {isUser ? <UserDataView userData={userData}/> : <>
        <main className=" flex flex-col gap-2 items-center">
            <h3 className=" text-center mt-3">Que pena! Você não tem uma conta.</h3>
            <p className=" text-2xl underline cursor-pointer" onClick={() => setModal(true)}>Experimente Criar uma!</p>
        </main>
        </>}
        </>
    )
}