import LoginModal from "@/components/Login";
import { LOGIN_LOCAL_STORAGE } from "@/utilities/envariables";
import { decryptData } from "@/utilities/functions/CryptoFunctions";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import HandleSearch from "./HandleSearch";
import More from "./More";
import UVC from '../../../../public/UVC.png'

export default function ClosedHeader() {   
    const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
    const [search, setSearch] = useState<boolean>(false)
    const [searchInput,setSearchInput] = useState<string>("")
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
             <More mode="CLOSED"/>
        </ul>
        <div className="nontransition" style={{width: '220px',display: 'flex',justifyContent: 'end'}}>
        {search
         ? 
         <>
        <div className=" flex items-center h-10" style={{maxWidth: '290px'}}>
        <input value={searchInput} onChange={({target}) => setSearchInput(target.value)} onKeyDown={({key}) => {HandleSearch(searchInput,key)}}/>
        <div style={{backgroundColor: '#e7e7e7',height: '100%',display: 'flex',alignItems: 'center',paddingRight: '4px'}}><GrClose onClick={() => setSearch(false)} fontSize={'16px'} cursor={'pointer'}/></div>
        <Link href={`/buscar/${searchInput}`} className="searchButton">
        <CiSearch fill="black" fontSize={'28px'} cursor={'pointer'}/>
        </Link>
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
        <CiSearch className=" self-center" onClick={() => setSearch(!search)} fontSize={'40px'} cursor={'pointer'}/>
        </>
        }
        </div>
        {modal.bool && <LoginModal isLogin={modal.isLogin} onClickKillThis={updateBoolState}/>}
        </nav>
    )
}