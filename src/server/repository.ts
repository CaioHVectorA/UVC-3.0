import {prisma} from './prisma.client'
import { ServerError } from './ServerError'
export abstract class Repository {
    prisma = prisma
    ServerError = ServerError 
}