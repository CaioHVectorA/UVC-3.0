"use server"
import { writeFile } from 'fs/promises'
import { randomUUID } from 'node:crypto'
export async function saveFile(data: string, extension: string, path: string) {
    const uuid = randomUUID()
    const _path = `${path}/${uuid}.${extension}`
    await writeFile(`${process.cwd()}${_path}`, data)
    return _path
}