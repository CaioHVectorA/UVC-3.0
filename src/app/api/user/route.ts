import { UserRepository } from "@/server/users/UserRepository";
import { NextRequest, NextResponse } from "next/server";
const userRepository = new UserRepository()
export async function POST(req: NextRequest) {
    const body = await req.json()
    const response = await userRepository.createUser(body)
    console.log(response)
    //@ts-ignore
    return NextResponse.json(response, { status: response.status || 200 })
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const response = await userRepository.updateUser(body)
    //@ts-ignore
    return NextResponse.json(response, { status: response.status || 200 })
}

export async function GET() {
    const response = await userRepository.getUsers()
    //@ts-ignore
    return NextResponse.json(response, { status: response.status || 200 }) 
}