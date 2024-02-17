import { prisma } from "@/server/prisma.client";
const ref = 'S_HAD'
prisma.$queryRaw`SELECT C.content, C.created_at, C.id, U.username as username_author, U.image_path as author_img FROM comments C INNER JOIN users U ON U.id = C.comment_by WHERE C.comment_in = ${ref} LIMIT 100`.then(console.log)