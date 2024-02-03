import { LikeRepository } from "@/server/likes/LikeRepository";
import { NextRequest, NextResponse } from "next/server";
const repo = new LikeRepository()
export async function POST(req: NextRequest) {
    const data = await req.json()
    const response = await repo.toggle(data)
    return NextResponse.json(response)
}