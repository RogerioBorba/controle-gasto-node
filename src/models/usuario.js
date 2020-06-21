const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Gasto = require('./gasto')
const GrupoUsuarioGasto = require('./grupoUsuarioGasto')
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true, minlength: 6},
    isAdmin: {type: Boolean, default: false},
    gastos: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Gasto', locaField: '_id', forignField: 'usuario'}],
    grupoUsuarioGasto: { type: mongoose.SchemaTypes.ObjectId, ref: 'GrupoUsuarioGasto'}
}, {collection: 'usuario'})
usuarioSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWTSECRET) 
    return token
}
usuarioSchema.methods.toJSON = function() {
    const usuario = this
    const newUsuario = usuario.toObject()
    delete newUsuario.password
    return newUsuario
}
usuarioSchema.statics.findByCredentials = async(email, password) => {
    const user = await Usuario.findOne({email: email})
    console.log('Usuario: ', user)
    if (!user)
        throw new Error("Usuário incorreto ou senha errada.")
    const isMatch = await bcrypt.compare(password, user.password)    
    if (!isMatch)
        throw new Error("Usuário incorreto ou senha errada.")
    return user
}
usuarioSchema.methods.meusGastos = async function() {
    const usuario = this
    const gtos = await Gasto.find({usuario: usuario._id})
    return gtos
} 
usuarioSchema.methods.gastosDoGrupo = async function() {
    const usuario = this
    //const grpGasto = await GrupoUsuarioGasto.findById(usuario.grupoUsuarioGasto)
    const usuarios = await Usuario.find({grupoUsuarioGasto: usuario.grupoUsuarioGasto})
    let gastosGrupo = []
    for (const usuar of usuarios)  { 
        const gts = await usuar.meusGastos()
        gastosGrupo = gastosGrupo.concat(gts)
    }
    return await gastosGrupo
}
usuarioSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) 
        user.password = await bcrypt.hash(user.password, 8)
    next()
})
usuarioSchema.pre('remove', async function(next) {
    await Gasto.deleteMany({usuario: this._id})   
    next()
})
const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario