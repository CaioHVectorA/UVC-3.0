import Link from "next/link";
import { Style } from "./dashboard/style";

export default function Layout({ children, params }: { children: React.ReactNode, params: { code: string } } ) {
    return (
        <>
            <Style />
            <nav className=" flex justify-around bg-[var(--color-main)] shadow-2xl fixed z-40 top-0 mb-6">
                {["chars", "hists", "subhists"].map((str) => (
                    <>
                        <Link href={`/admin/${params.code}/dashboard/${str}`} className=" uppercase text-2xl">{str}</Link>
                    </>
                ))}
            </nav>
            <main className=" mt-20">
                {children}
            </main>
        </>
    )
}