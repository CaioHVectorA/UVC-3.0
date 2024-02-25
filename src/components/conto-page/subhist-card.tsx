import Link from 'next/link'
import { Clock, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { SubHist } from "@/utilities/types";

export function SubhistCard({ subhist }: { subhist: SubHist }) {
    return (
        <div className=" w-2/4 flex flex-col h-fit">
        <div className=" flex w-full">
            <img src={subhist.Img} className="w-1/2 object-cover rounded-tl-xl" /> 
            <div className=" bg-black bg-opacity-70 w-1/2 p-3 rounded-tr-xl">
                <h3>{subhist.Nome}</h3>
                <p>{subhist.Sinopse}</p>
            </div>
        </div>
        <div className=" flex">
            <Button className=" w-full bg-[var(--color-mainclaro)] flex gap-2 rounded-none rounded-bl-xl">
                <p>Ler mais tarde</p>
                <Clock className="text-black"/>
            </Button>
            <Button className=" w-full flex gap-2 rounded-none rounded-br-xl py-3" asChild>
                <Link href={`/read/${subhist._id}`}>
                    <p>Ler</p>
                    <ExternalLink />
                </Link>
            </Button>
        </div>
    </div>

    )
}