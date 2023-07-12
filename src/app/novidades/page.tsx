import { URL } from "@/utilities/envariables"
import axios from "axios"
import Link from "next/link";
type News = {
    id: number;
    title: string;
    body?: string | null;
    external_link?: string | null;
    image: string;
    created_at: Date | string;
    views: number;
  }

export default async function Page() {
    const res: News[] = await (await axios(URL+'news')).data
    return (
        <div className=" flex flex-col items-center w-screen">
        <h3 className=" mt-8 mb-4">NOVIDADES</h3>
        <div className=" flex flex-col gap-5 justify-center">
        {res.map(item => (
            <Link href={item.external_link ? item.external_link : `/novidades/${item.id}`} className=" cursor-pointer flex gap-3 px-11 max-lg:w-screen max-lg:px-2">
            <img className=" w-80 aspect-video object-cover max-lg:w-6/12" src={item.image}/>
            <h4 className=" w-full max-w-2xl max-lg:text-lg text-ellipsis whitespace-normal overflow-hidden max-lg:w-6/12">{item.title}</h4>
            </Link>
        ))}
        </div>
        </div>
    )
}