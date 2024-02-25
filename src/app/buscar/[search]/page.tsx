import ContainerForSearch from "@/components/Search/ContainerForSearch"
import { getChars, getHists, getSubHists } from "@/server/mongo/actions"
import { Character, Hist, SubHist } from "@/utilities/types"

export default async function Search({params}: {params: {search: string}}) {
    const chars = await getChars()
    const subHists = await getSubHists() as SubHist[]
    return (
        <ContainerForSearch data={[...chars, ...subHists] as (Character & { id: string } | Hist | SubHist)[]} search={params.search}/>
    )
}