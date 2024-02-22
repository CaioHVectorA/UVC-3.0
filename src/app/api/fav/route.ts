import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../server/prisma.client";

export async function POST(req: NextRequest) {
    const { histId, userId, isFav } = await req.json() as { userId: string, histId: string, isFav: boolean }
    const exists = await prisma.fav.findFirst({ where: { userId, histId } })
    if (!isFav || !exists) {
        await prisma.fav.create({ data: { histId, userId } })
        return NextResponse.json("Sucess!")
    }
    await prisma.fav.delete({ where: { id: exists.id } })
    return NextResponse.json("Sucess!")
}