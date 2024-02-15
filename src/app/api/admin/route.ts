import { generateToken } from "@/server/jwt";
import { prisma } from "@/server/prisma.client";
import { NextRequest, NextResponse } from "next/server";
type formInput = {
    acess_code: string,
    username: string,
}
export async function POST(req: NextRequest) {
    const { username, acess_code } = await req.json() as formInput
    if (acess_code !== process.env.ACESS_CODE) return new NextResponse("Código de acesso invalido!", { status: 401 })
    const userFound = await prisma.user.findFirst({ where: { username }})
    if (!userFound) return new NextResponse("Usuário não encontrado", { status: 404 })
    const adminExists = await prisma.admin.findFirst({ where: { userId: userFound.id } })
    let adm = adminExists;
    if (!adminExists) adm = await prisma.admin.create({ data: { userId: userFound.id } })
    if (!adm) return new NextResponse("Server error", { status: 500 })
    const response = new NextResponse("Logado com sucesso!")
    response.cookies.set({
        name: 'token', 
        value: generateToken(adm.id),
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600 * 10,
    })
    return response
}