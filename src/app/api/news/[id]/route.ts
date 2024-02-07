import { New } from "@/server/News/DTOs/New";
import { NewsRepository } from "@/server/News/NewsRepository";
import { NextRequest, NextResponse } from "next/server";
const repo = new NewsRepository()
export async function DELETE(req: NextRequest) {
    const id = req.url.split("/").pop() || ""
    await repo.delete(parseInt(id))
    return NextResponse.json(id)
}
export async function GET(req: NextRequest) {
    const id = parseInt(req.url.split("/").pop() || "")
    const found = await repo.prisma.$queryRaw`SELECT * FROM News WHERE id = ${id}` as New[]
    return NextResponse.json(found[0])
}
export async function PUT(req: NextRequest) {
    const id = parseInt(req.url.split("/").pop() || "")
    const data = await req.json()
    const res = await repo.edit({ id, newProps: data })
    return NextResponse.json(res)
}