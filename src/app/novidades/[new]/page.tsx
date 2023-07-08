import { URL } from "@/utilities/envariables"
import axios from "axios"


export default async function Page({params}: {params: { new: string }}) {
    const res = await (await axios.get(URL+'news/one',{data: {
        id: parseInt(params.new)
    }})).data

    return (
        <pre>
            {JSON.stringify(res,null,2)}
        </pre>
    )
}