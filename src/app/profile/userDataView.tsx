"use client"
import { User_Type } from "@/utilities/Types";
import { URL } from "@/utilities/envariables";
import { getBase64 } from "@/utilities/functions/getBase64";
import axios from "axios";
import { useState } from "react";
import { AiFillEdit } from 'react-icons/ai'
async function updateUser({ id,image_path,password,username }: { id:string, username?: string, image_path?: string, password?: string }) {
    const data = await axios.put(URL+'/user/'+id,{
        username,
        password,
        image_path,
    })
    console.log(data)
    return data
}

export default function UserDataView({userData}: {userData: User_Type}) {
    const [initialURL, setURL] = useState(`${URL}${userData.image_path}`)
    return (
        <main className=" flex  mt-8 px-4 w-10/12 mx-auto rounded-2xl py-2 bg-white text-black">
            <div className=" flex flex-col items-center">
                <div className=" relative">
                    <div className=" absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
                    <input onChange={(e) => {
                        //@ts-ignore
                        updateUser({ id: userData.id, image_path: getBase64(e.target.files[0]) }).then(res => {
                            //@ts-ignore
                            setURL(getBase64(e.target.files[0]))
                        })
                    }} id="file" type="file" accept=".png" className=" hidden"/>
                    <label htmlFor="file" className="cursor-pointer">
                        <AiFillEdit size={24} fill="white"/>
                    </label>
                    </div>
                    <div className=" w-32 aspect-square flex items-center justify-center border border-black rounded-full px-4">
                <img className=" w-full aspect-square object-cover" src={initialURL}/>
                    </div>
                </div>
                <p className=" text-black text-2xl">{userData.username}</p>
            </div>
        </main>
    )
}