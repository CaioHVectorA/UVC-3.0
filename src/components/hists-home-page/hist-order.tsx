"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectSeparator } from "../ui/select"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function HistOrder() {
    const filters = ["A-Z", "Z-A", "Mais novo", "Mais antigo"]
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = (v: string) => {
      const params = new URLSearchParams(searchParams.toString());
        params.set('order', v);
        if (v === 'NONE') params.delete('order')
      replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Select defaultValue={searchParams.get('order') || undefined} onValueChange={handleSearch}>
            <SelectTrigger>
                <SelectValue placeholder="Ordem" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Ordem</SelectLabel>
                    <SelectSeparator  />
                    <SelectItem value="NONE">Nenhum</SelectItem>
                    { filters.map((filter, index) => (
                    <>
                        <SelectSeparator  />
                        <SelectItem value={filter}>{filter}</SelectItem>
                    </>
                    )) }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}