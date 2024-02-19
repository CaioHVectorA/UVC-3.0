"use client"

import { RELACIONADOS } from "@/utilities/hists-consts"
import { useCallback, useState } from "react"

import { createHist, createSubHist, editHist } from "@/server/mongo/actions"
import Select from 'react-select'
import { useSearchParams } from "next/navigation"
import { Relacionado } from "@/utilities/types"
type formProps = {
    Nome: string,
    Sinopse: string,
    Img: string,
    Ref: string,
    Relacionados: { Ref: string, Img: string, Nome: string }[],
    Categorias: { value: string, label: string }[]
}
const initialState: formProps = {
    Nome: '',
    Sinopse: '',
    Img: '',
    Ref: '',
    Relacionados: [],
    Categorias: []
}
const relacionadosData = Object.values(RELACIONADOS).map(i => {
    return { label: `${i.Ref} - ${i.Nome}`, value: i }
})
const categoriesData = ["Drama", "Aventura", "Ação", "Violência", "Sci-Fi", "Gestão"].map((str) => {return { value: str, label: str } } )

export default function CreateHistPage({ params }: { params: { id: string } }) {
    const { get } = useSearchParams()
    console.log(get('Nome'))
    const importedState: formProps = {
        Nome: get('Nome') || '',
        Sinopse: get('Sinopse') || '',
        Img: get("Img") || '',
        Ref: get('Ref') || '',
        Relacionados: JSON.parse(get('Relacionados') || "[]"),
        Categorias: JSON.parse(get('Categorias') || "[]")
    }
    const [formState, setFormState] = useState<formProps>(importedState)
    const changeField = useCallback((key: keyof formProps, newValue: string | string[]) => {
        const tempState = {...formState}
        //@ts-ignore
        tempState[key] = newValue
        setFormState(tempState)
    }, [formState])
    return (
        <main className=' flex flex-col items-center w-screen px-8 gap-4'>
            <input value={formState.Nome} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Nome' onChange={({ target }) => changeField('Nome', target.value)}/>
            <Select defaultValue={{ value: formState.Img, label: formState.Nome }} className=" text-black w-full" options={Object.values(RELACIONADOS).map(item => { return { value: item.Img, label: item.Nome } })} onChange={(newValue) => {
                changeField('Img', newValue?.value || '')                            
            }} />
            <input value={formState.Ref} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Ref' onChange={({ target }) => changeField('Ref', target.value)}/>
            <textarea rows={4} value={formState.Sinopse} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Sinopse da história - De forma objetiva do que a hstória proporciona a partir das subhists' onChange={({ target }) => changeField('Sinopse', target.value)} />
            <Select defaultValue={formState.Relacionados.map(item => { return { label: item.Nome, value: item } })} isMulti className=" text-black w-full" options={Object.values(RELACIONADOS).map(item => { return { value: item, label: item.Nome } })} onChange={(newValue) => {
                //@ts-ignore
                changeField('Relacionados', newValue.map(i => { return i.value }))
            }} />
            <Select placeholder="Categorias" defaultValue={formState.Categorias.map(item => { return { label: item, value: item } })} className=' text-black w-full' isMulti name='Categorias' options={categoriesData} onChange={(newValue: any) => {
                changeField('Categorias', newValue)
                }}/>
            <button className=" w-full" onClick={() => {
                console.log(formState)
                editHist(params.id, formState).then(() => alert("Editado com sucesso!"))
                setFormState(initialState)
            }}>Editar</button>
        </main>
    )
}