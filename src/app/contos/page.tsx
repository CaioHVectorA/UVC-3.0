import '../../styles/components/contos.css'
import CardContos from "@/components/contos-page/CardsContos"
import Container from '@/components/contos-page/Containe'
import FiltrosContos from "@/components/contos-page/Filtros"
import { getHists } from '@/server/mongo/actions'
import { URL_READONLY } from "@/utilities/envariables"
import { Metadata } from 'next'
export default async function ContosPage() {
    const data = await getHists()
    return (
        <Container data={data}/> 
    )
}