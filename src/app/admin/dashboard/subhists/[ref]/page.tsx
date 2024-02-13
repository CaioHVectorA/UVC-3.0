export default function Page({ params }: { params: { ref: string } }) {
    return (
        <>
        { params.ref }
        </>
    )
}