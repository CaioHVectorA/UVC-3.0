import { Character } from "@/utilities/types";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export function SectionInitial({data}: {data: Character}) {
    return (
    <div className={`w-screen bg-fixed`} style={{backgroundImage: `url(${data.Imgs}})`}}>
        <div className=" text-white bg-opacity-90 backdrop-blur-sm bg-black w-screen py-5 n flex flex-col items-center px-5">
            <div className=" w-fit my-4">
                <h1 className=" text-start max-md:text-3xl">{data.NomeVerdadeiro}</h1>
                <hr style={{ borderColor: data.Color }} className=" md:w-[113%]"/>
            </div>
            <h3 className=" opacity-80 italic capitalize text-start max-md:text-2xl">Também conhecido como:</h3>
            <h4 className=" text-xl">{data.Apelidos}</h4>
            <Carousel className=" ml-8 mt-12 md:w-6/12 max-md:w-8/12 max-md:mx-auto">
                <CarouselContent>
                    {data.Citacoes.map((citacao, index) => (
                        <CarouselItem key={index} className=" flex flex-col items-center">
                            <h4 className=" max-md:text-center">"{citacao.Frase}"</h4>
                            <p className=" opacity-80 italic">{citacao.Autor || ''}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {data.Citacoes.length > 1 && <CarouselPrevious />}
                {data.Citacoes.length > 1 && <CarouselNext />}
            </Carousel>
        </div>
    </div>
    )
}
