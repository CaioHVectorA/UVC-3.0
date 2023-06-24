import ContainerForConto from "@/components/ContoPage/ContainerContoPage"
import Universe from "@/components/ContoPage/InitialUniverse"
import { URL, URL_READONLY } from "@/utilities/envariables"
import axios from "axios"

export default async function Conto({params}: {params: {conto: string}}) {
    const res = (await axios.get(URL_READONLY+params.conto)).data
    const comments = (await axios.get(URL+'comment/'+params.conto)).data
    const like = await (await fetch(URL + 'hist/' + params.conto, {cache: 'no-store'})).json()
    // const like = await (await axios.get(URL+'hist/'+params.conto)).data
    console.log(like)
    console.log(comments)
    return <ContainerForConto Ref={params.conto} data={res} datacomments={comments}/>
}