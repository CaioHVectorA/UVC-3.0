import { Relacionado } from "@/utilities/types";
import Link from "next/link";

export const ContoRelacionado = ({ relacionados }: { relacionados: Relacionado[] }) => (
    <div className=' w-11/12 mx-auto'>
        <h2 className="!mb-2 mt-4">RELACIONADOS</h2>
        <ul className=" flex gap-3">
        {relacionados.map(i => (
            <Link className=" w-2/12 aspect-square relative group" href={`/contos/${i.Ref}`}>
                    <img src={i.Img} className=" w-full h-full"/>
                    <div className=" absolute top-0 hidden bg-black group-hover:flex bg-opacity-70 w-full h-full justify-center items-center">
                        <h2 style={{color: 'white',fontSize: `${265 / i.Nome.length}px`}} className=" text-center">{i.Nome}</h2>
                    </div>
                </Link>
            ))}
            </ul>
    </div>
    )