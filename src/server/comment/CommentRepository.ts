import { Comment } from "@prisma/client";
import { Repository } from "../repository";
import { createCommentDTO } from "./dtos/comment";
import { EditCommentDTO } from "./dtos/editcomment";
import { ServerError } from "../ServerError";
import { ServerResponse } from "@/utilities/server-types";

export class CommentRepository extends Repository {
    async create({ comment_by, comment_in, content }: createCommentDTO): Promise<ServerResponse<Comment>> {
        if (!content || !comment_by || !comment_in) return new this.ServerError('Sem todas as credenciais')
        const comment = await this.prisma.comment.create({
          data: { content, comment_by, comment_in },
        });
        return comment;
    }
    async delete({ id }: { id: string }): Promise<ServerResponse<number>> {
        const comment = await this.prisma.comment.delete({ where: { id } })
        if (!comment) return new this.ServerError("Algo deu errado")
        return 100
    }
    async edit({ id, newContent }: EditCommentDTO): Promise<ServerResponse<Comment>> {
        console.log({ newContent })
        const editedComment = await this.prisma.comment.update({
            where: { id },
            data: { content: newContent },
        });
        if (!editedComment) return new this.ServerError("Comentário não existe.");
        return editedComment;
    }
    async get({ ref }: { ref: string }): Promise<ServerResponse<Comment[]>> {
        if (!ref) return new this.ServerError("Sem referência!")
        const comments = await this.prisma.$queryRaw`SELECT C.content, C.created_at, C.id, U.username as username_author, U.image_path as author_img FROM comments C INNER JOIN users U ON U.id = C.comment_by WHERE C.comment_in = ${ref}` as Comment[]
        return comments
    }

}