import { ServerError } from '@/server/ServerError' 
import { Fav, ReadLater, User } from '@prisma/client';
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
  ImgRef: string;
  Tipo: string;
  Capitulos: Capitulo[];
  Keywords: String[];
};
type Aparicoes_Type = {
  Ref: string;
  Nome: string;
  Img: string;
};

export type Citacao = {
  Frase: string;
  Autor?: string;
};
export type Atributos = {
  Forca: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  Agilidade: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  Resistencia: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  Inteligencia: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};
export type Character_Type = {
  Nome: string;
  Apelido: string;
  Imgs: string[];
  Citacoes: Citacao[];
  Atributos: Atributos;
  Aparicoes: Aparicoes_Type[];
  Biografia: string;
  Poderes: string;
  Curiosidades: string | undefined;
  Color: string;
  isHero: boolean;
  Equipe: string | undefined;
  Local: string;
  Keywords: String[];
};

export type Solo_Type = {
  Nome: string;
  Tipo: string;
  Descricao: string;
  Escrito: string;
  Ref: string;
  Data: string;
  Status: string;
  Categorias: string[];
  Relacionados: object[];
  ImgRef: string;
  isAlternative: boolean;
  Keywords: String[];
};

export type User_Type = {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  image_path: string;
}

export type IComment = {
  content: string;
  comment_by: string;
  comment_in: string;
  username_author: string;
  created_at: string
  id: string,
  author_img: string
}

// -----------------  NEW TYPES  -----------------------

export type Instance = {
  Aparicoes: Relacionado[],
  Biografia: string,
  Atributos: Atributos
  Forma: string,
}

export type Character = {
  Imgs: string,
  Apelidos: string,
  NomeVerdadeiro: string,
  Citacoes: Citacao[],
  Instances: Instance[],
  Color: string,
  isHero: boolean,
  Equipe: string,
  Local: string,
  Keywords: string[]
}

export type Relacionado = {
  Ref: string;
  Nome: string;
  Img: string;
}

export type Hist = {
  Nome: string;
  Sinopse: string;
  Img: string;
  Ref: string;
  Relacionados: Relacionado[];
  Categorias: string[]
  // id: string
  createdAt: string
  BgImg: string,
  Subhists: string[]
}


export type SubHist =  {
  Nome: string;
  Img: string;
  Ref: string;
  Source: string;
  Sinopse: string;
  Categorias: string[];
  _id: string
}

export type UserWithAllData = Omit<User, 'password'> & { Favs: Fav[], ReadLater: ReadLater[] }