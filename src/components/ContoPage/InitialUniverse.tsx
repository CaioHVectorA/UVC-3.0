import '../../styles/components/UniverseContainerForContos.css'
import { Serie_Type, Solo_Type } from "@/utilities/types";
import LikeButton from './LikeButton';

export default function Universe({ data, histID }: {data: Serie_Type | Solo_Type,histID: string}) {
    return (
        <div style={{backgroundImage: `url(https://live.staticflickr.com/65535/52992568323_bfa9108eb6_m.jpg)`}}>
        <div className="UniverseContainer py-10">
            <div className=' flex flex-col'>
        <img className=" rounded-lg w-72 aspect-square" src={data.ImgRef} />
        <LikeButton histID={histID} conto={data.Ref}/>
            </div>
        <div className=' max-lg:px-6 max-lg:w-screen'>
            <h2>{data.Nome}</h2>
            <p className=' w-96 max-lg:w-auto'>{data.Descricao}</p>
            <h5 className='info'>{data.Escrito}</h5>
            {/* <h5 className='info'>{data.Data}</h5>' */}
            <h5 className='info' style={{color: data.Status === 'COMPLETO' ? '#2EEA10' : ''}}>{data.Status}</h5>
            <div className=' flex gap-2 mt-3'>
            {data.Categorias.map(categoria => (
                <p key={categoria} className='tag BGcolorMain'>{categoria}</p>
                ))}
                </div>
        </div>
        </div>
        </div>
    )
}