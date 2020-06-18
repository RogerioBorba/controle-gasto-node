const express = require('express')
const Usuario = require('./../models/usuario')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')

router.post('/usuarios', async (req, res) => {
    
    const usuario = new Usuario(req.body)
    try {
        await usuario.save()
        res.status(201).send(usuario._id)
    } catch (error) {
        console.log(error)
        res.status(500).send("Não foi possível criar o usuário")
    }
    res.send("Usuarios para ser criados")
})
router.patch('/usuarios/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]
    try {
        const usuario = await Usuario.findById(req.params.id)
        if(!usuario)    
            return res.status(404).send("Usuário não encontrado.")
        attributeNames.forEach(attrName => usuario[attrName]= req.body[attrName])
        await usuario.save()
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.delete('/usuarios/:id',  async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndDelete({_id: req.params.id})
        if(!usuario)    
            return res.status(404).send("Usuário não encontrado.")
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.get('/usuarios',  async (req, res) => {
    try {
        const usuarios = await Usuario.find({})
        res.send(usuarios)
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})
router.post('/usuarios/login', async (req, res) => {
    try {
        const usuario = await Usuario.findByCredentials(req.body.email, req.body.password)
        if(!usuario)
            return res.status(404).send("Usuário não encotrado")
        const token = await usuario.gerarToken()
        res.send({usuario: usuario, token: token})    
    } catch (error) {
        console.log(error)
        res.status(403).send(error.message)
    }
})
module.exports = router