import { describe, expect, test } from '@jest/globals'
import { GET as GET_ALL, POST } from '@/app/api/news/route'
import { DELETE, GET, PUT } from '@/app/api/news/[id]/route'
import { NextRequest } from 'next/server'
import { New } from '@/server/News/DTOs/New'
import { LOCAL_URL } from './@util'

const newsData = { image: 'ImagemTeste', title: 'Meu título', body: 'Teste' } as New

let newsId: string;

describe('News endpoints', () => {
    test('Deve enviar todas as notícias', async () => {
        const response = await GET_ALL()
        const data = await response.json()
        expect(data).toBeTruthy()
        expect(Array.isArray(data)).toBe(true)
    })
    test('Deve criar uma notícia com sucesso', async () => {
        const request = new NextRequest(LOCAL_URL(), {
            method: 'POST',
            body: JSON.stringify(newsData)
        })
        const response = await POST(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { image, title, body, id } = await response.json()
        expect(image).toBeTruthy()
        expect(title).toBeTruthy()
        expect(body).toBeTruthy()
        newsId = id
    })
    test('Deve editar uma notícia com sucesso', async () => {
        const request = new NextRequest(new URL(LOCAL_URL('/api/news/'+newsId)), {
            method: 'PUT',
            body: JSON.stringify({ body: "Meu novo corpo" })
        })
        const response = await PUT(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { image, title, body } = await response.json()
        expect(image).toBeTruthy()
        expect(title).toBeTruthy()
        expect(body).toBeTruthy()
    })
    test('Deve receber uma notícia pelo ID com sucesso', async () => {
        const request = new NextRequest(new URL(LOCAL_URL('/api/news/'+newsId)))
        const response = await GET(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { image, title, body } = await response.json()
        expect(image).toBeTruthy()
        expect(title).toBeTruthy()
        expect(body).toBeTruthy()
    })
    test('Deve deletar a notícia com sucesso', async () => {
        const request = new NextRequest(new URL(LOCAL_URL('/api/news/'+newsId)), {
            method: 'DELETE',
        })
        const response = await DELETE(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
    })
})