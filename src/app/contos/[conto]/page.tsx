import { Conto } from '@/components/conto-page/'
import { HistRepository } from "@/server/hists/HistRepository"
import { CommentRepository } from "@/server/comment/CommentRepository"
import { getHist, getSubHists, getSubhistsByRef } from "@/server/mongo/actions"
import { Hist, IComment } from '@/utilities/types'
import { CommentSession } from '@/components/conto-page/comment'
const histRepo = new HistRepository()
const commentRepo = new CommentRepository()
export default async function ContoPage({params}: {params: {conto: string}}) {
    const comments = await commentRepo.get({ ref: params.conto }) as IComment[]
    const res = await getHist({ Ref: params.conto }) as Hist & { _id: string } 
    const hist = await histRepo.get({ ref: params.conto })
    const subhists = await getSubhistsByRef(params.conto)
    if (!res) return <>Nenhuma história foi encontrada!</>
    return (
        <>
            <Conto.Header histMongoId={res._id} viewsNum={hist.views} data={res} histId={hist.id}/>
            <Conto.Content data={subhists} />
            <Conto.Relacionado relacionados={res.Relacionados}/>
            <CommentSession data={comments} Ref={params.conto} />
        </>
    )
}