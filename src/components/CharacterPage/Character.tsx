import { Character_Type } from "@/utilities/Types";
import { CSSProperties, StyleHTMLAttributes } from "react";
import Citacoes from "./Citacao";
import Link from "next/link";
import { AiFillInfoCircle } from "react-icons/ai";
import Atributos from "./Atributos";

function SectionInitial({data}: {data: Character_Type}) {
    console.log(data.Citacoes.length)
    return (
        <>
    {/* longscreen */}
    <div className="notmobile w-screen" style={{backgroundImage: `url(${data.Imgs[Math.floor(Math.random() * data.Imgs.length)]})`}}>
        <div className=" text-white bg-opacity-50 backdrop-blur-sm bg-black w-screen py-5 n flex flex-col items-center">
        <h1>{data.Nome}</h1>
        <h3 className=" opacity-80 italic capitalize">{data.Apelido && `"${data.Apelido}"`}</h3>
        {data.Citacoes.length > 0 && <Citacoes citacoes={data.Citacoes}/>}
        </div>
    </div>
    {/* mobile  */}
    <div className="mobile w-screen" style={{backgroundImage: `url(${data.Imgs[Math.floor(Math.random() * data.Imgs.length)]})`}}>
        <div className=" text-white bg-opacity-50 backdrop-blur-sm bg-black w-screen py-5 n flex flex-col items-center">
        <h3>{data.Nome}</h3>
        <h4 className=" opacity-80 italic capitalize">"{data.Apelido}"</h4>
        {data.Citacoes.length > 0 && <Citacoes citacoes={data.Citacoes}/>}
        </div>
    </div>
        </>
    )
}

function Aparicoes({data}: {data: Character_Type}) {
    return (
        <>
        {/* longscreen */}
    <div className="notmobile">
        <h3 className=" text-start ml-4 mt-3">Aparições</h3>
        <div className=" flex gap-2 ml-4">
            {data.Aparicoes.map(apa => (
                <>
                <Link href={`/contos/${apa.Ref}`}>
                <img src={apa.Img} style={{width: '250px', aspectRatio: '1'}}/>
                </Link>
                </>
            ))}
        </div>
    </div>
    {/* mobile */}
    <div className="mobile">
        <h3 className=" mt-1">Aparições</h3>
        <div className=" flex flex-wrap gap-2 ml-4">
            {data.Aparicoes.map(apa => (
                <>
                <Link href={`/contos/${apa.Ref}`}>
                <img src={apa.Img} style={{width: '32%', aspectRatio: '1'}}/>
                </Link>
                </>
            ))}
        </div>
    </div>
            </>
    )
}

function Text({data}: {data: Character_Type}) {
    return (
    <>
        <div className="notmobileflex w-screen flex-col ml-4 pl-80">
            <h4 className=" mt-4">BIOGRAFIA</h4>
            <p className=" w-3/5">{data.Biografia}</p>
            <h4 className=" mt-4">PODERES</h4>
            <p className=" w-3/5">{data.Poderes}</p>
            {data.Curiosidades && 
            <>
            <h4 className=" mt-4">CURIOSIDADES</h4>
            <p className=" w-3/5">{data.Curiosidades}</p>
            </>
            }
        </div>
        {/* mobile */}
        <div className="mobileflex w-screen flex-col ml-6">
            <h4 className=" mt-4">BIOGRAFIA</h4>
            <p className=" w-4/5">{data.Biografia}</p>
            <h4 className=" mt-4">PODERES</h4>
            <p className=" w-4/5">{data.Poderes}</p>
            {data.Curiosidades && 
            <>
            <h4 className=" mt-4">CURIOSIDADES</h4>
            <p className=" w-4/5">{data.Curiosidades}</p>
            </>
            }
        </div>
    </>
    )
}

export default function Character({data}: {data: Character_Type}) {
    return <div>
        <SectionInitial data={data}  />
        <Aparicoes data={data}/>
        <hr style={{height: '0.6px'}} className=" ml-4 my-4 w-80 "/>
        <Atributos data={data}/>
        <Text data={data}/>
    </div>
}