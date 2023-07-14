"use client"
import ChangeHistPageColors from "@/utilities/functions/ChangeHistPageColors";
import { useState } from "react";

export default function HistPage({ text }: { text: string }) {
    const [darkMode,setDarkMode] = useState(true)
    return (
    <div className=" flex flex-col w-7/12 mx-auto">
            <div className=" w-full h-11 flex rounded-t-lg justify-around bg-black">
                <button>Sla</button>
                <button onClick={() => {
                    setDarkMode(!darkMode)
                    }}>Inverso</button>
            </div>
            <div style={{background: '#080808',transition: '0.4s',filter: darkMode ? 'invert(1)' : ''}} className=" select-none transition-all page_hist py-3 px-4 w-full rounded-b-lg border-2 border-main">
                <div dangerouslySetInnerHTML={{__html: text}}></div>
            </div>
        </div>
    )
}