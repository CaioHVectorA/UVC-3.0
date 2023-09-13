import '../../styles/components/contos.css'
import CardContos from "@/components/ContosPage/CardsContos"
import Container from '@/components/ContosPage/Containe'
import FiltrosContos from "@/components/ContosPage/Filtros"
import { URL_READONLY } from "@/utilities/envariables"
import { Metadata } from 'next'
// export async function generateMetadata(): Promise<Metadata> {
//     return {
//       title: "Contos",
//       description: "Explore um mundo de histórias envolventes e emocionantes, disponíveis gratuitamente em nosso site. Da aventura à romance, temos narrativas que vão conquistar seu coração. Cansado de gastar com entretenimento? Encontre a solução aqui. Comece sua jornada literária agora!",
//     };
//   }
export default async function ContosPage() {
    const data = await (await fetch(URL_READONLY)).json()
    return (
        <Container data={data}/> 
    )
}