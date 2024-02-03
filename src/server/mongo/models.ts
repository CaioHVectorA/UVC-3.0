import mongoose, { Model } from "mongoose"
const getCharacterModel = () => {
    if (mongoose.models.characters) return mongoose.models.characters
    return mongoose.model('characters', new mongoose.Schema({}, {strict: false}),"chars")
}
const getHistModel = () => {
    if (mongoose.models.hist) return mongoose.models.hist
    return mongoose.model('hist', new mongoose.Schema({}, {strict: false}),"hists")
}
const chars = getCharacterModel() as Model<any, {}, {}, {}, any, any>
const hists = getHistModel() as Model<any, {}, {}, {}, any, any>

export { chars, hists }