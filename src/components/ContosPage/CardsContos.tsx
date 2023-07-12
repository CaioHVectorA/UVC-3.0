"use client"
import { URL_READONLY } from "@/utilities/envariables"
import { Capitulo,Serie_Type,Character_Type,Solo_Type } from "@/utilities/Types"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AiFillCaretDown, AiOutlineDown, AiOutlineSearch } from "react-icons/ai"
import { BsFillCaretDownFill } from "react-icons/bs"

function Search({data}: {data: (Serie_Type | Solo_Type)[]}) {
    const [focus,setFocus] = useState(false)
    const [search,setSearch] = useState('')
    return (
        <div className=" w-full flex flex-col items-center mb-2 relative text-black">
        <div className=" flex w-4/5 justify-center">
            <input value={search} onChange={({target}) => setSearch(target.value)} onFocus={() => setFocus(true)} onBlur={() => {setTimeout(() => setFocus(false),100)}} className=" text-black w-11/12 rounded-bl-md pl-1 pr-1 rounded-tl-md"/>
            <div className=" w-1/12 bg-slate-300 flex items-center justify-center rounded-br-md rounded-tr-md">
                <AiOutlineSearch fill="black" size={32}/>
            </div>
        </div>
        {focus && <div className=" w-full flex flex-col items-center absolute top-full z-50">
        {data.map(((item, index) => (
            <>
            {item.Nome.toUpperCase().includes(search.toUpperCase()) && <>
            <Link key={index} className=" w-4/5 flex justify-center" href={`/contos/${item.Ref}`}>
            {/* <div className=" w-4/5 flex justify-center"> */}
            <div key={item.Nome} className=" flex justify-between w-full bg-white pr-2 border-b border-stone-400 hover:bg-slate-200">
                <img src={item.ImgRef} className=" w-6"/>
                <p className=" text-black">{item.Nome}</p>
            </div>
            {/* </div> */}
            </Link>
            </>}
            </>
        )))}
        </div>}
        </div>
    )
}

export default function CardContos({data,Filter}: {data: (Serie_Type | Solo_Type)[],Filter: any}) {
    const [ord,setOrd] = useState<any>(0)
    // const filteredData: (Serie_Type | Solo_Type)[] = data.filter(Filter)
    const [ordenedData, setOrData] = useState(data.filter(Filter))
    useEffect(() => {
        console.log(data.filter(Filter))
        setOrData(ord == 0
      ? data.filter(Filter)
      : ord == 1
      ? data.filter(Filter).sort((a, b) => a.Nome.localeCompare(b.Nome))
      : data.filter(Filter).sort((a, b) => a.Nome.localeCompare(b.Nome)).reverse())
    }, [ord,Filter])
    return (
        <section className=" w-full flex flex-col contos">
            <Search data={data}/>
            <div className=" flex afterDetail relative justify-between w-full pb-2">
                    <h4>{ordenedData.length} Resultados</h4>
                    <div className=" relative flex items-center notmobileflex">
                      <BsFillCaretDownFill className=" absolute right-0 self-center" size={24} fill="white"/>
                    <select onChange={({target}) => setOrd(target.value)} className="pl-2 pr-8 py-1 BGcolorEscuro rounded text-slate-50 text-2xl outline-none">
                        <option className=" text-slate-50 text-2xl" value={0}>Nenhum</option>
                        <option className=" text-slate-50 text-2xl" value={1}>A-Z</option>
                        <option className=" text-slate-50 text-2xl" value={2}>Z-A</option>
                    </select>
                    </div>
                    {/* sistema de ordenar aqui */}
            </div>
            <hr className=" w-full bg-black rounded-full notmobile mb-8" />
            <ul className="gridCards w-full p-0">
            {ordenedData.map(item => (
                <li key={JSON.stringify(item)} className=" flex flex-col justify-center">
                    <Link href={`/contos/${item.Ref}`}>
                    <img className=" w-60 aspect-square rounded-md" src={item.ImgRef}/>
                    </Link>
                <h4>{item.Nome}</h4>
                </li>
                ))}
                </ul>
        </section>
    )
}