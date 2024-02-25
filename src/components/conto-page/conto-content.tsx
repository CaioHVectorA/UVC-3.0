import { SubHist } from "@/utilities/types";
import { Button } from "../ui/button";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SubhistCard } from "./subhist-card";

export function ContoContent({ data }: { data: SubHist[] }) {
    return (
        <main className=" w-11/12 bg-[var(--color-background)] mx-auto relative bottom-12 pt-16 pl-4 rounded-md">
            <div className=" flex flex-wrap gap-6">
                {data.map(subhist => <SubhistCard subhist={subhist}/>)}
            </div>
        </main>
    )
} 