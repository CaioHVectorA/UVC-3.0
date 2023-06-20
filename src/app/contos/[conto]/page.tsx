import { URL_READONLY } from "@/utilities/envariables"

export default async function Conto({params}: {params: {conto: string}}) {
    const res = await (await fetch(URL_READONLY+params.conto)).json()
    return <div>
        {params.conto}
        <pre>{JSON.stringify(res,null,2)}</pre>
        </div>
}