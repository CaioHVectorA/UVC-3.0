"use client"
import { ReactComponentElement, ReactElement, useState,useEffect } from "react"
import CardContos from "./card-contos";
import FiltrosContos from "./Filtros";
export default function ContainerContosPage({data}: {data: any}) {
    const [filter, setFilter] = useState(() => {return (Conto: any) => {return Conto}})
    return (
        <main>
            <FiltrosContos filter={filter} setFilter={setFilter} />
            <CardContos Filter={filter} data={data}/>
        </main>
    )
}   