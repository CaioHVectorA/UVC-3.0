import { UserRepository } from "@/server/users/UserRepository";
import { NextRequest, NextResponse } from "next/server";

const userRepo = new UserRepository()
export async function GET(req: NextRequest) {
    const id = req.url.split("/").pop() || ""
    const response = await userRepo.getUser(id)
    return NextResponse.json(response)
}