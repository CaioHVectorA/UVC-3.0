"use client"
import Image from "next/image"
import UVC from '../../public/UVC.png'
import '../styles/header.css'
import { useEffect, useState } from "react"
import { CiSearch } from 'react-icons/ci'
import { GrClose } from 'react-icons/gr'
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
    return (
        <div className="gridHeader p-4">
            <div className="headerSide">
        <div className=" flex gap-2">
            <h4 className=" text-base">REGISTRAR</h4>
            <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
            <h4 className=" text-base">ENTRAR</h4>
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
    </div>
    )
}

function OpenHeaderDown({ scroll }: {scroll: boolean}) {
    console.log(scroll)
    return (
        <div className={`${scroll ? 'HeaderDownAnimationClose' : 'HeaderDownAnimationOpen'}`}>
            <hr />
            <nav>
            <a>CONTOS</a>
            <a>PERSONAGENS</a>
            <a>NOVIDADES</a>
            <a>FAVORITOS</a>
            <a>SAIBA MAIS</a>
            <a>MAIS</a>
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
        <header className=" w-full ">
            {scroll < 60 ? <OpenHeaderTop /> : <ClosedHeader /> } 
            <OpenHeaderDown scroll={scroll > 60}/>
        </header>
    )
}