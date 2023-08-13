export default function HandleSearch(search: string, key: any) {
    if (key === "Enter" && !!search) {
        window.location.href = `/buscar/${search}`;
    }
}