"use client"
import { AppContext } from "@/components/Context/AppContext";
import { UserWithAllData, User_Type } from "@/utilities/types";
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables";
import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { AiFillEdit } from 'react-icons/ai'
import { BsFillCloudUploadFill } from "react-icons/bs";
import { saveImage } from "@/server/saveImage";
import { BiCamera } from "react-icons/bi";
import { SwitchImageDialog } from "./dialog";
import { DashboardContainer } from "./dashboard-container";
import { DataRender } from "./data-render";
import { formatDataForUi } from "@/utilities/functions/formatDataForUi";
async function updateUser({ id,imagePath,password,username }: { id:string, username?: string, imagePath?: string, password?: string }) {
    console.log(id)
    const data = await axios.put(URL+'api/user/',{
        id,
        username,
        password,
        imagePath,
    })
    localStorage.setItem(LOGIN_LOCAL_STORAGE, JSON.stringify({ id, image_path: data.data.image_path, username: data.data.username }))
    return data.data
}

export function UserDataView({ userData }: {userData: UserWithAllData}) {
    const [initialURL, setURL] = useState(`${URL}${userData.image_path}`)
    const [isModalOpen, setModalOpen] = useState(false)
    const { img,setImg } = useContext(AppContext)
    const action = useCallback(async (img: string) => {
        updateUser({ id: userData.id, imagePath: `/assets/user_images/${img}` }).then(res => {
            console.log(res)
            //@ts-ignore
            setURL(res.image_path)
            setImg(res.image_path)
            setModalOpen(false)
        }).catch(err => {alert('Ocorreu um erro ao mudar sua imagem.') ; console.log(err)})
    }, [])
    return (
        <>
            <SwitchImageDialog setValue={setModalOpen} open={isModalOpen} action={action} />
            <DashboardContainer>
                <div className=" flex flex-col items-center">
                    <div className=" relative">
                        <div className=" absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
                        <button onClick={() => setModalOpen(true)} className="bg-transparent p-1 border-0 shadow-none hover:bg-transparent hover:border-0">
                            <BiCamera size={24} fill="white"/>
                        </button>
                        </div>
                        <div className=" w-32 aspect-square flex items-center justify-center overflow-hidden border border-black rounded-full">
                            <img className=" w-full aspect-square object-cover" src={initialURL}/>
                        </div>
                    </div>
                    <h3 className=" text-black text-2xl mt-3 !mb-0">{userData.username}</h3>
                    {/* its just a code that returns a day/month/format, and i dont wanna write a bunch of lines above */}
                    <p className=" text-black opacity-80">Desde {formatDataForUi(userData.created_at)}</ p>
                </div>
                <div className=" py-2 max-md:w-full px-8 flex flex-col text-black">
                    <DataRender userData={userData}/>
                </div>
            </DashboardContainer>
        </>
    )
}