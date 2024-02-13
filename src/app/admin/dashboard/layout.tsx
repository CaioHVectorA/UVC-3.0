import Link from "next/link";
import { Style } from "./style";
import { cookies } from "next/headers";
import { verifyToken } from "@/server/jwt";

export default function Layout({ children, params }: { children: React.ReactNode, params: { code: string } } ) {
    const cookieStore = cookies()
    if (!verifyToken(cookieStore.get('token')?.value || "")) {
        return <h4>NÃO AUTORIZADO. <Link href={'/admin'} className=" underline text-blue-600">Logar como administrador</Link></h4>
    }
    return (
        <>
            <Style />
            <nav className=" flex justify-around bg-[var(--color-main)] shadow-2xl fixed z-40 top-0 mb-6">
                {["chars", "hists", "subhists"].map((str) => (
                    <>
                        <Link href={`/admin/dashboard/${str}`} className=" uppercase text-2xl">{str}</Link>
                    </>
                ))}
            </nav>
            <main className=" mt-20">
                {children}
            </main>
        </>
    )
}