// ARQUIVO TEMPORARIO -- PARA SUPRIR FALTA DE API.
type Aparicoes_Type = {
  Ref: string;
  Nome: string;
  Img: string;
};

export class Character {
  Nome: string;
  Apelido: string;
  Imgs: string[];
  Aparicoes: Aparicoes_Type[];
  Biografia: string;
  Poderes: string;
  Curiosidades: string | undefined;
  Color: string;
  isHero: boolean;
  Equipe: string | undefined;
  Local: string;
  constructor(
    Nome: string,
    Apelido: string,
    Imgs: string[],
    Aparicoes: Aparicoes_Type[],
    Biografia: string,
    Poderes: string,
    Curiosidades: string,
    Color: string,
    isHero: boolean,
    Equipe: string,
    Local: string
  ) {
    this.Nome = Nome;
    this.Apelido = Apelido;
    this.Imgs = Imgs;
    this.Aparicoes = Aparicoes;
    this.Biografia = Biografia;
    this.Poderes = Poderes;
    this.Curiosidades = Curiosidades;
    this.Color = Color;
    this.isHero = isHero;
    this.Equipe = Equipe;
    this.Local = Local;
  }
}
export function fakePromise() {
  const colors = [
    "#FF4D4D",
    "#FF9933",
    "#FFCC33",
    "#FFFF4D",
    "#CCFF4D",
    "#66FF66",
    "#33FF99",
    "#33FFCC",
    "#33FFFF",
    "#33CCFF",
    "#3366FF",
    "#6633FF",
    "#9933FF",
    "#CC33FF",
    "#FF33FF",
    "#FF3399",
    "#FF3366",
    "#FF6633",
    "#FF9900",
    "#FFCC00",
  ];
  return new Promise((resolve, reject) => {
    const arr: Character[] = [];
    for (let index = 0; index < 20; index++) {
      const character = new Character(
        "LARRY",
        "O Menino Resiliente",
        ["imagem1.jpg", "imagem2.jpg"],
        [
          { Ref: "ref1", Nome: "Aparição 1", Img: "aparicao1.jpg" },
          { Ref: "ref2", Nome: "Aparição 2", Img: "aparicao2.jpg" },
        ],
        "Biografia do Personagem",
        "Poderes do Personagem",
        "Curiosidades do Personagem",
        "Cor do Personagem",
        true,
        "Equipe do Personagem",
        "Local do Personagem"
      );
      character.Color = colors[index];
      arr.push(character);
    }

    setTimeout(() => {
      resolve(arr);
    }, 1000);
  });
}
