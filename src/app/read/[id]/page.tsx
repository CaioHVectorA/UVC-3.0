import { URL_READONLY, URL_TXT } from "@/utilities/envariables"
import axios from "axios"
import HistPage from "../histpage"
import { Serie_Type, Solo_Type, SubHist } from "@/utilities/types"
import fetchData from "@/utilities/functions/FetchData"
import { getSubhistById } from "@/server/mongo/actions"

export default async function Hist({ params }: {params: {id: string}}) {
    const data = await getSubhistById(params.id)
    return <div>
        <h3 className=" mt-5 mb-4">Você está lendo: {data.Nome}</h3>
        <HistPage text={data.Source}/>
        </div>
}