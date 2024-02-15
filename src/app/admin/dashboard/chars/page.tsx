import { CharCaracter } from "@/components/characters/Char"
import { getChars } from "@/server/mongo/actions"
import { Character } from "@/utilities/types"
import querystring from 'querystring'
import Link from "next/link"

function CharContainer({data}: {data: Character & { id: string }}) {
    console.log(data.id)
    const { Apelidos, Citacoes, Color, Equipe, Imgs, Instances, Keywords, Local, NomeVerdadeiro, id, isHero } = data
    const translated = {
        Apelidos,
        Citacoes: JSON.stringify(Citacoes),
        Color,
        Equipe,
        id,
        Imgs: JSON.stringify(Imgs),
        Instances: JSON.stringify(Instances),
        isHero,
        Keywords,
        Local,
        NomeVerdadeiro
    }
    return (
        <div className=" py-4 px-4 bg-black bg-opacity-5 gap-4 flex flex-col items-center w-fit">
            <CharCaracter data={data}/>
            <Link target="_blank" className=" bg-[var(--color-main)] w-full py-2 rounded-sm text-center uppercase shadow-md" href={`${'/admin/dashboard/chars/edit/'+`${id}?${querystring.stringify(translated)}`}`}>
                Editar
            </Link>
        </div>
    )
}

export default async function Chars() {
    const chars = await getChars()
    return (
        <main className=" flex gap-5">
            {chars.map((data) => <CharContainer data={data} />)}
        </main>
    )
}