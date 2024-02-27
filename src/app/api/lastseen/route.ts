import { prisma } from "@/server/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json()
    await prisma.user.update({ where: { id }, data: { last_seen: new Date() } })
    return NextResponse.json("Sucess!")
}