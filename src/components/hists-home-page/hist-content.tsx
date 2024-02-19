import React from "react";

export function HistContent({ children }: { children: React.ReactNode }) {
    return (
        <ul className=" grid grid-cols-[repeat(auto-fit,20rem)] max-md:grid-cols-[repeat(auto-fit,16rem)]  gap-12 w-screen justify-center mt-6">
            { children }
        </ul>
    )
}