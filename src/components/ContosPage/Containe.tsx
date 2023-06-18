"use client"
import { ReactComponentElement, ReactElement, useState,useEffect } from "react"
import CardContos from "./CardsContos";
import FiltrosContos from "./Filtros";
export default function Container({data}: {data: any}) {
    const [filter, setFilter] = useState(() => {return (Conto: any) => {return Conto}})
    useEffect(() => console.log(filter),[filter])
    return (
        <main>
        <FiltrosContos filter={filter} setFilter={setFilter} />
        <CardContos Filter={filter} data={data}/>
        </main>
    )
}