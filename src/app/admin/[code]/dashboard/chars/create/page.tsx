"use client"

import { InputList } from "@/components/Global/InputList"
import { IMGS } from "@/utilities/envariables"
import { RELACIONADOS } from "@/utilities/hists-consts"
import { Atributos, Character, Citacao, Instance } from "@/utilities/types"
import { ValueOf } from "next/dist/shared/lib/constants"
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react"
import { GrClose } from "react-icons/gr"
import Select from 'react-select'
const initialState = {
    Apelidos: "",
    NomeVerdadeiro: "",
    Citacoes: [{ Frase: '', Autor: '' }],
    Color: "",
    Equipe: "",
    Imgs: [],
    Instances: [
        { Forma: '', Aparicoes: [], Biografia: '', Atributos: { Agilidade: 1, Forca: 1, Inteligencia: 1, Resistencia: 1 } }
    ],
    isHero: false,
    Keywords: [],
    Local: "",
} satisfies Character
export default function Page() {
    const [formState, setFormState] = useState<Character>(initialState)
    const handleChangeForm = useCallback((key: keyof Character, value: Instance | string | string[] | Citacao) => {
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
            </div>
            <div className=" mt-6 w-full">
                <label>Palavras-Chave</label>
                <InputList state={formState.Keywords} setState={(strArr) => {
                    handleChangeForm('Keywords', strArr)
                }}/>
            </div>
            {/* TODO: compont the instances */}
            <section className=" w-full mt-4 border border-black rounded-md py-8 px-8 flex flex-col gap-2 items-center">
                <h2>Instâncias</h2>
                {formState.Instances.map((instance, index) => (
                    <div key={index} className=" py-10 px-3 w-full bg-blue-400 bg-opacity-25 relative rounded-sm">
                        <GrClose className=" absolute invert right-2 top-2 hover:cursor-pointer" onClick={() => {
                            const tempState = { ...formState }
                            tempState.Instances.splice(index, 1)
                            setFormState(tempState)
                        }}/>
                        <input className=' w-full py-1 px-2 rounded-sm border mb-6 border-gray-300 text-black' placeholder="Nome da forma" value={formState.Instances[index].Forma} onChange={({ target }) => {
                            const tempState = { ...formState }
                            tempState.Instances[index].Forma = target.value
                            setFormState(tempState)
                        }}/>
                        <Select isMulti className=" text-black" options={Object.values(RELACIONADOS).map(item => { return { value: item, label: item.Nome } })} onChange={(newValue) => {
                            const tempState = { ...formState }
                            //@ts-ignore
                            tempState.Instances[index].Aparicoes = newValue
                            setFormState(tempState)                            
                        }} />
                        <textarea className=" mt-2 w-full rounded-md py-1 px-1 text-black" value={formState.Instances[index].Biografia} onChange={({ target }) => {
                            const tempState = { ...formState }
                            tempState.Instances[index].Biografia = target.value
                            setFormState(tempState)
                        }} rows={9}></textarea>
                        <div className=" flex flex-col gap-2">
                            {Object.keys(formState.Instances[0].Atributos).map(key => (
                                <div key={key} className=" grid grid-cols-3">
                                    <p>{key}</p>
                                    <input key={key} value={formState.Instances[index].Atributos[key as keyof Atributos]} type="range" min={1} max={10} onChange={(e) => {
                                        const tempState = { ...formState }
                                        tempState.Instances[index].Atributos[key as keyof Atributos] = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
                                        setFormState(tempState)
                                    }} step={1}/>
                                    <p>{formState.Instances[index].Atributos[key as keyof Atributos]}</p>
                                </div>
                                ))}
                        </div>
                    </div>
                ))}
                <button onClick={() => {
                    const tempState = { ...formState }   
                    tempState.Instances.push({ Aparicoes: [], Biografia: '', Atributos: { Agilidade: 1, Forca: 1, Inteligencia: 1, Resistencia: 1 }, Forma: '' })
                    setFormState(tempState)
                }}>Criar instance</button>
            </section>
            <div className=" mt-6 w-full">
                <label>Imagens (LINKS)</label>
                <Select isMulti onChange={(str) => {
                    const imgArr = str.map(i => { return i.value })
                    handleChangeForm('Imgs', imgArr)
                }} className=" text-black" options={Object.values(IMGS).map((img, index) => { return { label: Object.keys(IMGS)[index], value: img } })}/>
            </div>
            <div className=" mt-6 w-full border border-black py-3 px-2">
                <h2>Citações</h2>
                {formState.Citacoes.map((citacao, index) => (
                    <>
                    <div className=" mb-6 flex flex-col gap-3 relative">
                        <GrClose className=" absolute top-2 right-2 invert cursor-pointer" onClick={() => {
                            const tempState = { ...formState }
                            tempState.Citacoes.splice(index, 1)
                            setFormState(tempState)                            
                        }} />
                        <label>Frase</label>
                        <input className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' value={citacao.Frase} onChange={({ target }) => {
                            const tempState = { ...formState }
                            tempState.Citacoes[index].Frase = target.value
                            setFormState(tempState)
                        }}/>
                        <label>Autor</label>
                        <input className=' w-full py-1 px-2 rounded-sm border border-gray-300 text-black' value={citacao.Autor || ""} onChange={({ target }) => {
                            const tempState = { ...formState }
                            tempState.Citacoes[index].Autor = target.value
                            setFormState(tempState)
                        }}/>
                        </div>
                        <hr className=" mb-2"/>
                        </>
                ))}
                <button onClick={() => {
                    //@ts-ignore
                    handleChangeForm('Citacoes', [...formState.Citacoes, { Frase: '', Autor: '' }])
                }}>Criar citação</button>
            </div>
            <button onClick={() => console.log(formState)}>Enviar</button>
        </main>
    )
}