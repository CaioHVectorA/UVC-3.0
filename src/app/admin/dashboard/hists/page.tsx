import { getHists } from "@/server/mongo/actions"
import { Hist } from "@/utilities/types"
import Link from "next/link"
import querystring from 'querystring'
function translateToURL(data: any) {
    const translated = typeof data == 'string' ? data : JSON.stringify(data)
    return JSON.stringify(data).replace(' ', '+')
}
function getParams(fields: Hist) {
    const { keys, values } = Object
    const [k, v] = [keys(fields), values(fields)]
    let string = ''
    k.forEach((field, index) => {
        string += `${field}=${translateToURL(v[index])}`
    })
    return string
}
export default async function HistsDashboard() {
    const hists = await getHists() as (Hist & { id: string })[]
    return (
        <main className=" flex flex-col gap-4">
            {hists.map(({ Img, Nome, Sinopse, id, Relacionados, Ref, Categorias }) => (
                <div className=" flex w-10/12 mx-auto gap-4">
                    <img src={Img} className=" w-48 aspect-square"/>
                    <div className=" flex flex-col mt-2">
                        <h3 className=" text-start">{Nome}</h3>
                        <p className=" w-8/12">{Sinopse}</p>
                        <Link className=" bg-[var(--color-main)] w-8/12 py-2 rounded-sm uppercase text-center" target="_blank" href={`/admin/dashboard/hists/edit/${id}?${querystring.stringify({ Nome, Sinopse, Img, Relacionados: JSON.stringify(Relacionados), Ref, Categorias: JSON.stringify(Categorias) })}`}>Editar</Link>
                    </div>
                </div>
            ))}
        </main>
    )
}