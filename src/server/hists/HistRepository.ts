import { Hist } from "@prisma/client";
import { Repository } from "../repository";
import { CreateHistDTO } from "./dtos/HistDTO";
import { ServerResponse } from "@/utilities/server-types";

export class HistRepository extends Repository {
    async create({ ref }: CreateHistDTO) {
        const hist = await this.prisma.hist.create({ data: { ref, views: 0, last_view: new Date().toISOString(), likesNum: 0 } })
        return hist
    }
    async acess({ ref, prevHist }: { ref: string, prevHist: Hist }): Promise<ServerResponse<Hist>> {
    const HistUpdate = await this.prisma.hist.update({
      where: {
        ref,
      },
      data: {
        last_view: new Date().toISOString(),
        views: prevHist.views + 1
      },
    });
    if (!HistUpdate) return new this.ServerError("Não foi possível dar update na história!");
    return HistUpdate;
  }
}