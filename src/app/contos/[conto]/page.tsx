import ContainerForConto from "@/components/ContoPage/ContainerContoPage"
import Universe from "@/components/ContoPage/InitialUniverse"
import { Serie_Type, Solo_Type } from "@/utilities/types"
import { URL, URL_READONLY } from "@/utilities/envariables"
import axios from "axios"
import { api, get } from "@/lib/fetch"
import { hists } from "@/server/mongo/models"
import fetchData from "@/utilities/functions/FetchData"
import { connectedPromise } from "@/server/mongo/actions"
type Comment = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    author_img: string
}
export default async function Conto({params}: {params: {conto: string}}) {
    await connectedPromise
    const comments = (await fetchData(`http://localhost:3000/api/comment/${params.conto}`)).data as unknown as Comment[]
    const res = await hists.findOne({ Ref: params.conto }) as unknown as Serie_Type | Solo_Type
    const like = (await fetchData(`http://localhost:3000/api/hist/${params.conto}`)).data
    // return <>{}</>
    return <ContainerForConto histID={like.id} Ref={params.conto} data={res} datacomments={comments}/>
}