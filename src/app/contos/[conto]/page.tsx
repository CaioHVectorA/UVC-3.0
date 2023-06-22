import ContainerForConto from "@/components/ContoPage/ContainerContoPage"
import Universe from "@/components/ContoPage/InitialUniverse"
import { URL_READONLY } from "@/utilities/envariables"

export default async function Conto({params}: {params: {conto: string}}) {
    const res = await (await fetch(URL_READONLY+params.conto)).json()
    return <ContainerForConto data={res}/>
}