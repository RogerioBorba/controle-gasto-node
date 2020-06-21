const express = require('express')
const router = express.Router()
const GrupoUsuarioGasto = require('./../models/grupoUsuarioGasto')
router.post('/grupo-usuario-gastos', async (req, res) => {
    const umGrupoUsuarioGasto = new GrupoUsuarioGasto(req.body)
    try {
        await umGrupoUsuarioGasto.save() 
        return res.send(umGrupoUsuarioGasto._id)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.get('/grupo-usuario-gastos', async (req, res) => {
    try {
        const listaGrupoUsuarioGasto = await GrupoUsuarioGasto.find({})
    return res.send(listaGrupoUsuarioGasto)    
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
module.exports=router