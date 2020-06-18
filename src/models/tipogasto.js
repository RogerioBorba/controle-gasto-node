const mongoose = require('mongoose')
const tipoGastoSchema = new mongoose.Schema({
    descricao: {type: String, required: true, trim: true, unique: true},
    tipoGastoPai: {type: mongoose.SchemaTypes.ObjectId, ref: 'TipoGasto', required: false}
}, {collection: 'tipogasto'})
tipoGastoSchema.virtual('subtipos', {
    ref: 'TipoGasto',
    localField: '_id',
    foreignField: 'tipoGastoPai'
})

tipoGastoSchema.statics.saveGiven = async (descricao, tipoGastoPaiId) => {
    const tipoGastoPai = new mongoose.Types.ObjectId(tipoGastoPaiId)    
    const tipoGasto =  new TipoGasto({descricao, tipoGastoPai})
    await tipoGasto.save() 
    return tipoGasto
}
tipoGastoSchema.statics.populateWithRelationship = async (descricao) => {
        const tipoGasto = await TipoGasto.findOne({descricao: descricao})
        tipoGasto.populate('subtipos')
        //tipoGastoPai vem com _id do pai
        const tipoGastoPai = await TipoGasto.findById(tipoGasto.tipoGastoPai)
        tipoGasto.tipoGastoPai = tipoGastoPai
        return tipoGasto
}
const TipoGasto = mongoose.model("TipoGasto", tipoGastoSchema)
module.exports = TipoGasto
