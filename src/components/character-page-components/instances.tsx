import { type Instance } from '@/utilities/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Link from 'next/link'
import Atributos from './Atributos'
export function Instances ({ data }: { data: Instance[] }) {
    return (
        <Tabs defaultValue={data[0].Forma} className=' w-4/12 max-md:w-10/12 mx-auto mt-8'>
            <TabsList className='flex w-full gap-2 flex-wrap h-fit'>
                {data.map(instance => <TabsTrigger className=' bg-zinc-800 flex-1' value={instance.Forma}>{instance.Forma}</TabsTrigger>)}
            </TabsList>
            {data.map(instance => (
                <TabsContent value={instance.Forma}>
                    <h3>{instance.Forma}</h3>
                    <div className=' flex gap-2'>
                    {instance.Aparicoes.map(i => (
                        <Link className=" w-5/12 aspect-square relative group" href={`/contos/${i.Ref}`}>
                                    <img src={i.Img} className=" w-full h-full"/>
                                    <div className=" absolute top-0 hidden bg-black group-hover:flex bg-opacity-70 w-full h-full justify-center items-center">
                                        <h2 style={{color: 'white',fontSize: `${240 / i.Nome.length}px`}} className=" text-center">{i.Nome}</h2>
                                    </div>
                            </Link>
                    ))}
                    </div>
                    <Atributos atributos={instance.Atributos}/>
                    <p className=' text-justify'>{instance.Biografia}</p>
                </TabsContent>
            ))}
        </Tabs>
    )
}