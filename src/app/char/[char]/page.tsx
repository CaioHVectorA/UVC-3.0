import Character from "@/components/character-page-components"
import { chars } from "@/server/mongo/models"
import { formatURL } from "@/utilities/functions/formatURL"
import axios from "axios"
export default async function CharacterPage({params}: {params: {char: string}}) {
    const Nome = formatURL(params.char)
    const data = await chars.findOne({ Nome })
    return <Character data={data}/>
}