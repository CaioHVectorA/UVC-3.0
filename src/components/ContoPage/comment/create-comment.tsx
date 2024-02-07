import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import getUserData from "@/utilities/functions/getUserData"
import hasWindow from "@/utilities/functions/hasWindow"
import axios from "axios"
import { useState, useRef, useEffect } from "react"

export function CreateComment({setDataComments,Ref,comments}: {setDataComments: any,Ref: string,comments: any}) {
    const [text,setText] = useState('')
    const [fetching,setFetching] = useState(false)
    const [isLoged, setIsLoged] = useState(false)
    const TextArea = useRef(null)
    // -------------------------------
    function HandleSubmit() {
        if (!!!localStorage.getItem(LOGIN_LOCAL_STORAGE)) return
        setFetching(true)
        const userData = getUserData()
        if (!userData) return
        const data = {
            content: text,
            comment_by: userData.id,
            comment_in: Ref,
            username_author: userData.username,
            img_author: userData.image_path
        }
        console.log({data})
        axios.post(URL+'api/comment', data).then(res =>{
            console.log({res})
            setDataComments([...comments, res.data])
            setText('')
            setFetching(false)
        }).catch(err => {
            setFetching(false)
            console.log(err)
        })
    }
    useEffect(() => setIsLoged(!!(hasWindow() && getUserData())),[])
 return (
    <div className=" ml-8 mt-4">
    {isLoged ? (
        <div className="flex flex-col gap-4 w-4/6 max-lg:w-11/12">
        <h4>Crie o seu comentário!</h4>
        <textarea ref={TextArea} value={text} onChange={({target}) => setText(target.value)} className="text-black w-full p-2 rounded-lg resize-none overflow-hidden h-64"></textarea>
        <button disabled={fetching} onClick={HandleSubmit} className=" self-end mb-5">Comentar</button>
        </div>
    ) : (
        <></>
    )}
    </div>
 )
} 