"use client"

import CardPersonalizar from "@/components/Personalizar/Card";
import { Colors } from "@/utilities/functions/ChangeColors";
import { ChangeTheme } from "@/utilities/functions/ChangeTheme";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function Page() {
    const [darkMode,setDarkMode] = useState(false)
    useEffect(() => {
        setDarkMode(() => (
            getComputedStyle(document.documentElement)
            .getPropertyValue('--color-background')
            .trim() !== "#e7e7e7"
        ))
    })
    // console.log()
    return (
        <>
            <div className=" flex flex-col items-center mt-2">
                <h4 className=" mt-3">SEU toque ÚNICO, SEU site personalizado do SEU jeito!</h4>
                <div onClick={() => {
                    ChangeTheme();
                    setDarkMode(!darkMode)
                }} className={` p-3 border ${darkMode ? 'border-black' : 'border-white'} transition-all border-opacity-30 rounded-md shadow-md ${darkMode ? 'hover:bg-black' : ' hover:bg-white'} cursor-pointer hover:scale-110`}>
                    {darkMode ? 
                    <BsFillMoonFill size={32}/>
                    :
                    <BsFillSunFill  size={32} />
                    }
                </div>
            </div>
            <hr className="h-0.5 w-10/12 mx-auto rounded-sm opacity-30 my-4" />
            <div className=" flex flex-col items-center">
                <h3 className=" normal-case">Estilo Atual</h3>
                <button className=" text-4xl">Ver mais Contos</button>
                <div className=" flex flex-wrap w-screen gap-3 justify-center mt-6">
                {Colors.map(color => (
                    <CardPersonalizar color={color}/>
                    ))}
                </div>
            </div>
        </>
    )
}