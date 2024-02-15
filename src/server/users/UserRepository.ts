import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UserUpType } from './dtos/updateUserDTO';
import { ProtectedUserApiResponse, ServerResponse } from '@/utilities/server-types';
import { Repository } from '../repository'
import { User } from '@prisma/client';
import { comparePassword, hashPassword } from '../jwt';
import { getLoginDTO } from './dtos/GetLoginDTO';
import { saveImage } from '../saveImage';
export class UserRepository extends Repository {
    async getUser(id: string): Promise<ServerResponse<User>> {
        const user = await this.prisma.user.findUnique({where: {id}})
        if (user) {
            return user
        } else {
            return new this.ServerError('Usuário não existe.')
        }
}
    async createUser({ username, password }: CreateUserDTO): Promise<ProtectedUserApiResponse> {
        const cripPass = await hashPassword(password)
        const alreadyExists = await this.prisma.user.findUnique({
            where: {
                username,
            }
        })
        if (alreadyExists) return new this.ServerError('Usuário já existente, tente o login!')
        const { username: _username, id, image_path } = await this.prisma.user.create({ 
            data: { username, password: cripPass },
        });
        return { username: _username, id, image_path }
    }
    async login({ username, password }: getLoginDTO): Promise<ProtectedUserApiResponse> {
        const user = await this.prisma.user.findUnique({ where: { username } })
        if (!user) return new this.ServerError("Usuário inexistente!", 404)
        const wrongPassword = !(await comparePassword(password, user.password))
        if (wrongPassword) return new this.ServerError("Senha incorreta!")
        return { username: user.username, id: user.id, image_path: user.image_path }
    }
    async getUsers() {
        return await this.prisma.user.findMany()
    }
    async updateUser({ id, imagePath, password, username }: UserUpType): Promise<ProtectedUserApiResponse> {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) return new this.ServerError('Usuário não encontrado.')
        // let image_path;
        // if (imagePath) {
        //     const path = `assets/user_images/${id}.png`
        //     image_path = path
        //     await saveImage(imagePath, process.cwd()+'/public/'+path)
        // }
        const newUser = {
            username: username || user.username,
            password: password || user.password,
            image_path: imagePath || user.image_path
        }
        const updatedUser = await this.prisma.user.update({ where: { id }, data: newUser })
        return {
            id,
            username: newUser.username,
            image_path: newUser.image_path
        }
    }
}