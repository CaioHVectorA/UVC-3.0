import { URL_READONLY } from "@/utilities/envariables"
import { Capitulo,Serie_Type,Character_Type,Solo_Type } from "@/utilities/Types"
import Link from "next/link"
import { AiFillCaretDown } from "react-icons/ai"
export default function CardContos({data,Filter}: {data: (Serie_Type | Solo_Type | any)[],Filter: any}) {
    // const filteredContos = data.filter((Conto) => {
    //     console.log(Filter)
    //     if (!Filter) {
    //       return true; // Sem filtro, retorna todos os elementos
    //     }
    //     console.log(Filter)
    //     return data.filter(Filter)
    // })
    const filteredData = data.filter(Filter)

    return (
        <section className=" w-full flex flex-col contos">
            <div className=" flex afterDetail relative">
                    <h4>{filteredData.length} Resultados</h4>
                    {/* sistema de ordenar aqui */}
            </div>
            <ul className="gridCards w-full p-0 items-start">
            {filteredData.map(item => (
                <li key={JSON.stringify(item)} className=" flex flex-col justify-center">
                    <Link href={`/contos/${item.Ref}`}>
                    <img className=" w-60 aspect-square rounded-md" src={item.ImgRef}/>
                    </Link>
                <h4>{item.Nome}</h4>
                </li>
                ))}
                </ul>
        </section>
    )
}