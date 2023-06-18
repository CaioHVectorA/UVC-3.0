"use client"
import { useState } from 'react'
import { BsChevronDown } from "react-icons/bs"
import { AiOutlinePlus } from 'react-icons/ai'
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

export default function FilterItem({data,setFilter,filter}: {data: dropDownData, setFilter: Function,filter: any}) {
    const [open, setOpen] = useState(data.defaultOpen)
    const [added,setAdded] = useState(false)
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
          console.log(filter)
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
        {data.items.map(dropDownDataItem => (
            <div key={JSON.stringify(dropDownDataItem)} className="dropDownDataItem">
            <h4>{dropDownDataItem.name}</h4>
            <AiOutlinePlus onClick={() => HandleFilter(dropDownDataItem)} size={29}/>
                </div>
        ))}
        </div>
        </div>
    )
}