import mongoose from "mongoose"
import { chars, hists } from "./models"
import { Character } from "@/utilities/functions/MockupCharacter"
import { Serie_Type, Solo_Type } from "@/utilities/types"

export const connectedPromise = mongoose.connect(process.env.MONGO_URI as string)
export async function getChars() {
    await connectedPromise
    const data = await chars.find()
    return data as unknown as Character[]
}

export async function getHists() {
    await connectedPromise
    const data = await hists.find()
    return data as unknown as (Serie_Type | Solo_Type)[]
}