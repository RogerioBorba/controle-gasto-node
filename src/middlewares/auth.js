const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const auth = async (req, res, next) => {
    if(!req.header('Authorization'))
        res.status(401).send("Por favor faça o login")
    const token = req.header('Authorization').replace('Bearer ', '')
    const decode = await jwt.verify(token, process.env.JWTSECRET)
    const usuario = await Usuario.findById(decode._id)
    if (!usuario)
            throw new Error("Não foi possível executar a operação")
    req.token = token
    req.usuario = usuario
    next()
}
module.exports=auth