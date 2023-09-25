import LoginModal from "@/components/Login";
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables";
import { decryptData } from "@/utilities/functions/CryptoFunctions";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import HandleSearch from "./HandleSearch";
import More from "./More";
import UVC from '../../../../public/UVC.png'
import getUserData from "@/utilities/functions/getUserData";
import ProfileImage from "@/components/ProfileImage";
type ModalProps = {bool: boolean,isLogin: boolean}
function StaticMenu() {
    return (
        <>
        <Link href={'/'}>
            <img src={UVC.src} id="UVC" alt="UVC" className=" h-14"/>
        </Link>
        <ul>
            <Link href={'/contos'}><li className="montserrat cursor-pointer">CONTOS</li></Link>
            <Link href={'/char'}><li className="montserrat cursor-pointer">PERSONAGENS</li></Link>
            <Link href={'/novidades'}><li className="montserrat cursor-pointer">NOVIDADES</li></Link>
            <More mode="CLOSED"/>
        </ul>
        </>
    )
}

function SearchMenu({ searchInput, setSearchInput, setSearch }: { searchInput: string, setSearchInput: React.Dispatch<React.SetStateAction<string>>, setSearch: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
        <div className=" flex items-center h-10" style={{maxWidth: '290px'}}>
            <input value={searchInput} onChange={({target}) => setSearchInput(target.value)} onKeyDown={({key}) => {HandleSearch(searchInput,key)}}/>
            <div style={{backgroundColor: '#e7e7e7',height: '100%',display: 'flex',alignItems: 'center',paddingRight: '4px'}}><GrClose onClick={() => setSearch(false)} fontSize={'16px'} cursor={'pointer'}/></div>
            <Link href={`/buscar/${searchInput}`} className="searchButton">
                <CiSearch fill="black" fontSize={'28px'} cursor={'pointer'}/>
            </Link>
        </div>
        </>
    )
}

function LogedMenu({setModal,setSearch}: {setSearch: React.Dispatch<React.SetStateAction<boolean>>, setModal: React.Dispatch<React.SetStateAction<ModalProps>>}) {
    return (
        <>
        {!window.localStorage.getItem(LOGIN_LOCAL_STORAGE) ? 
        <div className=" flex gap-2 items-center">
        <h4 className=" text-base cursor-pointer" onClick={() => setModal({bool: true,isLogin: false})}>REGISTRAR</h4>
        <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
        <h4 className=" text-base cursor-pointer" onClick={() => setModal({bool: true,isLogin: true})}>ENTRAR</h4>
        <CiSearch onClick={() => setSearch(prevState => !prevState)} fontSize={'28px'} cursor={'pointer'}/>
        </div>
        : 
        <>
        {/* @ts-ignore */}
       {!!getUserData() && <ProfileImage imageLink={URL+getUserData().image_path} />}
        </>
        }
        <CiSearch className=" self-center" onClick={() => setSearch(prevState => !prevState)} fontSize={'40px'} cursor={'pointer'}/>
        </>
    )
}
export default function ClosedHeader() {   
    const [modal,setModal] = useState<ModalProps>({bool: false, isLogin: false})
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
            <StaticMenu />
            <div className={`nontransition flex w-56 ${search ? ' justify-start pl-0' : 'justify-between pl-3'}`} style={{marginRight: '36px'}}>
                {search
                ? 
                    <SearchMenu searchInput={searchInput} setSearchInput={setSearchInput} setSearch={setSearch}/>
                :
                    <LogedMenu setModal={setModal} setSearch={setSearch}/>
                }
            </div>
            {modal.bool && <LoginModal setUI={() => null} isLogin={modal.isLogin} onClickKillThis={updateBoolState}/>}
        </nav>
    )
}