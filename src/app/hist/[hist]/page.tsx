import { URL_READONLY, URL_TXT } from "@/utilities/envariables"
import axios from "axios"
import HistPage from "../histpage"
import { Serie_Type, Solo_Type } from "@/utilities/types"
import fetchData from "@/utilities/functions/FetchData"

export default async function Hist({ params }: {params: {hist: string}}) {
    const data = (await fetchData(`${URL_TXT}solo/${params.hist}`)).data
const histData: Serie_Type | Solo_Type = (await axios(`${URL_READONLY}${params.hist}`)).data
    return <div>
        <h3 className=" mt-5 mb-4">Você está lendo: {histData.Nome}</h3>
        <HistPage text={data}/>
        </div>
}