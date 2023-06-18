import { IMGS } from "@/utilities/envariables"
import Link from "next/link"
import '../../styles/components/contosPreview.css'
export default function ContosPreview() {
    const data: {imageSrc: string, link: string}[] = [
        { imageSrc: IMGS.RRH, link: 'SE_RRH' },
        { imageSrc: IMGS.GUARDIOES, link: 'SE_GUA' },
        { imageSrc: IMGS.MR_1, link: 'SE_MR1' },
        { imageSrc: IMGS.KERRY, link: 'S_KER' },
    ]
    return (
        <section>
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