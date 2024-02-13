"use client"
import Select from 'react-select'
import { useCallback, useState } from "react"
import { RELACIONADOS } from '@/utilities/hists-consts'
import { subHists } from '@/server/mongo/models'
import { createSubHist } from '@/server/mongo/actions'
import { saveFile } from '@/server/saveFile'
type formProps = {
    Nome: string,
    Img: string,
    Sinopse: string,
    Ref: string,
    Source: string
    Categories: { value: string, label: string }[],
}
const initialState = {
    Nome: '',
    Img: '',
    Ref: '',
    Sinopse: '',
    Source: 'N/A',
    Categories: [],
} as formProps
const categoriesData = ["Drama", "Aventura", "Ação", "Violência", "Sci-Fi", "Gestão"].map((str) => {return { value: str, label: str } } )
export default function CreateSubhistPage({ params }: { params: { code: string } }) {7
    const [formState, setFormState] = useState<formProps>(initialState)
    const changeField = useCallback((key: keyof formProps, newValue: string | string[]) => {
        const tempState = {...formState}
        //@ts-ignore
        tempState[key] = newValue
        setFormState(tempState)
    }, [formState])
    //todo : add a categories data
    const submitFile = useCallback(async (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (!e.target || !e.target.result) return
            changeField('Source', e.target.result.toString())
        }
        reader.readAsText(file)
}, [formState])
console.log(formState)
    return (
        <main className=' flex flex-col items-center w-screen px-8 gap-4'>
        <input value={formState.Nome} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Nome' onChange={({ target }) => changeField('Nome', target.value)}/>
        <textarea placeholder='Sinopse' rows={4} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' value={formState.Sinopse} onChange={({ target }) => changeField('Sinopse', target.value)}/>
        <input value={formState.Img} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Img' onChange={({ target }) => changeField('Img', target.value)}/>
        <input value={formState.Ref} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Ref' onChange={({ target }) => changeField('Ref', target.value)}/>
        <input type="file" accept=".html" onChange={(e) => {
                if (!e.target.files || e.target.files.length == 0) return
                submitFile(e.target.files[0])
            }}/>
        <Select placeholder="Categories" className=' text-black w-full' isMulti name='Categories' options={categoriesData} onChange={(newValue: any) => {
            changeField('Categories', newValue)
        }}/>

        <button className=' w-full' onClick={async () => {
            // console.log(formState.Categories)
            const data = {...formState, Categorias: formState.Categories.map(i => {return i.value})}
            // const { Categories: cat, Img, Nome, Ref, Relacionados: rel } = formState
            // const Categories = cat.map(i => i.value)
            // const Relacionados = rel.map(i => i.value)
            // console.log(Relacionados, rel)
            await createSubHist(data)
            alert("Inserido no sistema  !")
        }}>Enviar</button>
        </main>
    )
}