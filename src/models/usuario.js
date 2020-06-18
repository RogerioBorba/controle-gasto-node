const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true, minlength: 6},
    isAdmin: {type: Boolean, default: false}
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
usuarioSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) 
        user.password = await bcrypt.hash(user.password, 8)
    next()
})
const Usuario = mongoose.model('usuario', usuarioSchema)
module.exports = Usuario