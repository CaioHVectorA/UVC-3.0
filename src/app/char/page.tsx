import Characters from "@/components/characters/char";
import '../../styles/components/characters.css'
import { Metadata } from "next";
export default function CharacterPage() {
    return <div>
        <div className=" ml-8 my-4 max-lg:flex max-lg:w-screen max-lg:flex-col max-lg:items-center max-lg:ml-0">
        <h2 className="title">PERSONAGENS</h2>
        <h4 className="subtitle">Conheça mais os seus personagens favoritos!</h4>
        </div>
        <Characters />
    </div>
}