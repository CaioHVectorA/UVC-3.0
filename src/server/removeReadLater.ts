"use server"

import { prisma } from "./prisma.client"

export async function removeReadLater(subhistMongoId: string) {
    await prisma.readLater.delete({ where: { subhistMongoId } })
    return "História desmarcada com sucesso!"
}