"use client"
import { useState,useEffect } from 'react'
import { Citacao } from '@/utilities/types'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
export default function Citacoes({citacoes}: {citacoes: Citacao[]}) {
    const [indexS, setIndex] = useState(0)
    useEffect(() => {
        if (indexS < 0) {
            setIndex(0)
        } else if (indexS > citacoes.length) {
            setIndex(0)
        }
    }, [indexS])
    return (
        <>
            <div className='notmobile overflow-hidden flex flex-nowrap w-screen items-center'>
                    <div style={{padding: '0px 26vw'}} className='flex justify-between flex-shrink-0 w-full gap-6'>
                        {citacoes.length > 1 && <AiFillLeftCircle cursor={'pointer'} onClick={() => {
                            if (indexS === 0) {
                                setIndex(citacoes.length - 1)
                            } else {
                                setIndex(indexS - 1)
                            }
                        }} size={60} />}
                        <div className=' flex flex-col items-center'>
                        <div className={`flex flex-col gap-1`}>
                    <p className=' opacity-95 w-96'>"{citacoes[indexS].Frase}"</p>
                    {citacoes[indexS].Autor && <small className=' opacity-75 italic self-end'>{citacoes[indexS].Autor}</small>}
                    {!citacoes[indexS].Autor && <small className=' opacity-75 italic self-end'>ㅤ</small>}
                        </div>
                        </div>
                        {citacoes.length > 1 && <AiFillRightCircle cursor={'pointer'} onClick={() => {
                            if (indexS === citacoes.length - 1) {
                                setIndex(0)
                            } else {
                                setIndex(indexS + 1)
                            }
                            }} size={60} />}
                    </div>
            </div>            
            <div className='mobile overflow-hidden flex flex-nowrap w-screen'>
                    <div style={{padding: '0px 12px'}} className='flex justify-between flex-shrink-0 w-full'>
                        {citacoes.length > 1 && <AiFillLeftCircle cursor={'pointer'} onClick={() => {
                            if (indexS === 0) {
                                setIndex(citacoes.length - 1)
                            } else {
                                setIndex(indexS - 1)
                            }
                        }} size={60} />}
                        <div className=' flex flex-col items-center'>
                        <div className={`flex flex-col gap-1`}>
                    <p className=' opacity-95 w-8/12 self-center text-center'>"{citacoes[indexS].Frase}"</p>
                    {citacoes[indexS].Autor && <small className=' opacity-75 italic self-end'>{citacoes[indexS].Autor}</small>}
                    {!citacoes[indexS].Autor && <small className=' opacity-75 italic self-end'>ㅤ</small>}
                        </div>
                        </div>
                        {citacoes.length > 1 &&  <AiFillRightCircle cursor={'pointer'} onClick={() => {
                            if (indexS === citacoes.length - 1) {
                                setIndex(0)
                            } else {
                                setIndex(indexS + 1)
                            }
                            }} size={60} />}
                    </div>
            </div>            
        </>
    )
}