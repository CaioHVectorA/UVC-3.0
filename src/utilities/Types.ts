type Episodios = {
  Nome: string;
  Ref: string;
  Numero: number;
};

export type Capitulo = {
  Nome: string;
  Disponivel: boolean;
  NumEps: number;
  DescCap: string;
  Episodios: Episodios[];
};

export type Serie_Type = {
  Nome: string;
  Descricao: string;
  Escrito: string;
  Ref: string;
  Data: string;
  Status: string;
  Categorias: string[];
  Relacionados: object[];
  Capitulos: Capitulo[];
};

export type Character_Type = {
  Nome: string;
  Apelido: string;
  Imgs: string[];
  Aparicoes: object[];
  Biografia: string;
  Poderes: string;
  Curiosidades?: string;
  Color: string;
  isHero: boolean;
  Equipe?: string;
  Local: string;
};

export type Solo_Type = {
  Nome: string;
  Descricao: string;
  Escrito: string;
  Ref: string;
  Data: string;
  Status: string;
  Categorias: string[];
  Relacionados: object[];
  isAlternative: boolean;
};
