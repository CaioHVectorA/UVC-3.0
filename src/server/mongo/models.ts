import mongoose, { Model } from "mongoose"
const getCharacterModel = () => {
    if (mongoose.models?.characters) return mongoose.models.characters
    return mongoose.model('characters', new mongoose.Schema({
        // Imgs: [String],
        // Apelidos: [String],
        // NomeVerdadeiro: String,
        // Citacoes: [{Frase: string, Autor: string; }],
        // Instances: [
        //     {
        //         Forma: String, 
        //         Aparicoes: [String],
        //         Biografia: String,
        //         Atributos: [{ Forca: Number, Agilidade: Number, Resistencia: Number, Inteligencia: Number  }]
        //     }
        // ],
        // Color: String,
        // isHero: Boolean,
        // Equipe: String,
        // Local: String,
        // Keywords: [String]
    }, { strict: false,  }),"chars")
}
const getHistModel = () => {
    if (mongoose.models?.hist) return mongoose.models.hist
    return mongoose.model('hist', new mongoose.Schema({
        Nome: String,
        Sinopse: String,
        Img: String,
        Ref: String,
        Relacionados: [{ Ref: String, Nome: String, Img: String }],
    }),"hists")
}
const getSubhitModel = () => {
    if (mongoose.models?.subhist) return mongoose.models.subhist
    return mongoose.model('subhist', new mongoose.Schema({ 
        Nome: String,
        Img: String,
        Ref: String,
        Source: String,
        Sinopse: String,
        Categorias: [String],
     }),"subhists")
}
const chars = getCharacterModel() as Model<any, {}, {}, {}, any, any>
const hists = getHistModel() as Model<any, {}, {}, {}, any, any>
const subHists = getSubhitModel() as Model<any, {}, {}, {}, any, any>
export { chars, hists, subHists }