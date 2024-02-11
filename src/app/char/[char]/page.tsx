import Character from "@/components/character-page-components"
import { chars } from "@/server/mongo/models"
import { formatURL } from "@/utilities/functions/formatURL"
export default async function CharacterPage({params}: {params: {char: string}}) {
    const Nome = formatURL(params.char)
    console.log(Nome)
    const data = await chars.findOne({ Nome })
    console.log({data})
    return <Character data={data}/>
}