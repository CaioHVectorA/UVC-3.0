import LoginModal from "@/components/Login"
import { LOGIN_LOCAL_STORAGE } from "@/utilities/envariables"
import { decryptData, encryptData } from "@/utilities/functions/CryptoFunctions"
import hasWindow from "@/utilities/functions/hasWindow"
import Link from "next/link"
import { useState, useEffect, ReactNode } from "react"
import { CiSearch } from "react-icons/ci"
import { FaUserAlt } from "react-icons/fa"
import HandleSearch from "./HandleSearch"
import UVC from '../../../../public/UVC.png'
import getUserData from "@/utilities/functions/getUserData"
const border = 'mb-1 mt-1 border-b w-10/12 text-center border-black border-opacity-70'
function Profile({n,setUI}: {n: unknown, setUI: any}) {
    const [isOpen,setIsOpen] = useState(false)
    const user = getUserData()
    if (!user) return
    return (
        <div className=" relative flex justify-center">
            <div className=" flex w-1/2 items-center justify-center">
                <div className=" flex justify-center">
                    <FaUserAlt onClick={() => setIsOpen(!isOpen)} className=" bg-black bg-opacity-50 rounded-full notHover cursor-pointer" size={48} />
                </div>
            </div>
            {isOpen && (
                <div className="flex flex-col items-center absolute w-56 BGcolorEscuro rounded-md gap-2 top-12 pb-4">
                    <p className={` text-2xl ${border}`}>{user.username}</p>
                    <Link href={`/profile`} className=" py-1 px-3 border-black border rounded-md BGcolorMain">Seu perfil</Link>
                    <p className=" underline opacity-80 normal-case text-xs mt-5 cursor-pointer" onClick={() => {
                        setUI(n)    
                        localStorage.removeItem(LOGIN_LOCAL_STORAGE)
                    }}>Sair da conta</p>
                </div>
            )}
        </div>
            )
}


export default function OpenHeaderTop() {
    const [searchInput,setSearchInput] = useState<string>("")
    const [modal,setModal] = useState<{bool: boolean,isLogin: boolean}>({bool: false, isLogin: false})
    const [UI,setUI] = useState(NotLogedUI)
    // ______________________________________________________________-
    function NotLogedUI() {
        return (
            <div className=" flex gap-2">
            <h4 onClick={() => setModal({bool: true,isLogin: false})} style={{cursor: 'pointer'}} className=" text-base">REGISTRAR</h4>
            <div style={{height: '20px',width: '1px',backgroundColor: 'rgba(255,255,255,.3)',borderRadius: '25px'}}></div>
            <h4 onClick={() => setModal({bool: true,isLogin: true})} style={{cursor: 'pointer'}} className=" text-base">ENTRAR</h4>
        </div>
        )
    }
    // ______________________________________________________________-
    function LogedUi() {
            return (
                <Profile n={NotLogedUI} setUI={setUI}/>
            )
        }
    // ______________________________________________________________-
        const updateBoolState = () => {
            document.body.style.overflowY = 'visible'
            setModal(prevState => ({
                ...prevState,
                bool: false
            }));
        }
        useEffect(() => {
        if (hasWindow() && window.localStorage.getItem(LOGIN_LOCAL_STORAGE)) {
            setUI(LogedUi)
        }
      }, [])
      function setLogedUI() {
        setUI(LogedUi)
      }
    return (
        <div className="gridHeader p-4">
            <div className="headerSide">
        {UI}
        <div className="headerDivision" />
            </div>
            <div style={{display: 'flex',justifyContent: "center"}}>
            <Link href={'/'}>
        <img src={UVC.src} alt="UVC" className=" h-14"/>
            </Link>
            </div>
        <div className="headerSide">
        <div className="headerDivision" />
        <div className=" flex">
        <input value={searchInput} onChange={({target}) => setSearchInput(target.value)} onKeyDown={({key}) => {HandleSearch(searchInput,key)}}/>
        <Link href={`/buscar/${searchInput}`} className="searchButton">
        <CiSearch fill="black" fontSize={'28px'}/>
        </Link>
        </div>
        </div>
        {modal.bool && <LoginModal isLogin={modal.isLogin} setUI={setLogedUI} onClickKillThis={updateBoolState}/>}
    </div>
    )
}