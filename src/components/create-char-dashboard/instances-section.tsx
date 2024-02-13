import { RELACIONADOS } from "@/utilities/hists-consts"
import { Atributos, Character } from "@/utilities/types"
import { GrClose } from "react-icons/gr"
import Select from 'react-select'
export function InstanceSection({ formState, setFormState }: { formState: Character, setFormState: (newValue: Character) => void }) {
    return (
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
                    <div key={key} className=" grid grid-cols-3 gap-5">
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
    )
}