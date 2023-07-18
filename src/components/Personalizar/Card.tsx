"use client"
import { ChangeColor, IColors, findColor } from "@/utilities/functions/ChangeColors";
import { useState } from 'react'

export default function CardPersonalizar({color}: {color: IColors}) {
    const [hover,setHover] = useState(false)
    return (
        <div className=" flex flex-col py-4 gap-3 items-center rounded bg-black bg-opacity-10 px-6">
            <button onClick={() => ChangeColor(color.identifier)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{backgroundColor: !hover ? color.colors[0] : color.colors[1],border: 'none'}}>Clique pra ativar</button>
            <h4>{color.identifier}</h4>
            <small className=" italic opacity-25">Clique para ativar</small>
        </div>
    )
}