import { describe, expect, test } from '@jest/globals'

import { POST } from '@/app/api/comment/route'
import { DELETE, GET, PUT } from '@/app/api/comment/[ref]/route'
import { createCommentDTO } from '@/server/comment/dtos/comment'
import { prisma } from '@/server/prisma.client'
import { Comment, User } from '@prisma/client'
import { NextRequest } from 'next/server'
import { LOCAL_URL } from './@util'

const comment = { comment_by: '', comment_in: 'SE_RRH', content: 'Meu novo comentário!', img_author: '', username_author: '' } as createCommentDTO 
let commentId: string;

let user: User;

describe('Comment endpoints', () => {
    beforeAll(async () => {
        user = await prisma.user.create({ data: { username: 'T', password: 'T' } })
        comment.img_author = user.image_path
        comment.username_author = user.username
        comment.comment_by = user.id
    })
    test('Deve criar um comentário com sucesso', async () => {
        const request = new NextRequest(LOCAL_URL(), {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        const response = await POST(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const data = await response.json() as Comment
        expect(data).toBeTruthy();
        ['author_img', 'comment_by', 'comment_in', 'content', 'created_at', 'histId', 'id', 'username_author'].forEach(expect(data).toHaveProperty)
        commentId = data.id
    })
    test('Deve selecionar todos os comentários de uma página com sucesso', async () => {
        const response = await GET(new NextRequest(LOCAL_URL(`/api/comment/SE_RRH`)))
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const data = await response.json() as Comment[]
        expect(data).toBeTruthy()
        expect(Array.isArray(data)).toBe(true)
    })
    test('Deve editar o comentário com sucesso', async () => {
        const request = new NextRequest(LOCAL_URL(`/api/comment/${commentId}`), {
            method: 'PUT',
            body: JSON.stringify({ content: 'Meu comentário editado!' })
        })
        const response = await PUT(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const data = await response.json()
        expect(data).toBeTruthy();
        ['author_img', 'comment_by', 'comment_in', 'content', 'created_at', 'histId', 'id', 'username_author'].forEach(expect(data).toHaveProperty)
    })
    test('Deve deletar o comentário com sucesso', async () => {
        const request = new NextRequest(LOCAL_URL(`/api/comment/${commentId}`), {
            method: 'DELETE'
        })
        const response = await DELETE(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const data = await response.json()
        expect(data).toBe(100)
    })
    afterAll(async () => {
        await prisma.user.delete({ where: { id: user.id } })
    })
})