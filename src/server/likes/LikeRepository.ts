import { Like } from "@prisma/client";
import { Repository } from "../repository";
import { LikeDTO } from "./dtos/likeDTO";
import { ServerResponse } from "@/utilities/server-types";

export class LikeRepository extends Repository {
    async toggle({ histId, isLiked, userId }: LikeDTO): Promise<ServerResponse<Like>> {
        if (!isLiked) {
          const Like = await this.prisma.like.create({ data: { userId, histId } });
          if (!Like) {
            console.log("Erro na criação do Like");
            return new this.ServerError("Ocorreu um erro. 1");
          }
          return Like;
        } else {
          const id = (await this.prisma.like.findFirst({  where: { userId, histId } }))?.id
          if (!id) {
            return new this.ServerError("ID não foi provisionado.");
          }
          const LikeFound = await this.prisma.like.delete({
            where: {
              id
            },
          });
          if (!LikeFound) {
            return new this.ServerError("Ocorreu um erro. 2");
          } else {
            return LikeFound;
          }
        }
      }
}