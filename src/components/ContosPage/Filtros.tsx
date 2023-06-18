import { BsChevronDown } from 'react-icons/bs'
import { MOCKUP_dropdownData } from './mockup'
import FilterItem from './FilterItem'
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
    return (
        <div className=' flex gap-4 flex-col'>
            {data.map(dropDownsItem => (
                <FilterItem filter={filter} setFilter={setFilter} key={JSON.stringify(dropDownsItem)} data={dropDownsItem}/>
            ))}
        </div>
)
}

export default function FiltrosContos({setFilter,filter}: {setFilter: Function,filter: any}) {
    return (
        <aside>
            <DropDownSection filter={filter} setFilter={setFilter} data={MOCKUP_dropdownData}/>
        </aside>
    )
}