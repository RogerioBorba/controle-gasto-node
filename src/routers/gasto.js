
const express = require("express")
const Gasto = require("./../models/gasto")
const router = express.Router()
const auth = require('./../middlewares/auth')

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