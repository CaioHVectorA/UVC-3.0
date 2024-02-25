import { CharacterComponents as Char } from "@/components/character-page-components"
import { getCharByName } from "@/server/mongo/actions"
import { chars } from "@/server/mongo/models"
import { formatURL } from "@/utilities/functions/formatURL"
import { Character } from "@/utilities/types"
export default async function CharacterPage({params}: {params: {char: string}}) {
    const NomeVerdadeiro = formatURL(params.char)
    const data = await getCharByName(NomeVerdadeiro) as Character
    return (
        <>
            <Char.SectionInitial data={data}/>
            <Char.Instances data={data.Instances}/>
        </>
    )
}