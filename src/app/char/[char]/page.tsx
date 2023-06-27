import Character from "@/components/CharacterPage/Character"
import { URL_READONLY } from "@/utilities/envariables"
import axios from "axios"

export default async function PaginaDoCharacter({params}: {params: {char: string}}) {
    const data = (await axios.get(URL_READONLY+'char/'+params.char)).data
    // console.log(URL_READONLY+'char')
    console.log(data)
    return <Character data={data}/>
}