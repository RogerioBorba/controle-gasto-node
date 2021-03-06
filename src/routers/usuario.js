const express = require("express")
const Usuario = require("./../models/usuario")
const bcrypt = require('bcryptjs')
const router = express.Router()
const auth = require('./../middlewares/auth')

router.get('/usuarios/me', auth, async (req, res)=> {
    console.log("Token: ", req.token)    
    console.log("Usuario: ", req.usuario)    
    res.send(req.usuario)
})
router.get('/usuarios/me/gastos', auth, async (req, res)=> {
     //await req.usuario.populate('gastos')
     
     res.send( await req.usuario.meusGastos())
})
router.get('/usuarios/me/gastos-do-grupo', auth, async (req, res)=> {
    //await req.usuario.populate('gastos')
    res.send(await req.usuario.gastosDoGrupo())
})
router.post('/usuarios/login', async (req, res) => {
    try {
        //const u = await Usuario.findOne({email: req.body.email})
        const user = await Usuario.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({token})
    } catch (error) {
        console.log(error)
        res.status(403).send(`Não foi possível logar. ${error.message}`)
    }
})
router.post('/usuarios', async (req, res) => {
    try {
        const attributesFromReq = Object.keys(req.body)
        const isAttributesOk = attributesFromReq.every(att => ['nome', 'email', 'password', 'grupoUsuarioGasto'].includes(att))
        if (!isAttributesOk)
            return res.status(400).send("Há atributos incorretos")
        const usuario = Usuario(req.body)
        await usuario.save()
        const token = await usuario.generateAuthToken()
        return res.status(201).send({usuario, token})

    } catch (error) {
        console.log(error)
        res.status(500).send(`Não foi possível executar a operação. ${error.message}`)
    }
})
router.post('usuarios/login', async (req, res) => {
    try {
        const usuario = await Usuario.findByCredentials(req.body.email, req.body.password)
        console.log(usuario)
        const token = await usuario.generateAuthToken()
        return res.status(201).send({usuario, token})
    } catch (error) {
        console.log(error)    
        return res.status(401).send("Não foi possível logar.")
    }
})
router.patch('/usuarios/me',auth , async (req, res) => {
    try {
        let attributeNamesFromReq = Object.keys(req.body)
        attributeNamesFromReq = attributeNamesFromReq.filter(att => ['nome', 'email', 'grupoUsuarioGasto'].includes(att))
        if (attributeNamesFromReq.length == 0)
            return res.status(400).send("Há atributos incorretos")
        const usuario = req.usuario
        attributeNamesFromReq.forEach(attrName => usuario[attrName]= req.body[attrName])
        await usuario.save()
        res.send(usuario)
    } catch (error) {
        console.log("error")
        res.status(500).send(`Não foi possível executar a operação. ${error.message}`)
    }
})
router.patch('/usuarios/me/change-password', auth, async (req, res)=> {
    const password = req.body.password
    if (!password)
        return res.status(400).send("senha nova não informada")
    try {
        req.usuario.password = password
        await req.usuario.save()
        res.send("Senha alterada.")
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.delete('/usuarios/me', auth, async (req, res) => {
    try {
        await req.usuario.remove()
        return res.send("Usuário removido")
    } catch (error) {
        console.log(error)
        res.status(500).send(`Não foi possível executar a operação. ${error.message}`)
    }
})

module.exports = router