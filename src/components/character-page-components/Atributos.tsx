"use client"
import { Atributos, Character_Type } from "@/utilities/types";
import { data } from "autoprefixer";
import { MutableRefObject, Ref, RefObject, useEffect, useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export default function Atributos({atributos}: { atributos: Atributos }) {
    const refDiv = useRef<HTMLDivElement | null>(null)
    const [animation,setAnimation] = useState(false)
    useEffect(() => {
        function handleScroll() {
            if (!refDiv.current) return
            const breakpoint = window.innerWidth > 724 ? 555 : 855
            if (window.scrollY > refDiv.current.offsetTop - breakpoint) {
                setAnimation(true)
            }
        }
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
      }, [refDiv]);
    return (
    <>
    <div ref={refDiv} className="flex md:p-4 mt-6">
        <div className=" h-52 bg-black min-w-[12px] max-md:min-w-[6px] rounded-lg"></div>
        <div className=" h-52 flex justify-around flex-col -z-10">
            <div className={`h-9 group bg-red-800 flex items-center rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * atributos.Forca}px`}}>
                <p className=" absolute left-7 hidden group-hover:block">{atributos.Forca}</p>
                {/* TODO - MAKE THE HOVER FOR ALL STATS, MAKE THE STATS BIGGER */}
            </div>
            <div className={`h-9 bg-yellow-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * atributos.Agilidade}px`}}></div>
            <div className={`h-9 bg-cyan-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * atributos.Inteligencia}px`}}></div>
            <div className={`h-9 bg-green-500 rounded-lg relative ${animation ? 'scaleAnimation' : 'hidden'}`} style={{right: '6px',width: `${36 * atributos.Resistencia}px`}}></div>
        </div>
        <div className=" h-52 bg-black min-w-[12px] max-md:min-w-[6px] rounded-lg"></div>
            <div className=" flex flex-col h-52 justify-around ml-1 md:ml-3">
                <div className=" flex h-9 gap-1 items-center">
                    <h4 className="max-md:text-xs mb-0 h-fit">FORÇA</h4>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button className=" bg-transparent hover:bg-transparent flex items-center justify-center w-fit h-fit p-0">
                                    <AiFillInfoCircle />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                A força é compreendida pela capacidade de um opoente de ser exímio num combate. Seja ele físico, bélico ou o que for.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className=" flex h-9 gap-1 items-center">
                <h4 className="max-md:text-xs mb-0 h-fit">VELO</h4>
                <TooltipProvider>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className=" bg-transparent hover:bg-transparent flex items-center justify-center w-fit h-fit p-0">
                            <AiFillInfoCircle />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className=" text-white">
                    Agilidade é essencial para diferenciar um humano de um poderoso.
                        </p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
                <div className=" flex h-9 gap-1 items-center">
                <h4 className="max-md:text-xs mb-0 h-fit">SABE</h4>
                <TooltipProvider>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className=" bg-transparent hover:bg-transparent flex items-center justify-center w-fit h-fit p-0">
                            <AiFillInfoCircle />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className=" text-white">
                        A sabedoria compreende tanto inteligência quanto a experiência. Importante para traçar planos, tomar decisões e comandar outros sabiamente.
                        </p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
                <div className=" flex h-9 gap-1 items-center">
                <h4 className="max-md:text-xs mb-0 h-fit">RESI</h4>
                <TooltipProvider>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className=" bg-transparent hover:bg-transparent flex items-center justify-center w-fit h-fit p-0">
                            <AiFillInfoCircle />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className=" text-white">
                        A resistência é importante para dar securidade a um poderoso, tornando ele uma linha de frente potente ou alguém que consegue se virar.
                        </p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
            </div>
    </div>
    </>
    )
}