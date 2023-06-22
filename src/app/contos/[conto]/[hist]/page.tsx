export default function Hist({ params }: {params: {conto: string, hist: string}}) {
    return <div>
        <h1>{params.conto}</h1>
        <h1>{params.hist}</h1>
        
        </div>
}