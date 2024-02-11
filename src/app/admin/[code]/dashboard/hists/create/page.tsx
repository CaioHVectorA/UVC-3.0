"use client"

import { RELACIONADOS } from "@/utilities/hists-consts"
import { useCallback, useState } from "react"

import mammoth from "mammoth"
import { getArrayBuffer } from "@/utilities/functions/getArrayBuffer"
import { subHists } from "@/server/mongo/models"
import { createHist, createSubHist } from "@/server/mongo/actions"
import Select from 'react-select'
import { saveFile } from "@/server/saveFile"
type formProps = {
    Nome: string,
    Sinopse: string,
    Img: string,
    Ref: string,
    Relacionados: { Ref: string, Img: string, Nome: string }[]
}
const initialState: formProps = {
    Nome: '',
    Sinopse: '',
    Img: '',
    Ref: '',
    Relacionados: [],
}
const relacionadosData = Object.values(RELACIONADOS).map(i => {
    return { label: `${i.Ref} - ${i.Nome}`, value: i }
})
export default function CreateHistPage() {
    const [formState, setFormState] = useState<formProps>(initialState)
    const changeField = useCallback((key: keyof formProps, newValue: string | string[]) => {
        const tempState = {...formState}
        //@ts-ignore
        tempState[key] = newValue
        setFormState(tempState)
    }, [formState])
    console.log(formState)
    return (
        <main className=' flex flex-col items-center w-screen px-8 gap-4'>
            <input value={formState.Nome} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Nome' onChange={({ target }) => changeField('Nome', target.value)}/>
            <input value={formState.Img} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Img' onChange={({ target }) => changeField('Img', target.value)}/>
            <input value={formState.Ref} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Ref' onChange={({ target }) => changeField('Ref', target.value)}/>
            <Select />
            <button className=" w-full" onClick={() => {
                console.log(formState)
                createHist(formState).then(() => alert("Criado com sucesso!"))
            }}>Criar</button>
        </main>        
    )
}