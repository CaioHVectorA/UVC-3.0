import Characters from "@/components/Characters/Char";
import '../../styles/components/characters.css'
import { metadata } from "../layout";
metadata.title = 'Personagens'
export default function CharacterPage() {
    return <div>
        <div className=" ml-8 my-4">
        <h2 className="title">PERSONAGENS</h2>
        <h4 className="subtitle">Conheça mais os seus personagens favoritos!</h4>
        </div>
        <Characters />
    </div>
}