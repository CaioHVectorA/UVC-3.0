import {  getSubHists } from "@/server/mongo/actions";
import { subHists } from "@/server/mongo/models";
import Link from "next/link";

export default async function RenderAllSubhists({ params }: { params: { code: string } }) {
    const data = await getSubHists()
    return (
        <main className=" flex w-screen flex-col items-center">
        <Link href={`/admin/${params.code}/dashboard/subhists/create`} className=" justify-self-center px-3 py-1 bg-[var(--color-main)] w-4/12 text-center hover:rounded-full rounded-sm uppercase text-2xl">Criar subhist</Link>
            {data.map((d) => (<pre>{JSON.stringify(d, null, 2)}</pre>))}
        </main>
    )
}