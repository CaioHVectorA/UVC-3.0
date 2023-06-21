import { fakePromise } from "@/utilities/functions/MockupCharacter"
import { Character } from "@/utilities/functions/MockupCharacter"
import '../../styles/components/characters.css'
import Link from "next/link"
import { encryptData } from "@/utilities/functions/CryptoFunctions"
import {URLSearchParams} from 'url'
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
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
    return <div className="px-8">
        {alphabet.map(letter => (
            <>
            <h4 className=" uppercase mt-5 mb-2 font-bold text-3xl">{letter}</h4>
            <div className="gridCardCharacters">
            {Characters.map((char: Character, index: number) => (
                <>
                {char.Nome.toLowerCase().startsWith(letter) && <Card data={char}/>}
                </>
            ))}
            </div>
            </>
        ))}
    </div>
}