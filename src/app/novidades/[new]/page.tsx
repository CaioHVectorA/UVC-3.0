import { URL } from "@/utilities/envariables"
import axios from "axios"
import Link from "next/link"


export default async function Page({params}: {params: { new: string }}) {
    const res = await (await axios.get(`${URL}api/news/${params.new}`)).data

    return (
        <div className=" flex flex-col pt-4 px-3 gap-2 items-center">
            <h1 className=" text-5xl">{res.title}</h1>
            <p className=" md:w-8/12">{res.body}</p>
            <Link href={'/novidades'}>
                <button>Voltar as notícias</button>
            </Link>
        </div>
    )
}