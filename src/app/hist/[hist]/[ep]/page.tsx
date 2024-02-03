import { URL_READONLY, URL_TXT } from "@/utilities/envariables"
import axios from "axios"
import HistPage from "../../histpage"
import { Serie_Type, Solo_Type } from "@/utilities/types"

export default async function Hist({ params }: {params: {hist: string,ep: string}}) {
    const data = (await axios(`${URL_TXT}serie/${params.hist}/${params.ep}`)).data
    const histData: Serie_Type | Solo_Type = (await axios(`${URL_READONLY}${params.hist}`)).data
    return <div>
        <h3 className=" mt-5 mb-4">Você está lendo: {histData.Nome}, Ep {params.ep}</h3>
        <HistPage text={data}/>
        </div>
}