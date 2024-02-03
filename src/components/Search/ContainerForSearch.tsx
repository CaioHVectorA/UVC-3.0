// @ts-nocheck
import { Character_Type, Serie_Type, Solo_Type } from "@/utilities/types";
import { Character } from "@/utilities/functions/MockupCharacter";
import { CharCaracter } from "../Characters/Char";
import { Relacionado } from "../ContoPage/ContainerContoPage";
type arr = (Character_Type | Solo_Type | Serie_Type)[];

function getKeywordsFilter(data: arr, search: string): arr {
    const filteredData = data.filter(item => {
        return item.Keywords.some(keyWord => keyWord.toUpperCase() === search.toUpperCase() || keyWord.toUpperCase().startsWith(search.toUpperCase()) || keyWord.toUpperCase().includes(search.toUpperCase()))
    })
    const uniqueItems = new Set(getFilterData(data,search))
    return filteredData.filter(item => !uniqueItems.has(item))
}

function getFilterData(data: arr,search: string): arr {
    console.log(data, search)
    const filteredData = data.filter(item => {  
        let isCharacter = false;
        if (item.Apelido) { isCharacter = true }
        if (isCharacter) {
            return item.Apelido.toUpperCase().startsWith(search.toUpperCase()) || item.Nome.toUpperCase().startsWith(search.toUpperCase()) 
        } else {
           return item.Nome.toUpperCase().startsWith(search.toUpperCase()) || item.SubNome && item.SubNome.toUpperCase().startsWith(search.toUpperCase()) || item.Nome.toUpperCase().includes(search.toUpperCase()) || item.SubNome && item.SubNome.toUpperCase().includes(search.toUpperCase()) 
        }
    })
    return filteredData
}

export default function ContainerForSearch({data, search}: {data: arr,search: string}) {
    return (
        <div className=" pt-8">
            <h4 className=" ml-6">Você buscou por: "{search}"</h4>
            <div className=" flex flex-wrap gap-3 ml-6">
                {getFilterData(data,search).map((item,index) => (
                    <div key={index}>{
                        item.Apelido ? 
                        <>
                                <CharCaracter data={item}/>
                            </>
                                    :
                                    <>
                                <Relacionado rel={{Img: item.ImgRef, Ref: item.Ref, Nome: item.Nome}}/>
                            </>
                    }</div>
                    ))}
            </div>
            {getFilterData(data,search).length === 0 && <h5 className=" ml-6">Infelizmente, nada foi encontrado. Tente usar palavras chave melhores ou a inicial do que quer achar.</h5>}
            <div className=" w-12/12 px-6 rounded-full mx-auto opacity-10 h-0.5 BGcolorText my-8"></div>
            <h4 className=" mt-8 ml-6">Pode estar relacionado com "{search}"</h4>
            <div className=" flex flex-wrap gap-3 ml-6">
            {getKeywordsFilter(data,search).map((item,index) => (
                <div key={index}>{
                    item.Apelido ? 
                    <>
                                <CharCaracter data={item}/>
                            </>
                                    :
                                    <>
                                <Relacionado rel={{Img: item.ImgRef, Ref: item.Ref, Nome: item.Nome}}/>
                            </>
                    }</div>
                    ))}
                </div>
        </div>
    )
}