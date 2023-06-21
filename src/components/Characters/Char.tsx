import { fakePromise } from "@/utilities/functions/MockupCharacter"
import { Character } from "@/utilities/functions/MockupCharacter"
import '../../styles/components/characters.css'
import Link from "next/link"
import { encryptData } from "@/utilities/functions/CryptoFunctions"
import {URLSearchParams} from 'url'
function Card({ data }: {data: Character}) {
    return (
        <Link href={`/char/${data.Nome.toLowerCase()}`}>
    <div className="CardCharacter BGcolorText" style={{borderTop: `6px solid ${data.Color}`}}>
        <h4 className="cardCharacterTitle">{data.Nome}</h4>
        <p className="cardCharacterText">"{data.Apelido}"</p>
    </div>
        </Link>
    ) 
}
export default async function Characters() {
    const Characters: any = await fakePromise() 
    return <div className="gridCardCharacters px-8">
        {Characters.map((char: Character, index: number) => (
            <Card data={char}/>
        ))}
    </div>
}