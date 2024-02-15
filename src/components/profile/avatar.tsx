export function Avatar({ data }: { data: { file: string, name: string } }) {
    return (
        <div className=" flex flex-col gap-1 items-center">
            <img src={`/assets/user_images/${data.file}`} className=" w-16 aspect-square rounded-full"/>
            <small>{data.name}</small>
        </div>
    )
}