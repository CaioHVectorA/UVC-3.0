"use client"
import Image from "next/image"
import UVC from '../../public/UVC.png'
import '../styles/components/header.css'
import { useEffect, useState } from "react"
import { CiSearch } from 'react-icons/ci'
import { GrClose } from 'react-icons/gr'
import HeaderMobile from "./HeaderMobile"
import Link from "next/link"
import LoginModal from "./Login"


function ClosedHeader() {
    const [search, setSearch] = useState(false)
    return (
        <nav className="closedHeader">
        <img src={UVC.src} alt="UVC" className=" h-14"/>
        <ul>
            <li className="montserrat">CONTOS</li>
            <li className="montserrat">PERSONAGENS</li>
            <li className="montserrat">NOVIDADES</li>
            <li className="montserrat">MAIS</li>
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
        <div className=" flex gap-2 items-center">
        <h4 className=" text-base">REGISTRAR</h4>
        <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
        <h4 className=" text-base">ENTRAR</h4>
        <CiSearch onClick={() => setSearch(!search)} fontSize={'28px'} cursor={'pointer'}/>
    </div>
        }
        </div>
        </nav>
    )
}

function OpenHeaderTop() {
    const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
    const updateBoolState = () => {
        setModal(prevState => ({
          ...prevState,
          bool: false
        }));
      };
    return (
        <div className="gridHeader p-4">
            <div className="headerSide">
        <div className=" flex gap-2">
            <h4 onClick={() => setModal({bool: true,isLogin: false})} style={{cursor: 'pointer'}} className=" text-base">REGISTRAR</h4>
            <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
            <h4 onClick={() => setModal({bool: true,isLogin: true})} style={{cursor: 'pointer'}} className=" text-base">ENTRAR</h4>
        </div>
        <div className="headerDivision"></div>
            </div>
            <div style={{display: 'flex',justifyContent: "center"}}>
        <img src={UVC.src} alt="UVC" className=" h-14"/>
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
            <Link href={'/'}>CONTOS</Link>
            <Link href={'/'}>PERSONAGENS</Link>
            <Link href={'/'}>NOVIDADES</Link>
            <Link href={'/'}>FAVORITOS</Link>
            <Link href={'/'}>SAIBA MAIS</Link>
            <Link href={'/'}>MAIS</Link>
            </nav>
        </div>
    )
}
export default function Header() {
    const [scroll, setScroll] = useState(0)
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener('scroll', () => setScroll(window.scrollY));
        window.addEventListener('resize', () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener('scroll', () => setScroll(window.scrollY));
            window.removeEventListener('resize', () => setWidth(window.innerWidth));
        };
      }, []);
      return (
        <>
        {width === 0 && <div className="preview BGcolorMain"></div>}
        {width && <>
        {
            width > 1024 ? 
            <header className=" w-full ">
            {scroll < 140 ? <OpenHeaderTop /> : <ClosedHeader /> } 
            <OpenHeaderDown scroll={scroll > 140}/>
        </header>
        : 
        <HeaderMobile />
        }
        </>}
        </>
    )
}