export function HistHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className=" px-12 grid grid-cols-[1fr,4fr,1fr] gap-4">
            { children }
        </div>
    )
}