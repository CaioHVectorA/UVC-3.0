import LoginModal from "@/components/Login"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import { decryptData, encryptData } from "@/utilities/functions/CryptoFunctions"
import hasWindow from "@/utilities/functions/hasWindow"
import Link from "next/link"
import { useState, useEffect, ReactNode } from "react"
import { CiSearch } from "react-icons/ci"
import { FaUserAlt } from "react-icons/fa"
import HandleSearch from "./HandleSearch"
import UVC from '../../../../public/UVC.png'
import getUserData from "@/utilities/functions/getUserData"
import useLocalStorage from "@/utilities/functions/useLocalStorage"
const border = 'mb-1 mt-1 border-b w-10/12 text-center border-black border-opacity-70'
function Profile({n,setUI}: {n: unknown, setUI: any}) {
    const user = getUserData()
    console.log(user)
    if (!user) return
    return (
        <div className=" relative flex justify-center">
            <div className=" flex w-1/2 items-center justify-center">
                <Link href={"/profile"} className=" flex justify-center items-center bg-black bg-opacity-70 rounded-full w-16 h-16 p-0 ">
                    <img src={URL+user.image_path} className=" object-contain w-15 h-15 max-h-15" />
                </Link>
            </div>
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
      }, [localStorage.getItem(LOGIN_LOCAL_STORAGE)])
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
        <img src={UVC.src} alt="UVC" id="UVC" className=" h-14"/>
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