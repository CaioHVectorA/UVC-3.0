"use client"

import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import '../../styles/components/contosPreview.css'
import { decryptData } from "@/utilities/functions/CryptoFunctions"
import axios from "axios"
export default function LikeButton({conto,histID}: {conto: string,histID: string}) {
    const [data, setData] = useState({})
    const [active, setActive] = useState(false)
    const [fetching,setFetching] = useState(false)
    const [likeID,setLikeId] = useState<any>(null)
    
    
    useEffect(() => {
    fetch(URL + 'hist/' + conto).then(res => res.json()).then(data => setData(data))    
    }, [])

    useEffect(() => {
        const {id} = decryptData(localStorage.getItem(LOGIN_LOCAL_STORAGE)).data
        axios.post(URL + 'likes/' + histID,{userId: id}).then(res => {setLikeId(res.data.id) ; setActive(true)}).catch(err => setLikeId('undefined'))
    }, [])
    function HandleSubmit() {
        if (!fetching) {
        setActive(!active)
        const {id} = decryptData(localStorage.getItem(LOGIN_LOCAL_STORAGE)).data
            setFetching(true)
            axios.post(URL+'like/'+histID,{
                isLiked: active,
                userId: id,
                id: likeID
            }).then((res: any) => {
                setFetching(false)
                setLikeId(res.data.id)
            }).catch(err => console.log(err))
            const prevData = {...data}
            const num = active ? -1 : 1
            // @ts-ignore
            setData({...data, likesNum: prevData.likesNum + num})
        }    
    }
    return (
    <>
    {data && likeID && <div className="containerLike flex justify-center mt-4">
        <div style={{opacity: fetching ? '0.3' : '1',cursor: !fetching ? 'pointer' : 'wait'}} onClick={HandleSubmit} className={` flex gap-2 rounded items-center py-1 px-3 buttonLike ${active ? 'BGcolorMain' : ''}`}>
        {active ? <AiFillHeart className={`${active ? 'favAnimationOp' : 'favAnimationOp2'}`} size={32}/> : <AiOutlineHeart className={`${active ? 'favAnimationOp' : 'favAnimationOp2'}`} size={32}/>}
        <p>Like</p>
    {/* @ts-ignore */}
        <p>{data.likesNum}</p>
        </div>
        </div>}
    </>)
}