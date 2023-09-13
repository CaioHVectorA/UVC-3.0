import ContainerForConto from "@/components/ContoPage/ContainerContoPage"
import Universe from "@/components/ContoPage/InitialUniverse"
import { Serie_Type, Solo_Type } from "@/utilities/Types"
import { URL, URL_READONLY } from "@/utilities/envariables"
import axios from "axios"
// import { Metadata, ResolvedMetadata } from "next"

// type Props = {
//     params: { conto: string };
//   };
  
//   // set dynamic metadata
//   export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     // read route params
//     const id = params.conto;
//     const url = URL_READONLY + id;  
//     const data = await fetch(url).then((res) => res.json());
//     const conto: Serie_Type | Solo_Type = data;
//     console.log(conto);
  
//     return {
//       title: conto.Nome,
//       description: conto.Descricao,
//     };
//   }
export default async function Conto({params}: {params: {conto: string}}) {
    const res = (await axios.get(URL_READONLY+params.conto)).data
    const comments = (await axios.get(URL+'comment/'+params.conto)).data
    const like = await (await fetch(URL + 'hist/' + params.conto, {cache: 'no-store', next: {revalidate: 0}})).json()
    return <ContainerForConto histID={like.id} Ref={params.conto} data={res} datacomments={comments}/>
}