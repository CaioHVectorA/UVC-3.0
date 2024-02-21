"use client"
import { AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger,  } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { URL } from "@/utilities/envariables";
import formatarData from "@/utilities/functions/FormatData";
import getUserData from "@/utilities/functions/getUserData";
import SameUser from "@/utilities/functions/sameUser";
import axios from "axios";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type IComment = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    author_img: string
}

function Comment({ author_img, comment_by, comment_in, content, created_at, id, username_author, comments, setComments, index }: IComment & { comments: IComment[], setComments: (comment: IComment[]) => void, index: number }) {
    const { toast } = useToast()
    return (
    <div key={id} className=" group/comment px-5 flex gap-3 bg-slate-50 w-4/6 py-5 rounded-2xl relative max-lg:w-11/12">
        <p className=" absolute right-6 text-zinc-500 top-2 text-xs">{formatarData(created_at)}</p>
        <div className=" md:w-20 max-md:max-w-[20rem] h-20 bg-black bg-opacity-70 flex overflow-hidden items-center justify-center rounded-full">
            <img src={URL+author_img} className=" w-12/12 h-12/12 scale-105 object-contain" /> 
        </div>
        <div className=" max-md:min-w-[68%]">
            <h4 className="text-black uppercase">{username_author}</h4>
            <p className="text-black md:w-[576px]">{content}</p>
        </div>
        {SameUser(comment_by) && <div className=" hidden group-hover/comment:flex absolute right-6 top-2 px-6 left-1/2">
            <AiFillDelete onClick={() => {
                toast({ title: 'Deletando seu comentário...' })
                axios.delete('/api/comment/'+id).then(res => {
                    toast({ title: 'Deletado com sucesso!' })
                    const tempArr = [...comments]
                    tempArr.splice(index,1) 
                    setComments(tempArr)
                    }).catch(err => console.log(err))
            }} cursor={'pointer'} fill="#a8362d" size={32}/>
        </div>}
    </div>
    )
}
export function Comments({ comments, setComments }: { comments: IComment[], setComments: (comment: IComment[]) => void }) {
    return (
        <>
        <div className=" flex flex-col gap-5 w-11/12 mx-auto">
        <h2 className=" my-6">Comentários</h2>
            {comments.reverse().map((comment, index) => (
                <Comment {...comment} comments={comments} setComments={setComments} index={index} />
                ))}
        </div>
        </>
    )
}