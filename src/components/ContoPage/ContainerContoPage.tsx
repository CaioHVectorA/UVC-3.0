"use client"

import { Serie_Type, Solo_Type } from "@/utilities/Types"
import Universe from "./InitialUniverse"
import Link from "next/link"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useRef, useState } from "react"
import { HiUserCircle } from "react-icons/hi"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import axios from "axios"
import { decryptData } from "@/utilities/functions/CryptoFunctions"
import formatarData from "@/utilities/functions/FormatData"

interface CapProps {
    Nome: string;
    Ref: string;
    Disponivel: boolean;
    Episodios: object[];
}

const Cap: React.FC<CapProps> = ({Nome,Disponivel,Episodios,Ref}) => {
    const [active, setActive] = useState(false)
    if (!Disponivel) {return null;}
    return (
        <div className='capContainer'>
        <div onClick={() => setActive(!active)} className='Capitulo'>
        <h4>{Nome}</h4>
        {!active ? <AiOutlinePlus size={40}/> : <AiOutlineMinus size={40}/>  } 
        </div>
        <div className={`capContent w-full`} style={{height: active ? `${62 * Episodios.length}px` : '0px'}}>
            {Episodios.map((EP: any) => (
                <div key={EP.Nome} className=" flex justify-between w-full my-1 pb-1 items-center py-2" style={{borderBottom: '0.2px solid rgba(255,255,255,.01)'}}>
                    <h5 className=" uppercase">{EP.Nome}</h5>
                    <Link href={`/contos/${Ref}/${EP.Ref}`}>
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
            <button className=" uppercase text-4xl">Ler {data.Nome} Agora</button>
            </div>
            ) : (
                <>
                {/* @ts-ignore */}
                <ChaptersSession data={data}/>
                </>
                )}
    </>)
}


function Relacionado({ rel }: {rel: any}) {
    const [active, setActive] = useState(false)
    return (
        <Link className=" relative hoverRelacionado" href={'/contos/'+rel.Ref}>
        <img className=" aspect-square w-72" src={rel.Img}/>
         <div className=" absolute top-0 bgroundopacity w-full h-full justify-center items-center">
            <h2 style={{color: 'white',fontSize: `${300 / rel.Nome.length}px`}} className=" text-center">{rel.Nome}</h2>
            </div>
        </Link>
    )
}
interface Comment {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
}

function CommentSession( {dataComments}: {dataComments: Comment[]} ) {
    return (
        <div className=" flex flex-col-reverse gap-5 ml-6">
            {dataComments.map(((comment, index) => (
                <div key={JSON.stringify(comment.comment_by+comment.username_author+comment.content+index)} className=" px-5 flex bg-slate-50 w-4/6 py-5 rounded-2xl relative">
                    <p className=" absolute right-6 text-zinc-500 top-2 text-xs">{formatarData(comment.created_at)}</p>
                    <HiUserCircle fill="black" style={{minWidth: '72px', height: '72px'}}/> 
                    <div>
                        <h4 className="text-black uppercase">{comment.username_author}</h4>
                        <p className="text-black">{comment.content}</p>
                    </div>
                </div>
            )))}
        </div>
    )
}
function CreateComment({setDataComments,Ref,comments}: {setDataComments: any,Ref: string,comments: any}) {
    const [text,setText] = useState('')
    const [fetching,setFetching] = useState(false)
    const TextArea = useRef(null)
    function HandleSubmit() {
        if (!!localStorage.getItem(LOGIN_LOCAL_STORAGE)) return
        setFetching(true)
        const userData = decryptData(localStorage.getItem(LOGIN_LOCAL_STORAGE)).data
        const data = {
            content: text,
            comment_by: userData.id,
            comment_in: Ref,
            username_author: userData.username
        }
        console.log(userData)
        axios.post(URL+'comment', data).then(res =>{
            console.log(res)
            setDataComments([...comments, res.data])
            setText('')
            setFetching(false)
        }).catch(err => {
            setFetching(false)
            console.log(err)
        })
    }
 return (
    <div className=" ml-8 mt-4">
    {!!(typeof window !== 'undefined' && window.localStorage.getItem(LOGIN_LOCAL_STORAGE)) ? (
        <div className="flex flex-col gap-4 w-4/6">
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
                <CommentSession dataComments={mutableComments} />
        </div>
    )
}