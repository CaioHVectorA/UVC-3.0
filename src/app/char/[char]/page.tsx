export default function PaginaDoCharacter({params,searchParams}: {params: {char: string}, searchParams: any}) {
return <div>CHARACTER: {params.char} SEARCH: {JSON.stringify(searchParams)}</div>
}