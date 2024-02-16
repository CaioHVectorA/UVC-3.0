import { describe, expect, test } from '@jest/globals'
import { GET, POST, PUT } from '@/app/api/user/route'
import { GET as GET_ID, DELETE } from '@/app/api/user/[id]/route'
import { POST as LOGIN } from '@/app/api/login/route'
import { NextRequest } from 'next/server'

const user = { username: 'MeuNovoUsuário', password: 'minhasenhalegal' } 

let userId: string;

describe('User routes APIs', () => {
    test('Deve enviar todos os usuários', async () => {
        const response = await GET() as Response
        const data = await response.json()
        expect(response.status).toBe(200)
        expect(data).toBeTruthy()
        expect(Array.isArray(data)).toBe(true)
    })
    test('Deve registrar um usuário com sucesso', async () => {
        const request = new NextRequest(new URL('http://localhost:3000'), {
            method: 'POST',
            body: JSON.stringify(user)
        })
        const response = await POST(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { username, id, image_path } = await response.json()
        expect(username).toBeTruthy()
        expect(id).toBeTruthy()
        expect(image_path).toBeTruthy()
        userId = id
    })
    test('Deve fazer um login com sucesso', async () => {
        const request = new NextRequest(new URL('http://localhost:3000'), {
            method: 'POST',
            body: JSON.stringify(user)
        })
        const response = await LOGIN(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { username, id, image_path } = await response.json()
        expect(username).toBeTruthy()
        expect(id).toBeTruthy()
        expect(image_path).toBeTruthy()
    })
    test(`Deve editar um usuário com sucesso`, async () => {
        const request = new NextRequest(new URL('http://localhost:3000'), {
            method: 'PUT',
            body: JSON.stringify({ id: userId, username: 'MeuNovoNomeDeUsuário!' })
        })
        const response = await PUT(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
        const { username, id, image_path } = await response.json()
        expect(username).toBeTruthy()
        expect(id).toBeTruthy()
        expect(image_path).toBeTruthy()
    })
    test('Deve deletar o usuário com sucesso', async () => {
        const request = new NextRequest(new URL(`http://localhost:3000/api/user/${userId}`), {
            method: 'DELETE',
        })
        const response = await DELETE(request)
        expect(response.status).toBe(200)
        expect(response.ok).toBe(true)
    })
})