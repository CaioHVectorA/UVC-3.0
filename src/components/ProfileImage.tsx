import Link from "next/link";
import { ClassAttributes } from "react";

export default function ProfileImage({ imageLink }: { imageLink: string }) {
    return (
        <Link href={"/profile"} className=" flex justify-center overflow-hidden items-center bg-black bg-opacity-70 rounded-full w-16 h-16 p-0 ">
            <img src={imageLink} className=" object-cover w-16 scale-105 h-16 max-h-16" />
        </Link>
    )
}