"use client"
import { InputList } from "@/components/Global/InputList"
import { CitacoesSection, InstanceSection } from "@/components/create-char-dashboard"
import { createChar, editChar } from "@/server/mongo/actions"
import { IMGS, SCENARIOS_IMGS } from "@/utilities/envariables"
import { RELACIONADOS } from "@/utilities/hists-consts"
import { Atributos, Character, Citacao, Instance } from "@/utilities/types"
import { ValueOf } from "next/dist/shared/lib/constants"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react"
import { GrClose } from "react-icons/gr"
import Select from 'react-select'
const initialState = {
    Apelidos: "",
    NomeVerdadeiro: "",
    Citacoes: [{ Frase: '', Autor: '' }],
    Color: "",
    Equipe: "",
    Imgs: "",
    Instances: [
        { Forma: '', Aparicoes: [], Biografia: '', Atributos: { Agilidade: 1, Forca: 1, Inteligencia: 1, Resistencia: 1 } }
    ],
    isHero: false,
    Keywords: [],
    Local: "",
} satisfies Character
export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const importedState = {
        Apelidos: searchParams.get('Apelidos'),
        Citacoes: (JSON.parse(searchParams.get('Citacoes') || '[]')),
        Color: searchParams.get('Color'),
        Equipe: searchParams.get('Equipe'),
        id: searchParams.get('id'),
        Imgs: searchParams.get('Imgs'),
        Instances: JSON.parse(searchParams.get('Instances') || '[]'),
        isHero: (JSON.parse(searchParams.get('isHero') || 'false')) as boolean,
        Keywords: searchParams.getAll('Keywords'),
        NomeVerdadeiro: searchParams.get('NomeVerdadeiro'),
        Local: searchParams.get('Local')
    } as Character
    console.log(importedState)
    const [formState, setFormState] = useState<Character>(importedState)
    const handleChangeForm = useCallback((key: keyof Character, value: Instance | string | string[] | Citacao | boolean) => {
        const tempState = {...formState}
        //@ts-ignore
        tempState[key] = value
        setFormState(tempState)
    }, [formState])
    const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        handleChangeForm(target.name as keyof Character, target.value)
    }
    const keys = ["Apelidos", "NomeVerdadeiro", "Color", "Equipe", "Local"] as (keyof Character)[]
    return (
        <main className=" w-10/12 mx-auto flex flex-col items-center">
            <div className=" grid grid-cols-2 w-full gap-3 items-center">
                {keys.map((str, index) => (
                    <input key={index} name={str} value={formState[str] as string} placeholder={str} className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' onChange={handleChangeInput}/>
                    ))}
                <div className=" flex gap-6">
                    <label htmlFor="isHero">É herói?</label>
                    <input defaultChecked={formState.isHero} type="checkbox" name="isHero" onChange={(e) => handleChangeForm('isHero', e.target.checked)}/>
                </div>
            </div>
            <div className=" mt-6 w-full">
                <label>Palavras-Chave</label>
                <InputList state={formState.Keywords} setState={(strArr) => {
                    handleChangeForm('Keywords', strArr)
                }}/>
            </div>
            {/* TODO: compont the instances */}
            <InstanceSection formState={formState} setFormState={setFormState }/>
            <div className=" mt-6 w-full">
                <label>Imagens (LINKS)</label>
                <Select onChange={(str) => {
                    if (!str) return
                    handleChangeForm('Imgs', str.value)
                }} className=" text-black" options={Object.values(SCENARIOS_IMGS).map((img, index) => { return { label: Object.keys(SCENARIOS_IMGS)[index], value: img } })}/>
            </div>
            <CitacoesSection formState={formState} setFormState={setFormState} />
            <button onClick={() => editChar(params.id, formState).then(() => alert("Inserido no sistema!"))} className=" my-4">Editar</button>
        </main>
    )
}