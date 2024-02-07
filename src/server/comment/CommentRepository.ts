import { Repository } from "../repository";
import { createCommentDTO } from "./dtos/comment";
import { EditCommentDTO } from "./dtos/editcomment";

export class CommentRepository extends Repository {
    async create({ img_author, comment_by, comment_in, content, username_author }: createCommentDTO) {
        if (!content || !comment_by || !comment_in || !username_author ) return new this.ServerError('Sem todas as credenciais')
        const comment = await this.prisma.comment.create({
          data: { content, comment_by, comment_in, username_author, author_img: img_author },
        });
        console.log(comment)
        if (!comment) return new this.ServerError("Ocorreu um erro.")
        return comment;
    }
    async delete({ id }: { id: string }) {
        const comment = await this.prisma.comment.delete({ where: { id } })
        if (!comment) return new this.ServerError("Algo deu errado")
        return 100
    }
    async edit({ id, newContent }: EditCommentDTO) {
        console.log({ newContent })
        const editedComment = await this.prisma.comment.update({
            where: { id },
            data: { content: newContent },
        });
        if (!editedComment) return new this.ServerError("Comentário não existe.");
        return editedComment;
    }
    async get({ ref }: { ref: string }) {
        if (!ref) return new this.ServerError("Sem referência!")
        const comment_in = ref
        const comments = await this.prisma.comment.findMany({ where: { comment_in } })
        return comments
    }

}