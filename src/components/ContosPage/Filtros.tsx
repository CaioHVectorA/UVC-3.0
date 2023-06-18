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
        <section className=' flex gap-4 flex-col'>
            {data.map((dropDownsItem, index) => (
                <FilterItem filter={filter} setFilter={setFilter} key={JSON.stringify(dropDownsItem)} fatherIndexSelected={selectFatherIndex} data={dropDownsItem} setFatherIndex={setFatherIndexSelected} fatherIndex={index}/>
            ))}
        </section>
)
}
function DropDownSectionMobile({data,setFilter,filter}: {data: dropDownData[],setFilter: Function,filter: any}) {
    const [selectFatherIndex,setFatherIndexSelected] = useState(3321131232)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        window.scrollTo({top: 0,behavior: 'smooth'})
        document.body.style.overflowY = open ? 'hidden' : 'visible'
    },[open])
    return (
        <>
        {!open ? 
        <div className=' fixed h-screen w-screen left-0 flex items-center z-20'>
            <div onClick={() => setOpen(!open)} className='opener'>
                <AiOutlineRight size={32}/>
            </div>
        </div>
         :
        <section className=' flex gap-4 flex-col h-screen w-screen bg-zinc-900 px-5 fixed top-20 left-0 opacity-80 z-50'>
            <div onClick={() => setOpen(!open)} className='closer'>
                <GrClose size={24}/>
            </div>
            <h4>Encontre os contos que agradam o seu costo!</h4>
            {data.map((dropDownsItem, index) => (
                <FilterItem filter={filter} setFilter={setFilter} key={JSON.stringify(dropDownsItem)} fatherIndexSelected={selectFatherIndex} data={dropDownsItem} setFatherIndex={setFatherIndexSelected} fatherIndex={index}/>
                ))}
        </section>
        }
                </>
)
}

export default function FiltrosContos({setFilter,filter}: {setFilter: Function,filter: any}) {
    return (
        <>
        <aside className='notmobile'>
            <DropDownSection filter={filter} setFilter={setFilter} data={MOCKUP_dropdownData}/>
        </aside>
        <aside className='mobile'>
        <DropDownSectionMobile filter={filter} setFilter={setFilter} data={MOCKUP_dropdownData}/> 
        </aside>
        </>
    )
}