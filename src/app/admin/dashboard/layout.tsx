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
            <div className=" flex w-full py-4 justify-around bg-[var(--color-main)] shadow-2xl fixed z-40 top-0 mb-6">
                {["hists", "chars", "subhists","hists/create", "chars/create", "subhists/create"].map((str) => (
                    <>
                        <Link href={`/admin/dashboard/${str}`} className=" uppercase text-xl">{str}</Link>
                    </>
                ))}
            </div>
            <main className=" mt-20">
                {children}
            </main>
        </>
    )
}