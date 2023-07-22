export default function fetchData(URL: string) {
    return fetch(URL, { next: { revalidate: 10 } })
        .then(res => res
            .json())
        .then(data => { return data })
        .catch(err => { return err })
}