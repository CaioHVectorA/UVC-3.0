"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectSeparator } from "../ui/select"

export function HistFilter() {
    const filters = ["Drama", "Ação", "Sci-fi", "Aventura", "Gestão", "Violência"]
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = (v: string) => {
      const params = new URLSearchParams(searchParams.toString());
        params.set('filter', v);
        if (v === 'NONE') params.delete('filter')
      replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Select defaultValue={searchParams.get('filter') || undefined} onValueChange={handleSearch}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um filtro" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filtro</SelectLabel>
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