import ContainerForConto from "@/components/ContoPage/ContainerContoPage"
import Universe from "@/components/ContoPage/InitialUniverse"
import { URL_READONLY } from "@/utilities/envariables"
import axios from "axios"

export default async function Conto({params}: {params: {conto: string}}) {
    const res = (await axios(URL_READONLY+params.conto)).data
    return <ContainerForConto data={res}/>
}