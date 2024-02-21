"use client"
import { Bookmark, Eye, Heart, Share, Star, ThumbsUp } from 'lucide-react'
import { Hist, Relacionado } from "@/utilities/types";
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

function ImageAndButtons({ img, viewsNum }: { img: string, viewsNum: number }) {
    return (
        <div className='w-4/12 flex h-fit'>
        <img src={img} className=" w-11/12 object-cover h-fit rounded-md" />
            <div className=" flex flex-col justify-end gap-2 items-center py-1 px-2 mt-3">
                <Button className=' aspect-square rounded-full p-0' variant={'outline'}>
                    <Star />
                </Button>
                <Button className=' aspect-square rounded-full p-0' variant={'outline'}>
                    <ThumbsUp />
                </Button>
                <Button className=' aspect-square rounded-full p-0' variant={'outline'}>
                    <Share />
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

function Relacionados({ relacionados }: { relacionados: Relacionado[] }) {
    <div className=' pl-4'>
    <h1 className="!mb-2 mt-4">RELACIONADOS</h1>
    <ul className=" flex gap-3">
        {relacionados.map(i => (
            <Link className=" w-2/12 aspect-square relative group" href={`/contos/${i.Ref}`}>
                <img src={i.Img} className=" w-full h-full"/>
                <div className=" absolute top-0 hidden bg-black group-hover:flex bg-opacity-70 w-full h-full justify-center items-center">
                    <h2 style={{color: 'white',fontSize: `${265 / i.Nome.length}px`}} className=" text-center">{i.Nome}</h2>
                </div>
            </Link>
        ))}
    </ul>
</div>
}

export function ContoHeader({ data, viewsNum }: { data: Hist, viewsNum: number }) {
    return (
        <main>
            <div className="bg-cover bg-fixed bg-no-repeat w-screen min-h-[calc(100vh+56px)] relative flex justify-center" style={{ backgroundImage: `url(https://live.staticflickr.com/65535/53540762207_c7354a28cf_z.jpg)` }}>
                <div className=" absolute w-full h-full bg-black bg-opacity-70 backdrop-blur-sm text-white gap-6 pt-8">
                    <div className=' w-full flex justify-center gap-6 h-[calc(100vh-64px)]'>
                        <Infos data={data}/>
                        <ImageAndButtons img={data.Img} viewsNum={viewsNum} />
                    </div>
                </div>
            </div>
        </main>
    )
}