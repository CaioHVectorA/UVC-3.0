"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";

export function HistSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = (term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
  
      replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Input type="search" onChange={({ target }) => handleSearch(target.value)} className=" text-black bg-white"/>
    )
}