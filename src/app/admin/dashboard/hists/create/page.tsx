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
    BgImg: string,
    Relacionados: { Ref: string, Img: string, Nome: string }[],
    Categorias: { value: string, label: string }[]
}
const initialState: formProps = {
    Nome: '',
    Sinopse: '',
    Img: '',
    BgImg: '',
    Ref: '',
    Relacionados: [],
    Categorias: []
}
const relacionadosData = Object.values(RELACIONADOS).map(i => {
    return { label: `${i.Ref} - ${i.Nome}`, value: i }
})
const categoriesData = ["Drama", "Aventura", "Ação", "Violência", "Sci-Fi", "Gestão"].map((str) => {return { value: str, label: str } } )

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
            <input value={formState.BgImg} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Imagem de fundo' onChange={({ target }) => changeField('BgImg', target.value)}/>
            <div className=' grid grid-cols-[1fr,1fr] w-full gap-2'>
                <Select placeholder="Img" className=" text-black w-full" options={Object.values(RELACIONADOS).map(item => { return { value: item.Img, label: item.Nome } })} onChange={(newValue) => {
                    changeField('Img', newValue?.value || '')                            
                }} />
                <input placeholder='Img' className=' w-full' value={formState.Img} onChange={({ target }) => changeField('Img', target.value)}/>
            </div>
            <input value={formState.Ref} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Ref' onChange={({ target }) => changeField('Ref', target.value)}/>
            <textarea rows={4} value={formState.Sinopse} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Sinopse da história - De forma objetiva do que a hstória proporciona a partir das subhists' onChange={({ target }) => changeField('Sinopse', target.value)} />
            <Select isMulti className=" text-black w-full" options={Object.values(RELACIONADOS).map(item => { return { value: item, label: item.Nome } })} onChange={(newValue) => {
                //@ts-ignore
                changeField('Relacionados', newValue.map(i => { return i.value }))
            }} />
            <Select placeholder="Categorias" className=' text-black w-full' isMulti name='Categories' options={categoriesData} onChange={(newValue: any) => {
                changeField('Categorias', newValue)
            }}/>
            <button className=" w-full" onClick={() => {
                createHist({...formState, Categorias: formState.Categorias.map(i => { return i.value })}).then(() => alert("Criado com sucesso!"))
                setFormState(initialState)
            }}>Criar</button>
        </main>        
    )
}