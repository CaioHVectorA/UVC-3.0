export function DashboardContainer({ children }: { children: React.ReactNode }) {
    return (
        <main className=" md:grid md:grid-cols-[2fr,10fr] min-h-[340px] max-md:flex-col max-md:items-center mt-8 px-4 w-10/12 mx-auto rounded-2xl py-2 bg-white text-black">
            { children }
        </main>
    )
}