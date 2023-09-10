import ContainerForSearch from "@/components/Search/ContainerForSearch"
import { URL_READONLY } from "@/utilities/envariables"
import fetchData from "@/utilities/functions/FetchData"

export default async function Search({params}: {params: {search: string}}) {
    const data = (await fetchData(URL_READONLY+"searchdata")).data
    return (
        <ContainerForSearch data={data} search={params.search}/>
    )
}