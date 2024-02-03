import { CommentRepository } from "@/server/comment/CommentRepository";
import { NextRequest, NextResponse } from "next/server";
const repo = new CommentRepository()
export async function POST(req: NextRequest) {
    const data = await req.json()
    const response = repo.create(data)
    return NextResponse.json(response)
}