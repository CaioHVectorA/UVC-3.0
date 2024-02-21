import { SubHist } from "@/utilities/types";
import { Button } from "../ui/button";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export function ContoContent({ data }: { data: SubHist[] }) {
    return (
        <main className=" w-11/12 bg-[var(--color-background)] mx-auto relative bottom-12 pt-16 pl-4 rounded-md">
            <div className=" flex flex-wrap gap-6">
                {data.map(subhist => (
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
                ))}
            </div>
        </main>
    )
} 