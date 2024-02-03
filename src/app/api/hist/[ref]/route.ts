import { HistRepository } from "@/server/hists/HistRepository";
import { NextRequest, NextResponse } from "next/server";

const repo = new HistRepository()
export async function GET(req: NextRequest) {
    const ref = req.url.split('/').pop() || ""
    const exists = await repo.prisma.hist.findFirst({ where: { ref } })
    if (exists) {
        const response = await repo.acess({ ref, prevHist: exists })
        //@ts-ignore
        return NextResponse.json(response, { status: response.status || 200 })
    } 
    const response = await repo.create({ ref })
    //@ts-ignore
    return NextResponse.json(response, { status: response.status || 200 })
}