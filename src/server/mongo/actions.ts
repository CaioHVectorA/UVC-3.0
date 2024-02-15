"use server"
import mongoose, { FilterQuery } from "mongoose"
import { chars, hists, subHists } from "./models"
import { Character, Serie_Type, Solo_Type } from "@/utilities/types"

const connectedPromise = mongoose.connect(process.env.MONGO_URI as string)
export async function getChars() {
    await connectedPromise
    const data = await chars.find()
    return data as unknown as (Character & { id: string })[]
}

export async function getHists() {
    await connectedPromise
    const data = await hists.find()
    return data
}

export async function getHist(filter: FilterQuery<any>) {
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

export async function createChar(data: any) {
    await connectedPromise
    await chars.create(data)
}

export async function editHist(_id: string, data: any) {
    try {
        await connectedPromise;
        const result = await hists.updateOne({ _id }, data);
        console.log(result);
    } catch (error) {
        console.error("Error updating document:", error);
    }
}
export async function editChar(_id: string, data: any) {
    await connectedPromise
    const result = await chars.updateOne({ _id }, data)
}
export async function editSubHist(_id: string, data: any) {
    await connectedPromise
    const result = await subHists.updateOne({ _id }, data)
}