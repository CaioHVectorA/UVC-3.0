"use server"
import { Fav, ReadLater, User } from "@prisma/client";
import { prisma } from "./prisma.client";
import { getHist, getHistById, getSubhistById } from "./mongo/actions";
import { Hist, SubHist, UserWithAllData } from "@/utilities/types";
export const getAllUserData: (id: string) => Promise<UserWithAllData | null> = async (_id) => {
    const data = await prisma.user.findUnique({ where: { id: _id } , include: { 
        Favs: true,
        HistRead: true,
        ReadLater: true,
     }})
     if (!data) return null
    //  const { created_at, updated_at, id } = data
     const { Favs, ReadLater, HistRead, created_at, updated_at, id, image_path, username, last_seen } = data
     return { Favs, ReadLater, HistRead, created_at, updated_at, id, image_path, username, last_seen }
} 

async function getSubhistsMarked(ids: string[]) {
    const promises = [] as Promise<SubHist & {id: string}>[]
    ids.forEach(id => promises.push(getSubhistById(id)))
    const subhists = await Promise.all(promises)
    return subhists
}

async function getHistsFavorited(ids: string[]) {
    const promises = [] as Promise<Hist & { id: string }>[]
    ids.forEach(id => promises.push(getHistById(id)))
    const hists = await Promise.all(promises)
    return hists
}

export async function getAllDashboardData(data: UserWithAllData) {
    const histsRead = Number((await prisma.$queryRaw<{ COUNT: BigInt }[]>`SELECT COUNT(*) as COUNT FROM hist_reads WHERE userId = ${data.id}`)[0].COUNT)
    const commentsNumber = Number((await prisma.$queryRaw<{ COUNT: BigInt }[]>`SELECT COUNT(*) as COUNT FROM comments WHERE comment_by = ${data.id}`)[0].COUNT)
    const histsFavorited = await getHistsFavorited(data.Favs.map(i => { return i.histMongoId || "" }))
    const subHistMarked = await getSubhistsMarked(data.ReadLater.map(i => { return i.subhistMongoId }))
    return { histsRead, commentsNumber, histsFavorited, subHistMarked }
}