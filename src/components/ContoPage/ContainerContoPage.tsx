"use client"

import { Serie_Type, Solo_Type } from "@/utilities/Types"
import Universe from "./InitialUniverse"
import Link from "next/link"
import { AiOutlinePlus } from "react-icons/ai"
import { useState } from "react"

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
        <h4>{}{Nome}</h4>
        <AiOutlinePlus size={40}/>    
        </div>
        <div className={`capContent w-full`} style={{height: active ? `${62 * Episodios.length}px` : '0px'}}>
            {Episodios.map((EP: any) => (
                <div key={EP.Nome} className=" flex justify-between w-full my-1 pb-1 items-center py-2" style={{borderBottom: '0.2px solid rgba(255,255,255,.01)'}}>
                    <h5 className=" uppercase">{EP.Nome}</h5>
                    <Link href={`/texto/${Ref}/${EP.Ref}`}>
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
            <Cap Nome={cap.Nome} Disponivel={cap.Disponivel} Episodios={cap.Episodios} Ref={data.Ref}/>
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
            <h2 style={{color: 'white'}} className=" text-center">{rel.Nome}</h2>
            </div>
        </Link>
    )
}

export default function ContainerForConto({ data }: {data: Serie_Type | Solo_Type}) {
    return (
        <div>
        <Universe data={data}/>
        <hr className="contoPageDivision BGcolorText"/>
        <HistAcess data={data}/>
                <hr className="contoPageDivision BGcolorText"/>
                    <h2 className=" ml-8">Relacionados</h2>
                <div className=" flex gap-6 ml-8 mt-2">
                {data.Relacionados.map((rel: any) => (
                    <Relacionado rel={rel} />
                ))}
                </div>
        </div>
    )
}