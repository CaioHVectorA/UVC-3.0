import { URL_READONLY } from "@/utilities/envariables"
import { Capitulo,Serie_Type,Character_Type,Solo_Type } from "@/utilities/Types"
export default function CardContos({data,Filter}: {data: (Serie_Type | Solo_Type)[],Filter: any}) {
    // const filteredContos = data.filter((Conto) => {
    //     console.log(Filter)
    //     if (!Filter) {
    //       return true; // Sem filtro, retorna todos os elementos
    //     }
    //     console.log(Filter)
    //     return data.filter(Filter)
    // })
    const filteredData = data.filter(Filter)
    console.log(filteredData)
    return (
        <section>
            {filteredData.map(item => (
                <h4>{item.Nome}</h4>
            ))}
        </section>
    )
}