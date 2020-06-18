const mongoose = require('mongoose')
const TipoGasto = require('./tipogasto')
const Usuario = require('./usuario')
const gastoSchema = new mongoose.Schema({
    descricao: {type: String, trim: true},
    data: {type: Date,  default:  Date.now},
    valor: {type: Number, required: true},
    tipoGasto: {type: mongoose.SchemaTypes.ObjectId, ref: 'TipoGasto', required: true},
    usuario: {type: mongoose.SchemaTypes.ObjectId, ref: 'Usuario', required: true}
}, {collection: 'gasto'})
gastoSchema.pre('find', function() {
    this.populate('tipoGasto')
    //this.populate('usuario')
  })
const Gasto = mongoose.model('Gasto', gastoSchema)
module.exports = Gasto