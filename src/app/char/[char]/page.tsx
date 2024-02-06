import Character from "@/components/CharacterPage/Character"
import Characters from "@/components/Characters/Char"
import { chars } from "@/server/mongo/models"
import { URL_READONLY } from "@/utilities/envariables"
import axios from "axios"
export default async function PaginaDoCharacter({params}: {params: {char: string}}) {
    const Nome = params.char.replaceAll('-',' ').replace(/%C3%A3/g, "ã").replace(/%C3%A1/g, "á").replace(/%7E/g, "~").replace(/%5E/g, "^").replace(/%C2%B4/g, "´")
    const data = await chars.findOne({ Nome })
    if (!data) return <pre>{JSON.stringify(data)}</pre>
    return <Character data={data}/>
}