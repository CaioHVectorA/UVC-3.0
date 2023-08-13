import { BsChevronDown } from 'react-icons/bs'
import { MOCKUP_dropdownData } from './mockup'
import FilterItem from './FilterItem'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
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
function DropDownSection({data,setFilter,filter}: {data: dropDownData[],setFilter: Function,filter: any}) {
    const [selectFatherIndex,setFatherIndexSelected] = useState(3321131232)
    return (
        <section className=' flex gap-4 flex-col w-full'>
            {data.map((dropDownsItem, index) => (
                <FilterItem filter={filter} setFilter={setFilter} key={JSON.stringify(dropDownsItem)} fatherIndexSelected={selectFatherIndex} data={dropDownsItem} setFatherIndex={setFatherIndexSelected} fatherIndex={index}/>
            ))}
        </section>
)
}

export default function FiltrosContos({setFilter,filter}: {setFilter: Function,filter: any}) {
    return (
        <div>
            <aside className='notmobile'>
                <DropDownSection filter={filter} setFilter={setFilter} data={MOCKUP_dropdownData}/>
            </aside>
        </div>
    )
}