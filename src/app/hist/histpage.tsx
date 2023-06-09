"use client"
import ChangeHistPageColors from "@/utilities/functions/ChangeHistPageColors";
import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";

export default function HistPage({ text }: { text: string }) {
    const [darkMode,setDarkMode] = useState(true)
    const [scroll,setScroll] = useState(false)
    return (
    <div className=" flex flex-col w-7/12 mx-auto">
        <div className=" w-full py-1 flex rounded-t-lg justify-around bg-black border-b-2 border-b-red-700 ">
                <button className=" w-24 py-1" onClick={() => {
                    setScroll(!scroll)
                }}>Scroll</button>
                <button onClick={() => alert('Modo Foco')} className=" bg-transparent border border-zinc-800 hover:bg-slate-900">
                    <AiFillThunderbolt />
                </button>
                <button className=" w-24 py-1" onClick={() => {
                    setDarkMode(!darkMode)
                    }}>Inverso</button>
            </div>
            <div  className={`border-2 border-main border-t-0 ${scroll && 'scroll-custom max-h-96 overflow-auto rounded-b-none'} ${darkMode ? 'dark' : 'light'}`}>
                <div className={`select-none transition-all page_hist py-3 px-4 w-full rounded-b-lg `} style={{background: '#080808',transition: '0.4s',filter: darkMode ? 'invert(1)' : ''}} dangerouslySetInnerHTML={{__html: text}}></div>
            </div>
        </div>
    )
}