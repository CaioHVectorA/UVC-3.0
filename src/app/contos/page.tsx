import '../../styles/components/contos.css'
import Container from '@/components/contos-page/contos-page-container'
import { getHists } from '@/server/mongo/actions'
export default async function ContosPage() {
    const data = await getHists()
    return (
        <Container data={data}/> 
    )
}