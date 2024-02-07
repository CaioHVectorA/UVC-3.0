import { URL } from "@/utilities/envariables"
import formatarData from "@/utilities/functions/FormatData"
import SameUser from "@/utilities/functions/sameUser"
import axios from "axios"
import { useState } from "react"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { GrClose } from "react-icons/gr"
type modalProps = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    index: number
} | false

type Comment = {
    content: string;
    comment_by: string;
    comment_in: string;
    username_author: string;
    created_at: string
    id: string,
    author_img: string
}
export function CommentSession( {dataComments,setComments }: {dataComments: Comment[], setComments: Function} ) {
    const [modal,setModal] = useState<modalProps>(false)
    const Modal = ({text,id,index}: {text: string,id: string, index: number}) => {
        const [fetching,setFetching] = useState(false)
        const [content,setContent] = useState(text)
        function HandlePut(id: string, index: number) {
            if (content === text) return setModal(false)
            console.log(index)
            setFetching(true)
            axios.put(URL+'api/comment/'+id,{newContent: content}).then(res => {
            const tempArr = [...dataComments]
            tempArr.splice(index,1,res.data) 
            setComments(tempArr)
            setModal(false)
            setFetching(false)
            }).catch(err => {
                console.log(err)
                setModal(false)
            })
        }
        return (
        <div className="w-screen h-screen fixed top-0 left-0 z-40 bg-black bg-opacity-70 flex items-center justify-center">
            <div className=" bg-slate-100 rounded-2xl px-5 py-3 h-2/5 w-8/12 flex flex-col items-center gap-3 relative">
                <GrClose cursor={'pointer'} onClick={() => setModal(false)} className=" absolute right-5 top-3" size={24} fill="#a8362d" />
                <h4 className=" text-black">Editar comentário</h4>
                <textarea value={content} onChange={({target}) => setContent(target.value)} className=" w-full h-3/5 text-black px-1"></textarea>
                <button disabled={fetching} onClick={() => HandlePut(id,index)}>Enviar</button>
            </div>
        </div>
        )
    }
    function HandleDelete(id: string,index: number) {
        axios.delete(URL+'api/comment/'+id).then(res => {
        const tempArr = [...dataComments]
        tempArr.splice(index,1) 
        setComments(tempArr)
        }).catch(err => console.log(err))
    }

    return (
        <div className=" flex flex-col-reverse gap-5 ml-6"> 
            {dataComments.map(((comment, index) => (
                <div key={index} className=" group/comment px-5 flex gap-3 bg-slate-50 w-4/6 py-5 rounded-2xl relative max-lg:w-11/12">
                    <p className=" absolute right-6 text-zinc-500 top-2 text-xs">{formatarData(comment.created_at)}</p>
                    <div className=" md:w-20 max-md:max-w-[20rem] h-20 bg-black bg-opacity-70 flex overflow-hidden items-center justify-center rounded-full">
                        <img src={URL+comment.author_img} className=" w-12/12 h-12/12 scale-105 object-contain" /> 
                    </div>
                    <div className=" max-md:min-w-[68%]">
                        <h4 className="text-black uppercase">{comment.username_author}</h4>
                        <p className="text-black md:w-[576px]">{comment.content}</p>
                    </div>
                    {SameUser(comment.comment_by) && <div className=" hidden group-hover/comment:flex absolute right-6 top-2 px-6 left-1/2">
                        <AiFillEdit onClick={() => setModal({...comment,index})} cursor={'pointer'} fill="#000" size={32}/>
                        <AiFillDelete onClick={() => HandleDelete(comment.id,index)} cursor={'pointer'} fill="#a8362d" size={32}/>
                    </div>}
                        {modal && <Modal id={modal.id} index={modal.index} text={modal.content} />}
                </div>
            )))}
        </div>
    )
}