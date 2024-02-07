import { CommentRepository } from "@/server/comment/CommentRepository";
import { NextRequest, NextResponse } from "next/server";
const repo = new CommentRepository()
export async function GET(req: NextRequest) {
    const response = await repo.get({ ref: req.url.split('/').pop() || '' })
    return NextResponse.json(response)
}

export async function DELETE(req: NextRequest) {
    const response = await repo.delete({ id: req.url.split('/').pop() || '' })
    return NextResponse.json(response)
}

export async function PUT(req: NextRequest) {
    const data = await req.json()
    const response = await repo.edit({ id: req.url.split('/').pop() || '', newContent: data.newContent })
    return NextResponse.json(response)
}