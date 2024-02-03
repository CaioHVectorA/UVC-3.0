import Character from "@/components/CharacterPage/Character"
import Characters from "@/components/Characters/Char"
import { chars } from "@/server/mongo/models"
import { URL_READONLY } from "@/utilities/envariables"
import axios from "axios"
export default async function PaginaDoCharacter({params}: {params: {char: string}}) {
    const data = await chars.findOne({ Nome: params.char })
    return <Character data={data}/>
}