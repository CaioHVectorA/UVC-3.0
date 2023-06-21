import {useEffect} from 'react'
import "../../styles/components/gradient.css";
import { ChangeTheme } from "../../utilities/functions/ChangeTheme";
import Link from 'next/link';
export default function GradientAndTexts() {

  return (
    <div className="container">
      <h1 className=" leading-none">
        DESCUBRA <br /> APROFUNDE <br />
        <span className="colorMain">AVENTURE-SE</span>
      </h1>
      <p>
        Explore o <span className="colorMain">Universo Vector de Contos</span>,
        onde diversos contos tomam forma e se entrelaçam num espaço-tempo
        compartilhado e incrível.
      </p>
      <Link href={'/contos'}>
      <button>Conhecer Agora</button>
      </Link>
    </div>
  );
}
