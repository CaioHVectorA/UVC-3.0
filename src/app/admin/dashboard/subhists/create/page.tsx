"use client"
import Select from 'react-select'
import { useCallback, useState } from "react"
import { RELACIONADOS } from '@/utilities/hists-consts'
import { subHists } from '@/server/mongo/models'
import { addSubhistToHist, createSubHist } from '@/server/mongo/actions'
import { saveFile } from '@/server/saveFile'
type formProps = {
    Nome: string,
    Img: string,
    Sinopse: string,
    Ref: string,
    Source: string
}
const initialState = {
    Nome: '',
    Img: '',
    Ref: '',
    Sinopse: '',
    Source: 'N/A',
} as formProps
export default function CreateSubhistPage() {
    const [formState, setFormState] = useState<formProps>(initialState)
    const changeField = useCallback((key: keyof formProps, newValue: string | string[]) => {
        const tempState = {...formState}
        //@ts-ignore
        tempState[key] = newValue
        setFormState(tempState)
    }, [formState])
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
        <Select className=" text-black w-full" options={Object.values(RELACIONADOS).map(item => { return { value: item.Img, label: item.Nome } })} onChange={(newValue) => {
                changeField('Img', newValue?.value || '')                            
            }} />
        <input value={formState.Ref} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' placeholder='Ref' onChange={({ target }) => changeField('Ref', target.value)}/>
        <input type="file" accept=".html" onChange={(e) => {
                if (!e.target.files || e.target.files.length == 0) return
                submitFile(e.target.files[0])
            }}/>
    <div className=' max-h-[16rem] overflow-hidden' dangerouslySetInnerHTML={{ __html: formState.Source }}></div>
        <button className=' w-full' onClick={async () => {
            await createSubHist(formState).then(id => addSubhistToHist(formState.Ref, id))
            alert("Inserido no sistema  !")
        }}>Enviar</button>
        </main>
    )
}