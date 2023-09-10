import { fakePromise } from "@/utilities/functions/MockupCharacter";
import { Character } from "@/utilities/functions/MockupCharacter";
import "../../styles/components/characters.css";
import Link from "next/link";
import { encryptData } from "@/utilities/functions/CryptoFunctions";
import { URLSearchParams } from "url";
import axios from "axios";
import { URL_READONLY } from "@/utilities/envariables";
import fetchData from "@/utilities/functions/FetchData";
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
export function CharCaracter({ data }: { data: Character }) {
  return (
    <Link href={`/char/${data.Nome.toLowerCase()}`}>
      <div
        className="CardCharacter bg-neutral-950 transition-all hover:scale-105"
        style={{ borderTop: `6px solid ${data.Color}` }}
      >
        <h4 className="cardCharacterTitle text-slate-50">{data.Nome}</h4>
        {data.Apelido && (
          <p className="cardCharacterText text-slate-50">"{data.Apelido}"</p>
        )}
      </div>
    </Link>
  );
}
export default async function Characters() {
  const Characters: any[] = (await fetchData(URL_READONLY + "char")).data;
  return (
    <div className="px-8">
      {alphabet.map((letter) => (
        <>
          {Characters.filter((item) =>
            item.Nome.toLowerCase().startsWith(letter)
          ).length > 0 && (
            <h4 className=" uppercase mt-5 mb-2 font-bold text-3xl">
              {letter}
            </h4>
          )}
          <div className="gridCardCharacters">
            {Characters.map((char: Character, index: number) => (
              <>
                {char.Nome.toLowerCase().startsWith(letter) && (
                  <CharCaracter data={char} />
                )}
              </>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
