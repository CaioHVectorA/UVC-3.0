import { getChars } from "@/server/mongo/actions"

export default async function Chars() {
    const chars = await getChars()
    return (
        <pre>{ JSON.stringify(chars, null , 2) }</pre>
    )
}