import { URL_READONLY } from "@/utilities/envariables"
import { Capitulo,Serie_Type,Character_Type,Solo_Type } from "@/utilities/Types"
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
        <section>
            <div className=" flex justify-between">
                    <h4>{filteredData.length} Resultados</h4>
                    {/* sistema de ordenar aqui */}
            </div>
            <ul className="gridCards">
            {filteredData.map(item => (
                <li className=" flex flex-col justify-center">
                    <img className=" w-60 aspect-square rounded-md" src={item.ImgRef}/>
                <h4>{item.Nome}</h4>
                </li>
                ))}
                </ul>
        </section>
    )
}