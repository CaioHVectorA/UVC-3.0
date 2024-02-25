import { Character } from "@/utilities/types";
import { CSSProperties, StyleHTMLAttributes } from "react";
import Link from "next/link";
import { AiFillInfoCircle } from "react-icons/ai";
import Atributos from "./Atributos";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { SectionInitial } from "./initial-section";
import { Instances } from './instances'

// function Aparicoes({data}: {data: Character}) {
//     return (
//         <>
//         {/* longscreen */}
//     <div className="notmobile">
//         <h3 className=" text-start ml-4 mt-3">Aparições</h3>
//         <div className=" flex gap-2 ml-4">
//             {data.Aparicoes.map(apa => (
//                 <>
//                 <Link className=" w-3/12 aspect-square relative group" href={`/contos/${apa.Ref}`}>
//                     <img src={apa.Img} className=" w-full h-full"/>
//                     <div className=" absolute top-0 hidden bg-black group-hover:flex bg-opacity-70 w-full h-full justify-center items-center">
//                         <h2 style={{color: 'white',fontSize: `${300 / apa.Nome.length}px`}} className=" text-center">{apa.Nome}</h2>
//                     </div>
//                 </Link>
//                 </>
//             ))}
//         </div>
//     </div>
//     {/* mobile */}
//     <div className="mobile">
//         <h3 className=" mt-1">Aparições</h3>
//         <div className=" flex flex-wrap gap-2 ml-4">
//             {data.Aparicoes.map(apa => (
//                 <>
//                 <Link style={{width: '32%', aspectRatio: '1'}} href={`/contos/${apa.Ref}`}>
//                     <img src={apa.Img} />
//                     <div className=" absolute top-0 bgroundopacity w-full h-full justify-center items-center">
//                         <h2 style={{color: 'white',fontSize: `${300 / apa.Nome.length}px`}} className=" text-center">{apa.Nome}</h2>
//                     </div>
//                 </Link>
//                 </>
                
//             ))}
//         </div>
//     </div>
//             </>
//     )
// }

// function Text({data}: {data: Character}) {
//     return (
//     <>
//         <div className="notmobileflex w-screen flex-col ml-4 pl-80">
//             <h4 className=" mt-4">BIOGRAFIA</h4>
//             <p className=" w-3/5">{data.Biografia}</p>
//             <h4 className=" mt-4">PODERES</h4>
//             <p className=" w-3/5">{data.Poderes}</p>
//             {data.Curiosidades && 
//             <>
//             <h4 className=" mt-4">CURIOSIDADES</h4>
//             <p className=" w-3/5">{data.Curiosidades}</p>
//             </>
//             }
//         </div>
//         {/* mobile */}
//         <div className="mobileflex w-screen flex-col ml-6">
//             <h4 className=" mt-4">BIOGRAFIA</h4>
//             <p className=" w-4/5">{data.Biografia}</p>
//             <h4 className=" mt-4">PODERES</h4>
//             <p className=" w-4/5">{data.Poderes}</p>
//             {data.Curiosidades && 
//             <>
//             <h4 className=" mt-4">CURIOSIDADES</h4>
//             <p className=" w-4/5">{data.Curiosidades}</p>
//             </>
//             }
//         </div>
//     </>
//     )
// }
export const CharacterComponents = { SectionInitial, Instances }
