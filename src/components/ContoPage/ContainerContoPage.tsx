"use client"

import { Serie_Type, Solo_Type } from "@/utilities/types"
import Universe from "./InitialUniverse"
import Link from "next/link"
import { AiFillDelete, AiFillEdit, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"
import { HiUserCircle } from "react-icons/hi"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import axios from "axios"
import { decryptData } from "@/utilities/functions/CryptoFunctions"
import formatarData from "@/utilities/functions/FormatData"
import hasWindow from "@/utilities/functions/hasWindow"
import SameUser from "@/utilities/functions/sameUser"
import { GrClose } from "react-icons/gr"
import getUserData from "@/utilities/functions/getUserData"
import { CommentSession } from "./comment/comment-session"
import { CreateComment } from "./comment/create-comment"

interface CapProps {
    Nome: string;
    Ref: string;
    Disponivel: boolean;
    Episodios: object[];
}

const Cap: React.FC<CapProps> = ({ Nome,Disponivel,Episodios,Ref }) => {
    const [active, setActive] = useState(false)
    if (!Disponivel) {return null;}
    return (
        <div className='capContainer'>
        <div onClick={() => setActive(!active)} className='Capitulo BGcolorMain hoverColorEscuro'>
        <h4>{Nome}</h4>
        {!active ? <AiOutlinePlus size={40}/> : <AiOutlineMinus size={40}/>  } 
        </div>
        <div className={`capContent w-full`} style={{height: active ? `${62 * Episodios.length}px` : '0px'}}>
            {Episodios.map((EP: any) => (
                <div key={EP.Nome} className=" flex justify-between w-full my-1 pb-1 items-center py-2" style={{borderBottom: '0.2px solid rgba(255,255,255,.01)'}}>
                    <h5 className=" uppercase">{EP.Nome}</h5>
                    <Link href={`/hist/${Ref}/${EP.Ref}`}>
                    <button>Ler</button>
                    </Link>
                </div>
            ))}
        </div>
        </div>
    )
}


function ChaptersSession({data}: {data: Serie_Type}) {
    return <div className=" flex flex-col">
        {data.Capitulos.map(cap => (
            <Cap key={JSON.stringify(cap.Episodios)} Nome={cap.Nome} Disponivel={cap.Disponivel} Episodios={cap.Episodios} Ref={data.Ref}/>
        ))}
    </div>
}

function HistAcess({ data }: {data: Serie_Type | Solo_Type}) {
    return (<>
            {data.Tipo === 'SOLO' ? (
            <div className=" flex flex-col items-center">
                <Link href={`/hist/${data.Ref}/`}>
                    <button className=" uppercase text-4xl">Ler {data.Nome} Agora</button>
                </Link>
            </div>
            ) : (
                <>
                {/* @ts-ignore */}
                <ChaptersSession data={data}/>
                </>
                )}
    </>)
}


export function Relacionado({ rel }: {rel: any}) {
    return (
        <Link className="block relative hoverRelacionado h-72 w-72" href={'/contos/'+rel.Ref}>
        <img className=" w-full" src={rel.Img}/>
            <div className=" absolute top-0 bgroundopacity w-full h-full justify-center items-center">
                <h2 style={{color: 'white',fontSize: `${300 / rel.Nome.length}px`}} className=" text-center">{rel.Nome}</h2>
            </div>
        </Link>
    )
}
type Comment = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    author_img: string
}
export default function ContainerForConto({ data, datacomments,Ref,histID }: {data: Serie_Type | Solo_Type, datacomments: Comment[], Ref: string,histID: string}) {
    const [mutableComments,setComments] = useState(datacomments)
    return (
        <div>
        <Universe data={data} histID={histID}/>
        <hr className="contoPageDivision BGcolorText"/>
        <HistAcess data={data}/>
                <hr className="contoPageDivision BGcolorText"/>
                    <h2 className=" ml-8">Relacionados</h2>
                <div className=" flex gap-6 ml-8 mt-2">
                {data.Relacionados.map((rel: any) => (
                    <Relacionado key={rel.Nome} rel={rel} />
                    ))}
                </div>
                <hr className="contoPageDivision BGcolorText"/>
                <CreateComment comments={mutableComments} Ref={Ref} setDataComments={setComments}/>
                <CommentSession setComments={setComments} dataComments={mutableComments} />
        </div>
    )
}