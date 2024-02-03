import { Like } from "@prisma/client";
import { Repository } from "../repository";
import { LikeDTO } from "./dtos/likeDTO";
import { ServerResponse } from "@/utilities/server-types";

export class LikeRepository extends Repository {
    async toggle({ histId, isLiked, userId, id }: LikeDTO): Promise<ServerResponse<Like>> {
        console.log(histId, userId);
        if (!isLiked) {
          //@ts-ignore
          const Like = await this.prisma.like.create({ data: { userId, histId } });
          if (!Like) {
            console.log("Erro na criação do Like");
            return new this.ServerError("Ocorreu um erro. 1");
          }
          return Like;
        } else {
          if (!id) {
            return new this.ServerError("ID não foi provisionado.");
          }
          //@ts-ignore
          const LikeFound = await this.prisma.like.delete({
            where: {
              id,
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