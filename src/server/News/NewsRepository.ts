import { NextRequest } from "next/server";
import { Repository } from "../repository";
import { New } from './DTOs/New'
export class NewsRepository extends Repository {
    async create({ image, title, body, external_link }: New) {
        if (external_link) {
            const _new = await this.prisma.news.create({
                data: {
                    image,
                    title,
                    external_link,
                }
            })
            return _new
        }
        const _new = await this.prisma.news.create({
            data: {
                image, title, body,
            }
        })
        return _new
    }
    async get() {
        return await this.prisma.news.findMany()
    }
    async edit({ id, newProps }: { id: number, newProps: Partial<New>}) {
        const updatedData = {} as { [key: string]: string }
        const [k, v] = [Object.keys(newProps), Object.values(newProps)]
        v.forEach((_v, i) => updatedData[k[i]] = _v)
        const _new = await this.prisma.news.update({
            where: {
                id
            },
            data: updatedData
        })
        return _new
    }
    async delete(id: number) {
        await this.prisma.news.delete({ where: { id } })
    }
}