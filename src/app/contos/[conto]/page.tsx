import ContainerForConto from "@/components/conto-page/ContainerContoPage"
import Universe from "@/components/conto-page/InitialUniverse"
import { Serie_Type, Solo_Type } from "@/utilities/types"
import { URL, URL_READONLY } from "@/utilities/envariables"
import axios from "axios"
import { api, get } from "@/lib/fetch"
import { hists } from "@/server/mongo/models"
import fetchData from "@/utilities/functions/FetchData"
import { connectedPromise } from "@/server/mongo/actions"
import { HistRepository } from "@/server/hists/HistRepository"
import { CommentRepository } from "@/server/comment/CommentRepository"
type Comment = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    author_img: string
}
const histRepo = new HistRepository()
const commentRepo = new CommentRepository()
export default async function Conto({params}: {params: {conto: string}}) {
    await connectedPromise
    const comments = await commentRepo.get({ ref: params.conto }) as Comment[]
    const res = await hists.findOne({ Ref: params.conto }) as unknown as Serie_Type | Solo_Type
    const like = await histRepo.get({ ref: params.conto })
    // return <>{}</>
    return <ContainerForConto histID={like.id} Ref={params.conto} data={res} datacomments={comments}/>
}