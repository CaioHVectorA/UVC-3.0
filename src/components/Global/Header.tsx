"use client"
import '../../styles/components/header.css'
import { useEffect, useState } from "react"
import HeaderMobile from "./Header/HeaderMobile"
import OpenHeaderTop from "./Header/OpenHeaderTop"
import ClosedHeader from "./Header/ClosedHeader"
import OpenHeaderDown from "./Header/OpenHeaderDown"
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