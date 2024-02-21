import { Button } from "@/components/ui/button";
import {  getSubHists } from "@/server/mongo/actions";
import { subHists } from "@/server/mongo/models";
import { Hist, SubHist } from "@/utilities/types";
import Link from "next/link";
import querystring from 'querystring'
export default async function RenderAllSubhists({ params }: { params: { code: string } }) {
    const data = await getSubHists() as SubHist[]
    console.log(data)
    return (
        <main className=" flex w-screen flex-col items-center gap-6">
        <Link href={`/admin/dashboard/subhists/create`} className=" justify-self-center px-3 py-1 bg-[var(--color-main)] w-4/12 text-center hover:rounded-full rounded-sm uppercase text-2xl">Criar subhist</Link>
            {data.map(({ Categorias, Img, Nome, Ref, Sinopse, _id }) => (
                <div className=" flex">
                    <img src={Img}/>
                    <div className=" bg-black py-4 px-4 pr-[10%] flex flex-col gap-2 bg-opacity-60">
                        <h1>{Nome}</h1>
                        <p>{Sinopse}</p>
                        <Button asChild className=" w-full text-center">
                            <Link href={`/admin/dashboard/subhists/edit/${_id}?${querystring.stringify({ Categorias, Img, Nome, Ref, Sinopse, id: _id })}`}>Editar</Link>
                        </Button>
                    </div>
                </div>
            ))}
        </main>
    )
}