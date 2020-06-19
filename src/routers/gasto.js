
const express = require("express")
const Gasto = require("./../models/gasto")
const router = express.Router()
const auth = require('./../middlewares/auth')
router.post('/gastos/repeticao', auth, async (req, res) => {
    try {
        const objRequested = req.body
        if (!req.body.qtd)
            return res.status(400).send("Não foi informado o número de repetição qtd.")
        const qtd = Number(objRequested.qtd)
        dt = new Date(objRequested.data)
        const arr = []        
        for ( let i = 1;i <= qtd; i++){
            gasto = new Gasto()
            dt.setMonth(dt.getMonth() + i)    
            gasto.data = dt
            gasto.valor = objRequested.valor
            gasto.descricao = objRequested.descricao
            gasto.tipoGasto = objRequested.tipoGasto
            gasto.usuario = req.usuario._id
            await gasto.save()
            arr.push(gasto._id)
        }
        res.status(201).send(arr)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.post('/gastos', auth, async (req, res) => {
    try {
        const gasto = new Gasto(req.body)
        await gasto.save()
        res.status(201).send(gasto._id)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.get('/gastos', auth, async (req, res)=> {
    const usuario = req.usuario
    try {
        res.send(await usuario.gastos)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)

    }

})
module.exports=router