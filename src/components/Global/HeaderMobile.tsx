"use client"
import '../../styles/components/header.css'
import UVC from '../../../public/UVC.png'
import { BiMenuAltRight } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LOGIN_LOCAL_STORAGE } from '@/utilities/envariables'
import LoginModal from '../Login'

export default function HeaderMobile() {
    const [open,setOpen] = useState(false)
    const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
    const updateBoolState = () => {
        setModal(prevState => ({
          ...prevState,
          bool: false
        }));
      }
    const Itens: {name: string, linkTo: string}[] = [
        { name: 'Personagens', linkTo: '/Personagens' },
        { name: 'Contos', linkTo: '/Contos' },
        { name: 'Novidades', linkTo: '/novidades' },
        { name: 'Buscar', linkTo: '/Buscar' },
        { name: 'Favoritos', linkTo: '/Favoritos' },
        { name: 'Saiba Mais', linkTo: '/Saiba Mais' },
    ]
    useEffect(() => {
        if (open) document.body.style.overflowY = 'hidden' 
        if (!open) document.body.style.overflowY = 'visible' 
    }, [open])
    return (
        <>
        <header>
            {modal.bool && <LoginModal isLogin={modal.isLogin} onClickKillThis={updateBoolState} />}
            <Link href={'/'}><img src={UVC.src} alt="UVC" className=" h-14"/></Link>
            <BiMenuAltRight className='menuSvg' onClick={() => setOpen(!open)} fontSize={48} color='black'/>
        </header>
        <nav className={`BGcolorEscuro ${open ? 'open' : 'closed'}`}> 
        <div>
            {typeof window !== 'undefined' && !!window.localStorage.getItem(LOGIN_LOCAL_STORAGE) ? <>
                <h4>Perfil</h4>
                <hr />
            </> 
            : 
            <>
            <h4 onClick={() => setModal({bool: true, isLogin: true})}>Logar no UVC</h4>
            <hr />
            </>}
        </div>
            {Itens.map(headerItem => (
                <Link key={headerItem.name} href={headerItem.linkTo}>
                <h4>{headerItem.name}</h4>
                <hr />
                </Link>
            ))}
            </nav>
        </>
    )
}