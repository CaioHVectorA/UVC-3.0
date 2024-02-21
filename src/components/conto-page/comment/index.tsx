'use client'
import { IComment } from '@/utilities/types'
import { Comments } from './comments'
import { CreateComment } from './create-comment'
import { useState } from 'react'


export const CommentSession = ({ data, Ref }: { data: IComment[], Ref: string }) => {
    const [comments, setComments] = useState<IComment[]>(data)
    return (
        <>
            <Comments comments={comments} setComments={setComments} />
            <CreateComment comments={comments} setDataComments={setComments} Ref={Ref}/>
        </>
    )
}