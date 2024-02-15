import { Character } from "@/utilities/types"
import { GrClose } from "react-icons/gr"

export function CitacoesSection({ formState, setFormState }: { formState: Character, setFormState: (newValue: Character) => void }) {
    return (
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

            setFormState({...formState, Citacoes: [...formState.Citacoes, { Frase: '', Autor: '' }]})
        }}>Criar citação</button>
    </div>
    )
}