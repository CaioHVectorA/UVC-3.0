import { Hist } from "@prisma/client";
import { Repository } from "../repository";
import { CreateHistDTO } from "./dtos/HistDTO";
import { ServerResponse } from "@/utilities/server-types";

export class HistRepository extends Repository {
    async create({ ref }: CreateHistDTO) {
        const hist = await this.prisma.hist.create({ data: { ref, views: 0, last_view: new Date().toISOString(), likesNum: 0 } })
        return hist
    }
    async acess({ ref, prevHist }: { ref: string, prevHist: Hist }): Promise<Hist> {
    const HistUpdate = await this.prisma.hist.update({
      where: {
        ref,
      },
      data: {
        last_view: new Date().toISOString(),
        views: prevHist.views + 1
      },
    });
    return HistUpdate;
  }
  async get({ ref }: { ref: string }) {
      const exists = await this.prisma.hist.findFirst({ where: { ref } })
      if (exists) {
          const response = await this.acess({ ref, prevHist: exists })
          return response
      } 
      const response = await this.create({ ref })
      return response
  }
}