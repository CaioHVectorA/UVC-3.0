"use server"
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma.client";
import { getSubHists, getSubhistById, getSubhistsByRef } from "./mongo/actions";

export async function handleReadLater({ userId, subHistId }: { userId: string, subHistId: string }): Promise<string> {
    const subhist = await getSubhistById(subHistId)
    if (!subhist) return "História não encontrada."
    const alreadyMarked = await prisma.readLater.findFirst({
        where: {
            userId,
            subhistMongoId: subhist.id
        }
    })
    if (!alreadyMarked) {
        console.log(subhist)
        await prisma.readLater.create({ data: { userId, subhistMongoId: subhist.id ? subhist.id : subhist._id  } })
        return "História marcada com sucesso!"
    }
    return "A história já está marcada! Acesse o seu perfil e retire-a"
}