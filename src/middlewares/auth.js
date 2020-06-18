const jwt = require('jsonwebtoken')
const Usuario = require('./../models/usuario')
const auth = async (req, res, next) => {
    try {
        if(!req.header('Authorization')) {
            console.log("Requisição sem o header Authorization")
            return res.status(401).send("Usuário não autenticado")
        } 
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = await jwt.verify(token, process.env.JWTSECRET)
        const usuario = await Usuario.findOne({_id: decode._id})
       
        if(!usuario)
            return res.status(404).send("Usuário não encontrado")
        req.token = decode._id
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve falha para fazer o login.")
    }
}
module.exports=auth