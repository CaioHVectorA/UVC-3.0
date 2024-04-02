// @ts-nocheck
import { Character, Character_Type, Hist, Serie_Type, Solo_Type, SubHist } from "@/utilities/types";
import { CharCaracter } from "../characters/char";
import { SubhistCard } from "../conto-page/subhist-card";
type AllDataList = (Character & { id: string } | Hist | SubHist)[];
function getFilterData(data: AllDataList,search: string): AllDataList {
    console.log(data, search)
    const filteredData = data.filter(item => {  
        if (item.Apelidos) {
            return item.Apelidos.toUpperCase().includes(search.toUpperCase()) || item.NomeVerdadeiro.toUpperCase().includes(search.toUpperCase()) 
        }
            console.log(item.Nome.toUpperCase(), search.toUpperCase(), item.Nome.toUpperCase().includes(search.toUpperCase()))
           return item.Nome.toUpperCase().includes(search.toUpperCase()) || item.Sinopse.toUpperCase().includes(search.toUpperCase()) || item.Nome.toUpperCase().includes(search.toUpperCase()) 
    })
    return filteredData
}

export default function ContainerForSearch({data, search}: {data: arr,search: string}) {
    return (
        <div className=" pt-8">
            <h4 className=" ml-6">Você buscou por: "{search}"</h4>
            <div className=" flex flex-wrap gap-3 ml-6 mt-6">
                {getFilterData(data,search).map((item,index) => (
                    <div key={index}>{
                        item.Apelidos ? <CharCaracter data={item}/> : <SubhistCard subhist={item}/>
                    }</div>
                    ))}
            </div>
            {getFilterData(data,search).length === 0 && <h5 className=" ml-6">Infelizmente, nada foi encontrado. Tente usar palavras chave melhores ou a inicial do que quer achar.</h5>}
        </div>
    )
}