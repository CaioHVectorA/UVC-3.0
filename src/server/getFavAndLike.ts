"use server"

import { User_Session } from "@/utilities/functions/getUserData"
import { prisma } from "./prisma.client"

export async function getFavAndLike(user: User_Session, histId: string): Promise<[boolean,boolean]> {
    const hasLike = await prisma.like.findFirst({ where: {
        histId,
        userId: user.id,
    } })
    const hasFav = await prisma.fav.findFirst({
        where: {
            histId,
            userId: user.id
        }
    })
    return [!!hasLike, !!hasFav]
}