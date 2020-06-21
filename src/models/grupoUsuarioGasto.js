const mongoose = require('mongoose')
const Usuario = require('./usuario')
const grupoUsuarioGastoSchema = new mongoose.Schema({
    nome: {type: String, unique: true}
})

grupoUsuarioGastoSchema.methods.gastos = async function() {
    const grupoGasto = this
    const usuarios = await Usuario.find({})
    const gastos = []
    for (const usuario of usuarios.entries())  { 
        const gts = await usuario.gastos()
        console.log(gts)
        gastos = gastos.concat(gts)
    }
    return gastos
}
const GrupoUsuarioGasto = mongoose.model('GrupoUsuarioGasto', grupoUsuarioGastoSchema)
module.exports=GrupoUsuarioGasto
