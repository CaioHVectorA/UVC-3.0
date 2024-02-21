import Character from "@/components/character-page-components"
import { chars } from "@/server/mongo/models"
import { formatURL } from "@/utilities/functions/formatURL"
export default async function CharacterPage({params}: {params: {char: string}}) {
    const NomeVerdadeiro = formatURL(params.char)
    const data = await chars.findOne({ NomeVerdadeiro })
    return <Character data={data}/>
}