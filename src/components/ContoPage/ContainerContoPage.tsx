"use client"

import { Serie_Type, Solo_Type } from "@/utilities/Types"
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

type modalProps = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    index: number
} | false

function CommentSession( {dataComments,setComments}: {dataComments: Comment[], setComments: Function} ) {
    const [modal,setModal] = useState<modalProps>(false)
    const Modal = ({text,id,index}: {text: string,id: string, index: number}) => {
        const [fetching,setFetching] = useState(false)
        const [content,setContent] = useState(text)
        function HandlePut(id: string, index: number) {
            if (content === text) return setModal(false)
            console.log(index)
            setFetching(true)
            axios.put(URL+'comment/'+id,{newContent: content}).then(res => {
            const tempArr = [...dataComments]
            tempArr.splice(index,1,res.data) 
            setComments(tempArr)
            setModal(false)
            setFetching(false)
            }).catch(err => {
                console.log(err)
                setModal(false)
            })
        }

        return (<div className="w-screen h-screen fixed top-0 left-0 z-40 bg-black bg-opacity-70 flex items-center justify-center">
            <div className=" bg-slate-100 rounded-2xl px-5 py-3 h-2/5 w-8/12 flex flex-col items-center gap-3 relative">
                <GrClose cursor={'pointer'} onClick={() => setModal(false)} className=" absolute right-5 top-3" size={24} fill="#a8362d" />
                <h4 className=" text-black">Editar comentário</h4>
                <textarea value={content} onChange={({target}) => setContent(target.value)} className=" w-full h-3/5 text-black px-1"></textarea>
                <button disabled={fetching} onClick={() => HandlePut(id,index)}>Enviar</button>
            </div>
        </div>)
    }
    function HandleDelete(id: string,index: number) {
        axios.delete(URL+'comment/'+id).then(res => {
        const tempArr = [...dataComments]
        tempArr.splice(index,1) 
        setComments(tempArr)
        }).catch(err => console.log(err))
    }

    return (
        <div className=" flex flex-col-reverse gap-5 ml-6"> 
            {dataComments.map(((comment, index) => (
                <div key={index} className=" group/comment px-5 flex bg-slate-50 w-4/6 py-5 rounded-2xl relative max-lg:w-11/12">
                    <p className=" absolute right-6 text-zinc-500 top-2 text-xs">{formatarData(comment.created_at)}</p>
                    <div className=" w-20 h-20 bg-black bg-opacity-70 flex items-center justify-center rounded-full">
                    <img src={URL+comment.author_img} className=" w-10/12 h-10/12 object-contain" /> 
                    </div>
                    <div>
                        <h4 className="text-black uppercase">{comment.username_author}</h4>
                        <p className="text-black">{comment.content}</p>
                    </div>
                    {SameUser(comment.comment_by) && <div className=" hidden group-hover/comment:flex absolute right-6 top-2 px-6 left-1/2">
                        <AiFillEdit onClick={() => setModal({...comment,index})} cursor={'pointer'} fill="#000" size={32}/>
                        <AiFillDelete onClick={() => HandleDelete(comment.id,index)} cursor={'pointer'} fill="#a8362d" size={32}/>
                    </div>}
                        {modal && <Modal id={modal.id} index={modal.index} text={modal.content} />}
                </div>
            )))}
        </div>
    )
}
function CreateComment({setDataComments,Ref,comments}: {setDataComments: any,Ref: string,comments: any}) {
    const [text,setText] = useState('')
    const [fetching,setFetching] = useState(false)
    const TextArea = useRef(null)
    // -------------------------------
    function HandleSubmit() {
        console.log('teste')
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
    // -------------------------------
    
 return (
    <div className=" ml-8 mt-4">
    {!!(hasWindow() && window.localStorage.getItem(LOGIN_LOCAL_STORAGE)) ? (
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