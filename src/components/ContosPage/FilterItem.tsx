"use client"
import { useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
type dropDownDataItem = { 
    name: string, // Series
    effect: {
        agent: string,
        finder: string,
        mode: string, // 'includes' or 'equal'
    } 
    // if equal -> Contos.filter(Conto => Conto[agent] === finder)
    // if includes -> Contos.filter(Conto => Conto[agent].includes(finder))
}


type dropDownData = {
    title: string,
    defaultOpen: boolean,
    items: dropDownDataItem[]
}

export default function FilterItem({data,setFilter,filter,fatherIndex,setFatherIndex,fatherIndexSelected}: {data: dropDownData, setFilter: Function,filter: any,fatherIndex: number, setFatherIndex: Function,fatherIndexSelected: number}) {
    const [open, setOpen] = useState(data.defaultOpen)
    const [indexSelected, setIndex] = useState(13198310931)
    function HandleFilter(data: dropDownDataItem) {
        setFilter(() => {
            return (
            (Conto: any) => {
                if (data.effect.agent && data.effect.finder) {
                    if (data.effect.mode === 'includes') {
                        return Conto[data.effect.agent].includes(data.effect.finder) || false;
                    } else {
                        return Conto[data.effect.agent] === data.effect.finder;
                    }
                }
                return false;
            })
          });
    }
    function HandleRemoveFilter() {
        setFilter(() => {
            return (
                (Conto: any) => {
                    return true
                } 
            )
        })
    }
    return (
        <div>
        <div className="title">
            <div className=" flex items-center gap-2">
        <div className="detail BGcolorMain"></div>
        <h4>{data.title}</h4>
            </div>
        <BsChevronDown style={{transition: '250ms',transform: !open ? 'rotate(-90deg)' : ''}} onClick={() => setOpen(!open)} size={29}/>
        </div>
        <div className={`${open ? 'DropDownOpen' : 'DropDownClosed'}`}>
        {data.items.map((dropDownDataItem, index) => (
            <div key={JSON.stringify(dropDownDataItem)} className="dropDownDataItem">
            <h4>{dropDownDataItem.name}</h4>
            {indexSelected === index && fatherIndex === fatherIndexSelected ?
            <AiOutlineMinus onClick={() => {setFatherIndex(fatherIndex) ; setIndex(31293712837198312) ; HandleRemoveFilter()}} size={29}/>            
            :
            <AiOutlinePlus onClick={() => {setFatherIndex(fatherIndex) ; setIndex(index) ; HandleFilter(dropDownDataItem)}} size={29}/>
            }
                </div>
        ))}
        </div>
        </div>
    )
}