const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: { type: String, required: true, trim: true, minlength: 6 },
    isAdministrador: {type: Boolean, default: false} 

    }, {collection: 'usuario'})
usuarioSchema.methods.gerarToken = async function() {
        const user = this
        const token = jwt.sign({_id: user._id.toString()}, process.env.JWTSECRET, { expiresIn: 60 * 60 }) 
        //user.tokens = user.tokens.concat({token: token})
        //await user.save()
        return token
}    
usuarioSchema.methods.toJSON =  function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}
usuarioSchema.statics.findByCredentials = async (email, aPassword) => {
    const usuario = await Usuario.findOne({email: email})
    const isMatch = await bcrypt.compare(aPassword, usuario.password)    
    if (!isMatch)
        throw new Error("Não foi possível logar.")
    return usuario
}  
usuarioSchema.pre('save', async function(next) {
    const usuario = this
    if (usuario.isModified('password')) 
        usuario.password = await bcrypt.hash(usuario.password, 8)
    next()
})  
const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports= Usuario