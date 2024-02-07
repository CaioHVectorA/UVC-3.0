"use client"
import { AppContext } from "@/components/Context/AppContext";
import { User_Type } from "@/utilities/types";
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables";
import { encryptData } from "@/utilities/functions/CryptoFunctions";
import { getBase64 } from "@/utilities/functions/getBase64";
import axios from "axios";
import { useContext, useState } from "react";
import { AiFillEdit } from 'react-icons/ai'
import { BsFillCloudUploadFill } from "react-icons/bs";
import { saveImage } from "@/server/saveImage";
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

export default function UserDataView({userData}: {userData: User_Type}) {
    const [initialURL, setURL] = useState(`${URL}${userData.image_path}`)
    const { img,setImg } = useContext(AppContext)
    return (
        <main className=" flex max-md:flex-col max-md:items-center mt-8 px-4 w-10/12 mx-auto rounded-2xl py-2 bg-white text-black">
            <div className=" flex flex-col items-center w-2/12">
                <div className=" relative">
                    <div className=" absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
                    <input onChange={async (e) => {
                        if (!!!e.target.files) return
                        if (e.target.files) console.log(e.target.files[0])
                        const img = await getBase64(e.target.files[0])
                        updateUser({ id: userData.id, imagePath: img }).then(res => {
                            console.log(res)
                            //@ts-ignore
                            setURL(img)
                            setImg(img)
                        }).catch(err => {alert('Ocorreu um erro ao mudar sua imagem.') ; console.log(err)})
                    }} id="file" type="file" accept=".png" className=" hidden"/>
                    <label htmlFor="file" className="cursor-pointer">
                        <BsFillCloudUploadFill size={24} fill="white"/>
                    </label>
                    </div>
                    <div className=" w-32 aspect-square flex items-center justify-center overflow-hidden border border-black rounded-full">
                        <img className=" w-full aspect-square object-cover" src={initialURL}/>
                    </div>
                </div>
                <p className=" text-black text-2xl">{userData.username}</p>
            </div>
            <div className=" py-2 w-10/12 max-md:w-full h-[340px] flex flex-col items-center justify-center">
                <div className="_animation">
                    <div className="one spin-one"></div>
                    <div className="two spin-two"></div>
                    <div className="three spin-one"></div>
                </div>
                <h3 className=" text-black">Aba de Perfil em construção</h3>
            </div>
        </main>
    )
}