"use client"
import '../styles/components/header.css'
import UVC from '../../public/UVC.png'
import { BiMenuAltRight } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function HeaderMobile() {
    const [open,setOpen] = useState(false)
    const Itens: {name: string, linkTo: string}[] = [
        { name: 'Personagens', linkTo: '/Personagens' },
        { name: 'Contos', linkTo: '/Contos' },
        { name: 'Novidades', linkTo: '/Novidades' },
        { name: 'Entrar', linkTo: '/Entrar' },
        { name: 'Buscar', linkTo: '/Buscar' },
        { name: 'Favoritos', linkTo: '/Favoritos' },
        { name: 'Saiba Mais', linkTo: '/Saiba Mais' },
    ]
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden' 
        if (!open) document.body.style.overflow = '' 
    }, [open])
    return (
        <>
        <header>
            <img src={UVC.src} alt="UVC" className=" h-14"/>
            <BiMenuAltRight onClick={() => setOpen(!open)} fontSize={48} color='black'/>
        </header>
        <nav className={`BGcolorEscuro ${open ? 'open' : 'closed'}`}> 
            {Itens.map(headerItem => (
                <Link href={headerItem.linkTo}>
                <h4>{headerItem.name}</h4>
                <hr />
                </Link>
            ))}
            </nav>
        </>
    )
}