"use client"
import { Character_Type } from "@/utilities/Types";
import { useEffect, useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

export default function Atributos({data}: {data: Character_Type}) {
    // console.log(window.s)
    const refDiv = useRef(null)
    const [animation,setAnimation] = useState(false)
    useEffect(() => {
        function handleScroll() {
            const breakpoint = window.innerWidth > 724 ? 555 : 855
            // @ts-ignore
            if (window.scrollY > refDiv.current.offsetTop - breakpoint) {
                setAnimation(true)
            }
        }
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
    <>
    <div ref={refDiv} className="notmobileflex p-4">
        <div className=" h-52 BGcolorText w-2 rounded-lg ml-80"></div>
        <div className=" h-52 flex justify-around flex-col -z-10" style={{width: '360px'}}>
            <div className={`h-9 bg-red-800 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * data.Atributos.Forca}px`}}></div>
            <div className={`h-9 bg-yellow-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * data.Atributos.Agilidade}px`}}></div>
            <div className={`h-9 bg-cyan-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * data.Atributos.Inteligencia}px`}}></div>
            <div className={`h-9 bg-green-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * data.Atributos.Resistencia}px`}}></div>
        </div>
        <div className=" h-52 BGcolorText w-1 rounded-lg"></div>
        <div className=" flex flex-col h-52 justify-around ml-3">
            <div className=" flex h-9 gap-1 items-center">
            <h4 className=" h-9">FORÇA</h4>
            <AiFillInfoCircle opacity={0.5} title="A força é compreendida pela capacidade de um opoente de ser exímio num combate. Seja ele físico, bélico ou o que for." />
            </div>
            <div className=" flex h-9 gap-1 items-center">
            <h4 className=" h-9">VELO</h4>
            <AiFillInfoCircle opacity={0.5} title="Agilidade é essencial para diferenciar um humano de um poderoso." />
            </div>
            <div className=" flex h-9 gap-1 items-center">
            <h4 className=" h-9">SABE</h4>
            <AiFillInfoCircle opacity={0.5} title="A sabedoria compreende tanto inteligência qunanto a experiência. Importante para traçar planos, tomar decisões e comandar outros sabiamente." />
            </div>
            <div className=" flex h-9 gap-1 items-center">
            <h4 className=" h-9">RESI</h4>
            <AiFillInfoCircle opacity={0.5} title="A resistência é importante para dar securidade a um poderoso, tornando ele uma linha de frente potente e alguém que consegue se virar." />
            </div>
        </div>
    </div>
    {/* mobile */}
    <div ref={refDiv} className="p-4 mobileflex">
        <div className=" h-40 BGcolorText w-2 rounded-lg ml-4"></div>
        <div className=" h-40 flex justify-around flex-col -z-10" style={{width: '200px'}}>
            <div className={`h-7 bg-red-800 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '4px',width: `${20 * data.Atributos.Forca}px`}}></div>
            <div className={`h-7 bg-yellow-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '4px',width: `${20 * data.Atributos.Agilidade}px`}}></div>
            <div className={`h-7 bg-cyan-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '4px',width: `${20 * data.Atributos.Inteligencia}px`}}></div>
            <div className={`h-7 bg-green-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '4px',width: `${20 * data.Atributos.Resistencia}px`}}></div>
        </div>
        <div className=" h-40 BGcolorText w-1 rounded-lg"></div>
        <div className=" flex flex-col h-40 justify-around ml-3">
            <div className=" flex h-7 gap-1 items-center">
            <h4 className=" h-7">FORÇA</h4>
            <AiFillInfoCircle opacity={0.5} title="A força é compreendida pela capacidade de um opoente de ser exímio num combate. Seja ele físico, bélico ou o que for." />
            </div>
            <div className=" flex h-7 gap-1 items-center">
            <h4 className=" h-7">VELO</h4>
            <AiFillInfoCircle opacity={0.5} title="Agilidade é essencial para diferenciar um humano de um poderoso." />
            </div>
            <div className=" flex h-7 gap-1 items-center">
            <h4 className=" h-7">SABE</h4>
            <AiFillInfoCircle opacity={0.5} title="A sabedoria compreende tanto inteligência qunanto a experiência. Importante para traçar planos, tomar decisões e comandar outros sabiamente." />
            </div>
            <div className=" flex h-7 gap-1 items-center">
            <h4 className=" h-7">RESI</h4>
            <AiFillInfoCircle opacity={0.5} title="A resistência é importante para dar securidade a um poderoso, tornando ele uma linha de frente potente e alguém que consegue se virar." />
            </div>
        </div>
    </div>
    </>
    )
}