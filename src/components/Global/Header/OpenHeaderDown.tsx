import Link from "next/link";
import More from "./More";

export default function OpenHeaderDown({ scroll }: {scroll: boolean}) {
    return (
        <div className={`${scroll ? 'HeaderDownAnimationClose' : 'HeaderDownAnimationOpen'}`}>
            <hr />
            <nav>
                <Link href={'/contos'}>CONTOS</Link>
                <Link href={'/char'}>PERSONAGENS</Link>
                <Link href={'/novidades'}>NOVIDADES</Link>
                <Link href={'/'}>SAIBA MAIS</Link>
                <More mode="OPEN"/>
            </nav>
        </div>
    )
}