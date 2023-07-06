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
        <div className=" w-full flex flex-col items-center mb-2">
        <div className=" flex w-4/5 justify-center">
            <input value={search} onChange={({target}) => setSearch(target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(true)} className=" w-11/12 rounded-bl-md pl-1 pr-1 rounded-tl-md"/>
            <div className=" w-1/12 bg-slate-300 flex items-center justify-center rounded-br-md rounded-tr-md">
                <AiOutlineSearch size={32}/>
            </div>
        </div>
        {focus && <>
        {data.map((item => (
            <>
            {item.Nome.toUpperCase().startsWith(search.toUpperCase()) && <>
            <Link className=" w-4/5 flex justify-center" href={`/contos/${item.Ref}`}>
            {/* <div className=" w-4/5 flex justify-center"> */}
            <div key={item.Nome} className=" flex justify-between w-full bg-white pr-2 border-b border-stone-400 hover:bg-slate-200">
                <img src={item.ImgRef} className=" w-6"/>
                <p>{item.Nome}</p>
            </div>
            {/* </div> */}
            </Link>
            </>}
            </>
        )))}
        </>}
        </div>
    )
}

export default function CardContos({data,Filter}: {data: (Serie_Type | Solo_Type)[],Filter: any}) {
    const [ord,setOrd] = useState<any>(0)
    const filteredData: (Serie_Type | Solo_Type)[] = data.filter(Filter)
    const [ordenedData, setOrData] = useState(filteredData)
    useEffect(() => {
        console.log('resetou',ord)
        setOrData(ord == 0
      ? filteredData
      : ord == 1
      ? filteredData.sort((a, b) => a.Nome.localeCompare(b.Nome))
      : filteredData.sort((a, b) => a.Nome.localeCompare(b.Nome)).reverse())
    }, [ord])
    return (
        <section className=" w-full flex flex-col contos">
            <Search data={data}/>
            <div className=" flex afterDetail relative justify-between w-full pr-24 pb-2">
                    <h4>{filteredData.length} Resultados</h4>
                    <div className=" relative flex items-center notmobile">
                      <BsFillCaretDownFill className=" absolute right-0" size={24} fill="white"/>
                    <select onChange={({target}) => setOrd(target.value)} className="pl-2 pr-8 py-1 BGcolorEscuro rounded text-slate-50 text-2xl outline-none">
                        <option className=" text-slate-50 text-2xl" value={0}>Nenhum</option>
                        <option className=" text-slate-50 text-2xl" value={1}>A-Z</option>
                        <option className=" text-slate-50 text-2xl" value={2}>Z-A</option>
                    </select>
                    </div>
                    {/* sistema de ordenar aqui */}
            </div>
            <ul className="gridCards w-full p-0 items-start">
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