import ContainerForSearch from "@/components/Search/ContainerForSearch"
import { URL_READONLY } from "@/utilities/envariables"
import axios from "axios"

export default async function Search({params}: {params: {search: string}}) {
    const data = await (await axios.get(URL_READONLY+"search")).data
    return (
        <ContainerForSearch data={data} search={params.search}/>
    )
}