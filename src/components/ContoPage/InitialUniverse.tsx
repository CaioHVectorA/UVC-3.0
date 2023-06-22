import '../../styles/components/UniverseContainerForContos.css'
import { Serie_Type, Solo_Type } from "@/utilities/Types";

export default function Universe({ data }: {data: Serie_Type | Solo_Type}) {
    return (
        <div style={{backgroundImage: `url(https://live.staticflickr.com/65535/52992568323_bfa9108eb6_m.jpg)`}}>
        <div className="UniverseContainer py-10">
        <img className=" rounded-lg w-80 aspect-square" src={data.ImgRef} />
        <div>
            <h2>{data.Nome}</h2>
            <p className=' w-96'>{data.Descricao}</p>
            <h5 className='info'>{data.Escrito}</h5>
            <h5 className='info'>{data.Data}</h5>
            <h5 className='info' style={{color: data.Status === 'COMPLETO' ? '#2EEA10' : ''}}>{data.Status}</h5>
            <div className=' flex gap-2 mt-3'>
            {data.Categorias.map(categoria => (
                <p className='tag BGcolorMain'>{categoria}</p>
                ))}
                </div>
        </div>
        </div>
        </div>
    )
}