import { closedHeaderMoreLinks, openHeaderMoreLinks } from "@/utilities/moreMenuData"
import Link from "next/link"
import { BsCaretDownFill } from "react-icons/bs"

export default function More({ mode }: { mode: "CLOSED" | "OPEN" }) {
    const actualMode = mode === 'CLOSED' ? closedHeaderMoreLinks : openHeaderMoreLinks
    return (
        <div className=" flex items-center gap-0.5 relative group/menuhover cursor-pointer">
        <Link href={'/'} className=" montserrat cursor-pointer" style={{fontSize: `${actualMode.font}px`}}>MAIS</Link>
        <BsCaretDownFill cursor={'pointer'} size={24}/>
        <div className=" hidden group-hover/menuhover:block absolute top-0 pt-8 z-30">
            <div className=" flex flex-col">
            {actualMode.links.map((item, index) => (
                <Link key={index} href={item.href} className="  w-40 border-b border-b-black border-opacity-20 BGcolorEscuro px-2 text-center transition-all HoverBGcolorClaro">
                    {item.name}
                </Link>
            ))}
            </div>
        </div>
    </div>
    )
}