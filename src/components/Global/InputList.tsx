"use client"
import { SetStateAction, useState } from "react";

export function InputList({ state, setState }: { state: string[], setState: (str: string[]) => void }) {
    const [text, setText] = useState("")
    return (
        <div className=" flex flex-col w-full">
            <input value={text} className=" rounded-sm py-2 text-black px-1" onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                setText("")
                setState([...state, text])
            }} onChange={({ target }) => setText(target.value)}/>
            <ul className=" flex gap-2 mt-4">
            {state.map((str, index) => (
                <li>
                    <button className=" hover:cursor-pointer px-1 py-2 text-xs hover:bg-red-500 hover:text-white bg-gray-300 text-gray-600" onClick={() => {
                        const copy = JSON.parse(JSON.stringify(state)) as string[]
                        copy.splice(index, 1)
                        setState(copy)
                    }}>
                    {str}
                    </button>
                </li>
                ))}
            </ul>
        </div>
        )
    }