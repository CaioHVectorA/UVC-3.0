"use client";
import { Hist } from "@/utilities/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

function filterByCategory(filter: string | null) {
    if (!filter) return (item: Hist) => true
    return (item: Hist) => item.Categorias.map(i => i.toUpperCase()).includes(filter.toUpperCase())
}

function filterBySearch(search: string | null) {
    if (!search) return (item: Hist) => true
    return (item: Hist) => !!(item.Nome.toUpperCase().startsWith(search.toUpperCase()) || item.Nome.toUpperCase().startsWith(search.toUpperCase()))
}

function orderItems(order: string | null) {
    console.log(order)
    if (!order) return (i1: Hist, i2: Hist) => 0
    if (order === 'A-Z') return (i1: Hist, i2: Hist) => {
        const nameA = i1.Nome.toLowerCase();
        const nameB = i2.Nome.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
    if (order === 'Z-A') return (i1: Hist, i2: Hist) => {
        const nameA = i1.Nome.toLowerCase();
        const nameB = i2.Nome.toLowerCase();
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        return 0;
    }
    if (order.toUpperCase() === 'Mais novo'.toUpperCase()) return (i1: Hist, i2: Hist) => {
        //@ts-ignore
        return new Date(i2.createdAt) - new Date(i1.createdAt)
    }
    if (order.toUpperCase() === 'Mais antigo'.toUpperCase()) return (i1: Hist, i2: Hist) => {
        //@ts-ignore
        return new Date(i1.createdAt) - new Date(i2.createdAt)
    }
    return (i1: Hist, i2: Hist) => 0
}

export function HistCards({ data }: { data: Hist[] }) {
    const { get: g } = useSearchParams()
    const [filter, order, search] = [g('filter'), g('order'), g('search')]
    const filtered = data
    .filter(filterBySearch(search))
    .filter(filterByCategory(filter))
    .sort(orderItems(order))
    return (
        <>
        {filtered.map(({ Img, Nome, Ref }) => (
            <Link href={`/contos/${Ref}`} className=" w-full hover:scale-105">
                <img src={Img} className=" w-full"/>
                <h3>{Nome}</h3>
            </Link>
        ))}
        </>
    )
}