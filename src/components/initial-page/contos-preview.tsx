import { IMGS } from "@/utilities/envariables"
import Link from "next/link"
import '../../styles/components/contosPreview.css'
export function ContosPreview() {
    const data: {imageSrc: string, link: string}[] = [
        { imageSrc: IMGS.RRH, link: '/contos/SE_RRH' },
        { imageSrc: IMGS.GUARDIOES, link: '/contos/SE_GUA' },
        { imageSrc: IMGS.MR_1, link: '/contos/SE_MR1' },
        { imageSrc: IMGS.KERRY, link: '/contos/S_KER' },
    ]
    return (
        <section className=" p-0">
        <ul className="_mainContainer">
            {data.map(img => (
                <li key={img.link}>
                    <Link href={img.link}>
                        <img style={{width: '100%',aspectRatio: '1'}} src={img.imageSrc} alt={img.link} />
                    </Link>
                </li>
            ))}
        </ul>
        <Link href={'/contos'}>
        <button>Mais Contos</button>
        </Link>
            </section>
    )
}