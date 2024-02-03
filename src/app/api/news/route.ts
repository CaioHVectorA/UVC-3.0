import { NewsRepository } from "@/server/News/NewsRepository";
import { NextRequest, NextResponse } from "next/server";
const repo = new NewsRepository()

export async function GET() {
    const response = await repo.get()
    return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const respose = await repo.create(data)
    return NextResponse.json(respose)
}