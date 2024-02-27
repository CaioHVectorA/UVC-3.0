"use client"

import { getAllDashboardData } from "@/server/getAllUserData";
import { Hist, SubHist, UserWithAllData } from "@/utilities/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { formatDataForUi } from "@/utilities/functions/formatDataForUi";
import formatarData from "@/utilities/functions/FormatData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { removeReadLater } from "@/server/removeReadLater";
type DashboardData = {
    histsRead: number;
    commentsNumber: number;
    histsFavorited: (Hist & {
        id: string;
    })[];
    subHistMarked: (SubHist & {
        id: string;
    })[];
}
export function DataRender({ userData }: { userData: UserWithAllData }) {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    useEffect(() => {
        getAllDashboardData(userData).then(setDashboardData)
    }, [])
    if (!dashboardData) return (
        <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
    return (
        <main className=" text-black">
            <div className=" min-h-[14rem] flex max-md:flex-col justify-between items-center md:gap-4">
                {[["Histórias lidas", dashboardData.histsRead.toString()], ["Visto por último em", formatarData(userData.last_seen.toISOString())], ["Comentários",dashboardData.commentsNumber.toString()]].map((i) => (
                    <div className=" flex flex-col items-center">
                        <p className=" text-black opacity-75">{i[0]}</p>
                        <h3 className=" text-black max-md:text-xl">{i[1]}</h3>
                    </div>
                ))}
            </div>
                <Tabs defaultValue="fav">
                    <TabsList className=" w-full">
                        <TabsTrigger value="fav">Favoritos</TabsTrigger>
                        <TabsTrigger value="later">Ler mais tarde</TabsTrigger>
                    </TabsList>
                    <TabsContent value="fav">
                        <div className=" flex gap-2 flex-wrap max-md:flex-col">{dashboardData.histsFavorited.map(i => (
                            <div key={i.Img} className=" flex flex-col items-center md:w-4/12 group relative">
                                <div className=" hidden group-hover:flex absolute w-full h-full px-8 items-center gap-4 justify-center flex-col bg-black bg-opacity-60 text-white">
                                    <p className=" text-white uppercase text-2xl">{i.Nome}</p>
                                    <Button className=" w-full">
                                        <Link href={`/contos/${i.Ref}`}>Acessar</Link>
                                    </Button>
                                </div>
                                <img src={i.Img} />
                            </div>
                        ))}</div>
                    </TabsContent>
                    <TabsContent value="later">
                        <div className=" flex gap-2 flex-wrap max-md:flex-col">{dashboardData.subHistMarked.map(i => (
                            <div key={i.Img} className=" flex flex-col items-center md:w-4/12 group relative">
                            <div className=" hidden group-hover:flex absolute w-full h-full px-5 md:px-8 items-center gap-4 justify-center flex-col bg-black bg-opacity-60 text-white">
                                <p className=" text-white uppercase text-2xl">{i.Nome}</p>
                                <Button className=" w-full">
                                    <Link href={`/read/${i._id}`}>Acessar</Link>
                                </Button>
                                <Button onClick={() => removeReadLater(i._id).then(() => {
                                    const temp = {...dashboardData}
                                    console.log(i._id, temp.subHistMarked)
                                    temp.subHistMarked.splice(temp.subHistMarked.findIndex(s => s._id == i._id),1)
                                    console.log(temp)
                                    setDashboardData(temp) 
                                })} className=" w-full" variant={'destructive'}>Remover dos marcados</Button>
                            </div>
                            <img src={i.Img} />
                        </div>
                        ))}</div>
                    </TabsContent>
                </Tabs>
        </main>
    )
}