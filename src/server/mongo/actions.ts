"use server"
import mongoose, { FilterQuery } from "mongoose"
import { chars, hists, subHists } from "./models"
import { Character } from "@/utilities/functions/MockupCharacter"
import { Serie_Type, Solo_Type } from "@/utilities/types"

const connectedPromise = mongoose.connect(process.env.MONGO_URI as string)
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

export async function getHist(filter: FilterQuery<any>): Promise<Solo_Type | Serie_Type> {
    await connectedPromise
    const data = await hists.findOne(filter)
    return data
}

export async function getSubHists() {
    await connectedPromise
    const data = await subHists.find()
    return data // todo - add type
}

export async function createSubHist(data: any) {
    await connectedPromise
    await subHists.create(data)
}

export async function createHist(data: any) {
    await connectedPromise
    await hists.create(data)
}