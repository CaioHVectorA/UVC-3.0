"use client"
import { toast } from "@/components/ui/use-toast"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import getUserData from "@/utilities/functions/getUserData"
import hasWindow from "@/utilities/functions/hasWindow"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useState, useRef, useEffect } from "react"
import { IComment } from "@/utilities/types"

export function CreateComment({ setDataComments,Ref,comments }: {setDataComments: (data: IComment[]) => void, Ref: string,comments: any}) {
    const [text,setText] = useState('')
    const [fetching,setFetching] = useState(false)
    const [isLoged, setIsLoged] = useState(false)
    const { toast } = useToast()
    // -------------------------------
    function HandleSubmit() {
        const userData = getUserData()
        if (!userData) return
        setFetching(true)
        const data = {
            content: text,
            comment_by: userData.id,
            comment_in: Ref,
        }
        console.log({data})
        axios.post('/api/comment', data).then(res =>{
            setDataComments([...comments, { author_img: userData.image_path, username_author: userData.username, id: res.data.id }])
            setText('')
            toast({ title: 'Comentário criado!' })
            setFetching(false)
        }).catch(err => {
            setFetching(false)
            console.log(err)
        })
    }
    useEffect(() => setIsLoged(!!(hasWindow() && getUserData())), [])
 return (
    <div className=" w-11/12 mx-auto mt-8">
    {isLoged ? (
        <div className="flex flex-col gap-4 w-4/6 max-lg:w-11/12">
        <h4>Crie o seu comentário!</h4>
        <textarea value={text} onChange={({target}) => setText(target.value)} className="text-black w-full p-2 rounded-lg resize-none overflow-hidden h-64"></textarea>
        <button disabled={fetching} onClick={HandleSubmit} className=" self-end mb-5">Comentar</button>
        </div>
    ) : (
        <></>
    )}
    </div>
 )
} 