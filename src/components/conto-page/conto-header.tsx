"use client"
import { Bookmark, Eye, Heart, MessageCircle, MessageCircleMore, Share, Star, ThumbsUp } from 'lucide-react'
import { Hist, Relacionado } from "@/utilities/types";
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useCallback, useEffect, useState } from 'react';
import { prisma } from '@/server/prisma.client';
import getUserData, { User_Session } from '@/utilities/functions/getUserData';
import { getFavAndLike } from '@/server/getFavAndLike';
import axios from 'axios';
function ImageAndButtons({ img, viewsNum, histId }: { img: string, viewsNum: number, histId: string }) {
    const [isFav, setIsFav] = useState<null | boolean>(null)
    const [isLiked, setIsLiked] = useState<null | boolean>(null)
    const [isFetching, setIsFetching] = useState({ like: false, fav: false })
    const abortControllerLike = new AbortController()
    const abortControllerFav = new AbortController()
    useEffect(() => {
        (async () => {
            const userData = getUserData()
            if (!userData) return
            const [like,fav] = await getFavAndLike(userData, histId)
            console.log(like,fav)
            setIsFav(fav)
            setIsLiked(like)
        })()
    }, [])
    const handleLike = useCallback(() => {
        const user = getUserData()
        setIsLiked(!isLiked)
        if (isFetching.like) abortControllerLike.abort()
        if (!user) return
        setIsFetching({...isFetching, like: true})
        axios.post(`/api/like`, {
            histId,
            isLiked,
            userId: user.id,
        }, { signal: abortControllerLike.signal }).then(() => setIsFetching({...isFetching, like: false}))
    }, [isLiked])
    const handleFav = useCallback(() => {
        const user = getUserData()
        setIsFav(!isFav)
        if (isFetching.fav) abortControllerFav.abort()
        if (!user) return
        setIsFetching({...isFetching, fav: true})
        axios.post(`/api/fav`, {
            histId,
            userId: user.id,
            isFav
        }, { signal: abortControllerFav.signal }).then(() => setIsFetching({...isFetching, fav: false}))
    }, [isFav])
    return (
        <div className='w-4/12 flex h-fit'>
        <img src={img} className=" w-11/12 object-cover h-fit rounded-md" />
            <div className=" flex flex-col justify-end gap-2 items-center py-1 px-2 mt-3">
                <Button onClick={handleFav} disabled={isFav === null} className={' aspect-square rounded-full p-0 '} variant={!isFav ? 'outline' : 'default'}>
                    <Star />
                </Button>
                <Button onClick={handleLike} disabled={isLiked === null} className={' aspect-square disabled:opacity-40 rounded-full p-0 '} variant={!isLiked ? 'outline' : 'default'}>
                    <ThumbsUp />
                </Button>
                <Button className=' aspect-square disabled:opacity-40 rounded-full p-0' variant={'outline'}>
                    <Share />
                </Button>
                <Button asChild className=' aspect-square disabled:opacity-40 rounded-full p-0' variant={'outline'}>
                    <Link href={'#createComment'}>
                        <MessageCircleMore />
                    </Link>
                </Button>
            </div>
        </div>
    )
}

function Infos({ data }: { data: Hist }) {
    return (
        <div className=" w-4/12">
        <h2 className=" text-start mb-0 font-extralight">{data.Nome}</h2>
        <p className=' text-justify text-xl'>{data.Sinopse}</p>
        <ul className=' flex gap-2 my-2'>
            {data.Categorias.map(i => <Badge>{i}</Badge>)}
        </ul>
        </div>
    )
}



export function ContoHeader({ data, viewsNum, histId }: { data: Hist, viewsNum: number, histId: string }) {
    return (
        <main>
            <div className="bg-cover bg-fixed bg-no-repeat w-screen min-h-[calc(100vh+56px)] relative flex justify-center" style={{ backgroundImage: `url(${data.BgImg})` }}>
                <div className=" absolute w-full h-full bg-black bg-opacity-70 backdrop-blur-sm text-white gap-6 pt-8">
                    <div className=' w-full flex justify-center gap-6 h-[calc(100vh-64px)]'>
                        <Infos data={data}/>
                        <ImageAndButtons img={data.Img} viewsNum={viewsNum} histId={histId} />
                    </div>
                </div>
            </div>
        </main>
    )
}