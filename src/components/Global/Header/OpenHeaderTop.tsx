import LoginModal from "@/components/Login"
import { LOGIN_LOCAL_STORAGE, URL } from "@/utilities/envariables"
import hasWindow from "@/utilities/functions/hasWindow"
import Link from "next/link"
import { useState, useEffect, ReactNode, useContext } from "react"
import { CiSearch } from "react-icons/ci"
import HandleSearch from "./HandleSearch"
import UVC from '../../../../public/UVC.png'
import getUserData from "@/utilities/functions/getUserData"
import { AppContext } from "@/components/Context/AppContext"
import ProfileImage from "@/components/ProfileImage"
import axios from "axios"
const border = 'mb-1 mt-1 border-b w-10/12 text-center border-black border-opacity-70'
function Profile({n,setUI}: {n: unknown, setUI: any}) {
    const user = getUserData()
    const { img } = useContext(AppContext)
    //@ts-ignore
    const path = img ? img : URL + user.image_path
    if (!user) return
    return (
        <div className=" relative flex justify-center">
            <div className=" flex w-1/2 items-center justify-center">
                <ProfileImage imageLink={path} />
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
            if (hasWindow() && !!getUserData()) {
            const data = getUserData()
            if (!data) return
            const { id } = data
            axios.post('/api/lastseen', { id })
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