import Characters from "@/components/Characters/Char";
import '../../styles/components/characters.css'
import { Metadata } from "next";
// export async function generateMetadata(): Promise<Metadata> {
//     return {
//       title: "Contos",
//       description: "Descubra um elenco diversificado de personagens que dão vida às nossas histórias envolventes. Dos heróis aos vilões, conheça profundamente cada protagonista. Encontre seu favorito e mergulhe ainda mais nas narrativas que amamos criar. Explore agora!",
//     };
//   }
export default function CharacterPage() {
    return <div>
        <div className=" ml-8 my-4 max-lg:flex max-lg:w-screen max-lg:flex-col max-lg:items-center max-lg:ml-0">
        <h2 className="title">PERSONAGENS</h2>
        <h4 className="subtitle">Conheça mais os seus personagens favoritos!</h4>
        </div>
        <Characters />
    </div>
}