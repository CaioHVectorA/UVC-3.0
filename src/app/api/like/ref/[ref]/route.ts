import { prisma } from "@/server/prisma.client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const ref = req.url.split('/').pop()
    const response = await prisma.$queryRaw`SELECT * FROM Like WHERE histId = ${ref}` as unknown[]
    console.log(response)
    return NextResponse.json(response.length)
}

export async function POST(req: NextRequest) {
    const ref = req.url.split('/').pop()
    const { isLiked, userId, id } = await req.json()
    
}