import { UserRepository } from "@/server/users/UserRepository";
import { NextRequest, NextResponse } from "next/server";
const userRepository = new UserRepository()
export async function POST(req: NextRequest) {
    const data = await req.json()
    const response = await userRepository.login(data)
    return NextResponse.json(response)
}