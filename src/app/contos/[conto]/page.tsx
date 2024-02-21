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
    const res = await getHist({ Ref: params.conto }) as Hist
    const like = await histRepo.get({ ref: params.conto })
    const subhists = await getSubhistsByRef(params.conto)
    if (!res) return <>Nenhuma história foi encontrada!</>
    return (
        <>
            <Conto.Header viewsNum={like.views} data={res}/>
            <Conto.Content data={subhists} />
            <Conto.Relacionado relacionados={res.Relacionados}/>
            <CommentSession data={comments} Ref={params.conto} />
        </>
    )
}