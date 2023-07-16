"use client"
import ChangeHistPageColors from "@/utilities/functions/ChangeHistPageColors";
import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";

export default function HistPage({ text }: { text: string }) {
    const [darkMode,setDarkMode] = useState(true)
    const [scroll,setScroll] = useState(false)
    const [focus,setFocus] = useState(false)
    return (
    <div className={`${focus && ' absolute top-0 flex flex-col items-center bg-zinc-900 w-screen z-50'}`} style={focus ? {backgroundImage: `url(https://live.staticflickr.com/65535/52992568323_bfa9108eb6_m.jpg)`} : {}}>
        <div className={`${focus && ` bg-black bg-opacity-50 pt-3`}`}>
            <div className=" flex flex-col w-7/12 max-lg:w-11/12 mx-auto">
                <div className=" w-full py-1 flex rounded-t-lg justify-around bg-black border-b-2 border-b-red-700 ">
                        <button className=" w-24 py-1" onClick={() => {
                            setScroll(!scroll)
                        }}>Scroll</button>
                        <button onClick={() => setFocus(!focus)} className="px-2 rounded-md bg-transparent border border-zinc-800 hover:bg-slate-900">
                            <AiFillThunderbolt fill="white" size={32} />
                        </button>
                        <button className=" w-24 py-1" onClick={() => {
                            setDarkMode(!darkMode)
                        }}>Inverso</button>
                    </div>
                    <div  className={`border-2 border-main border-t-0 ${scroll && `scroll-custom ${!focus ? 'max-h-96' : ' max-h-screen'} overflow-auto rounded-b-none`} ${darkMode ? 'dark' : 'light'}`}>
                        <div className={`transition-all page_hist py-3 px-4 w-full`} style={{background: '#080808',transition: '0.4s',filter: darkMode ? 'invert(1)' : ''}} dangerouslySetInnerHTML={{__html: text}}></div>
                </div>
            </div>
        </div>
        {focus && <button onClick={() => setFocus(false)} className=" fixed bottom-2 text-xs opacity-50 hover:opacity-100">Sair do modo foco</button>}
    </div>
    )
}