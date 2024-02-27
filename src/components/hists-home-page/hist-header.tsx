export function HistHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className=" px-12 md:grid md:grid-cols-[1fr,4fr,1fr] gap-4 max-md:space-y-4">
            { children }
        </div>
    )
}