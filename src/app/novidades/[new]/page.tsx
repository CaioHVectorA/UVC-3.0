import { New } from "@/server/News/DTOs/New"
import { NewsRepository } from "@/server/News/NewsRepository"
import { URL } from "@/utilities/envariables"
import axios from "axios"
import Link from "next/link"

const newsRepository = new NewsRepository()
export default async function Page({params}: {params: { new: string }}) {
    const res = (await newsRepository.prisma.$queryRaw`SELECT * FROM News WHERE id = ${params.new}` as New[])[0]

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