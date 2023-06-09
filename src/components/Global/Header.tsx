"use client"
import Image from "next/image"
import UVC from '../../../public/UVC.png'
import '../../styles/components/header.css'
import { useEffect, useState } from "react"
import { CiSearch } from 'react-icons/ci'
import { GrClose } from 'react-icons/gr'
import { FaUserAlt } from 'react-icons/fa'
import HeaderMobile from "./HeaderMobile"
import Link from "next/link"
import LoginModal from "../Login"
import useLocalStorage from "@/utilities/functions/useLocalStorage"
import { decryptData } from "@/utilities/functions/CryptoFunctions"
import { LOGIN_LOCAL_STORAGE } from "@/utilities/envariables"
import hasWindow from "@/utilities/functions/hasWindow"


function ClosedHeader() {   
    const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
    const [search, setSearch] = useState(false)
    const updateBoolState = () => {
        setModal(prevState => ({
          ...prevState,
          bool: false
        }));
      }
    return (
        <nav className="closedHeader">
            <Link href={'/'}>
        <img src={UVC.src} alt="UVC" className=" h-14"/>
            </Link>
        <ul>
            <Link href={'/contos'}><li className="montserrat cursor-pointer">CONTOS</li></Link>
            <Link href={'/char'}><li className="montserrat cursor-pointer">PERSONAGENS</li></Link>
            <Link href={'/novidades'}><li className="montserrat cursor-pointer">NOVIDADES</li></Link>
            <Link href={'/'}><li className="montserrat cursor-pointer">MAIS</li></Link>
        </ul>
        <div className="nontransition" style={{width: '220px',display: 'flex',justifyContent: 'end'}}>
        {search
         ? 
         <>
        <div className=" flex items-center h-10" style={{maxWidth: '290px'}}>
        <input />
        <div style={{backgroundColor: '#e7e7e7',height: '100%',display: 'flex',alignItems: 'center',paddingRight: '4px'}}><GrClose onClick={() => setSearch(false)} fontSize={'16px'} cursor={'pointer'}/></div>
        <div className="searchButton">
        <CiSearch fill="black" fontSize={'28px'} cursor={'pointer'}/>
        </div>
        </div>
         </>
        :
        <>
                {   !window.localStorage.getItem(LOGIN_LOCAL_STORAGE) ? 
        <div className=" flex gap-2 items-center">
        <h4 className=" text-base cursor-pointer" onClick={() => setModal({bool: true,isLogin: false})}>REGISTRAR</h4>
        <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
        <h4 className=" text-base cursor-pointer" onClick={() => setModal({bool: true,isLogin: true})}>ENTRAR</h4>
        <CiSearch onClick={() => setSearch(!search)} fontSize={'28px'} cursor={'pointer'}/>
         </div>
        : 
        <div className="profileContainer">
        <FaUserAlt size={24} />
        {!!window.localStorage.getItem(LOGIN_LOCAL_STORAGE) && <h4>{decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE)).data.username}</h4>}
        </div>
        }
        </>
        }
        </div>
        {modal.bool && <LoginModal isLogin={modal.isLogin} onClickKillThis={updateBoolState}/>}
        </nav>
    )
}

function OpenHeaderTop() {
    function NotLogedUI() {
        return (
            <div className=" flex gap-2">
            <h4 onClick={() => setModal({bool: true,isLogin: false})} style={{cursor: 'pointer'}} className=" text-base">REGISTRAR</h4>
            <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
            <h4 onClick={() => setModal({bool: true,isLogin: true})} style={{cursor: 'pointer'}} className=" text-base">ENTRAR</h4>
        </div>
        )
    }
    function LogedUi() {
        return (
            <div className="profileContainer">
        <FaUserAlt size={24} />
        {/* change to typeoff in build */}
        <h4>{!!(hasWindow() && window.localStorage.getItem(LOGIN_LOCAL_STORAGE)) && decryptData(window.localStorage.getItem(LOGIN_LOCAL_STORAGE)).data.username}</h4>
        </div>
            )
        }
        const [UI,setUI] = useState(NotLogedUI)
        const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
        const updateBoolState = () => {
            document.body.style.overflowY = 'visible'
            setModal(prevState => ({
                ...prevState,
                bool: false
            }));
        }
        useEffect(() => {
          {/* change to typeoff in build */}
        if (hasWindow() && window.localStorage.getItem(LOGIN_LOCAL_STORAGE)) {
            setUI(LogedUi)
        }
        // @ts-ignore
      }, [])
    return (
        <div className="gridHeader p-4">
            <div className="headerSide">
        {UI}
        <div className="headerDivision"></div>
            </div>
            <div style={{display: 'flex',justifyContent: "center"}}>
            <Link href={'/'}>
        <img src={UVC.src} alt="UVC" className=" h-14"/>
            </Link>
            </div>
        <div className="headerSide">
        <div className="headerDivision"></div>
        <div className=" flex">
        <input />
        <div className="searchButton">
        <CiSearch fill="black" fontSize={'28px'}/>
        </div>
        </div>
        </div>
        {modal.bool && <LoginModal isLogin={modal.isLogin} onClickKillThis={updateBoolState}/>}
    </div>
    )
}

function OpenHeaderDown({ scroll }: {scroll: boolean}) {
    return (
        <div className={`${scroll ? 'HeaderDownAnimationClose' : 'HeaderDownAnimationOpen'}`}>
            <hr />
            <nav>
            <Link href={'/contos'}>CONTOS</Link>
            <Link href={'/char'}>PERSONAGENS</Link>
            <Link href={'/novidades'}>NOVIDADES</Link>
            <Link href={'/'}>FAVORITOS</Link>
            <Link href={'/'}>SAIBA MAIS</Link>
            <Link href={'/'}>MAIS</Link>
            </nav>
        </div>
    )
}
export default function Header() {
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        window.addEventListener('scroll', () => setScroll(window.scrollY));
        return () => {
            window.removeEventListener('scroll', () => setScroll(window.scrollY));
        };
      }, []);
      return (
        <div>
            <div className="notmobile">
            <header className=" w-full ">
            {scroll < 140 ? <OpenHeaderTop /> : <ClosedHeader /> } 
            <OpenHeaderDown scroll={scroll > 140}/>
        </header>
            </div>
            <div className="mobile">
        <HeaderMobile />
            </div>
        </div>
    )
}