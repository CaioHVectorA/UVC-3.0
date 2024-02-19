// import '../../styles/components/contos.css'
import { Hist } from '@/components/hists-home-page/'
import { getHists } from '@/server/mongo/actions'
export default async function ContosPage() {
    const data = await getHists()
    // return <pre>{JSON.stringify(data, null, 2)}</pre>
    return (
        <Hist.Container>
            <Hist.Header>
                <Hist.Filter />
                <Hist.Search />
                <Hist.Order />
            </Hist.Header>
            <Hist.Content>
            <Hist.Cards data={JSON.parse(JSON.stringify(data))} />
            </Hist.Content> 
        </Hist.Container>
    )
}