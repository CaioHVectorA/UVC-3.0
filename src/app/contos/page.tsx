import '../../styles/components/contos.css'
import CardContos from "@/components/ContosPage/CardsContos"
import Container from '@/components/ContosPage/Containe'
import FiltrosContos from "@/components/ContosPage/Filtros"
import { URL_READONLY } from "@/utilities/envariables"

export default async function ContosPage() {
    const data = await (await fetch(URL_READONLY)).json()
    return (
        <Container data={data}/> 
    )
}