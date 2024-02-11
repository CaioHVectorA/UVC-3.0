import { Serie_Type, Solo_Type } from "../types";
import { useSearchParams } from 'next/navigation'
export const applyContoFilter = (data: (Serie_Type | Solo_Type)[]) => {
    const params = useSearchParams()
    const [name, agent, finder, mode] = [params.get('name'), params.get('agent') as keyof Serie_Type | keyof Solo_Type, params.get('finder'), params.get('mode')]
    return data.filter((Conto) => {
                if (agent && finder) {
                    if (mode === 'includes') {
                        //@ts-ignore idk why ts throw error in a keyof `Conto`
                        return Conto[agent].includes(finder) || false;
                    } else {
                        //@ts-ignore idk why ts throw error in my use of keyof `Conto` indexing in the object
                        return Conto[agent] === finder;
                    }
                }
                return false;
        })
}