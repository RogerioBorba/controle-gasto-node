const express = require('express')
const TipoGasto = require('./../models/tipogasto')
const router = express.Router()
const auth = require('./../middlewares/auth')
const permission = require('./../middlewares/permission')
router.get('/tipos-de-gasto', async (req, res ) => {
    try {
        const arrTipoGasto = await TipoGasto.find({})
        if(!arrTipoGasto)
            return res.status(404).send('Recurso Tipo de Gasto não encontrado')
        return res.send(arrTipoGasto)
    } catch (error) {
        res.status(500).send('Não foi possível carregar os tipos de gasto')
    }
})
router.get('/tipos-de-gasto/:descricao/subtipos', async (req, res ) => {
    try {
        const umTipoGasto = await TipoGasto.findOne({descricao: req.params.descricao}).populate('subtipos')
        if(!umTipoGasto)
            return res.status(404).send('Recurso Tipo de Gasto não encontrado')
        let subtipos = await umTipoGasto.subtipos
        
        // subtipos = await subtipos.map( async  (tg) => { 
        //     tg.tipoGastoPai = await TipoGasto.findById(tg.tipoGastoPai)
        //     return tg
        // })
        //console.log(subtipos)
        return await res.send(subtipos)
    } catch (error) {
        console.log(error)
        res.status(500).send('Não foi possível carregar os tipos de gasto')
    }
})
router.patch('/tipos-de-gasto/:id', async (req, res ) => {
    const attributesFromRequest = Object.keys(req.body)
    try {
        const tipoGasto = await TipoGasto.findById(req.params.id)
        if(!tipoGasto)
            return res.status(404).send('Recurso Tipo de Gasto não encontrado')
        const isValidAttributes = attributesFromRequest.every(attr => ['descricao', 'tipoGastoPai'].includes(attr))
        if (!isValidAttributes)
            return res.status(400).send('Recurso Tipo de Gasto com attributos incorretos')
        attributesFromRequest.forEach(attr => tipoGasto[attr] = req.body[attr])
        await tipoGasto.save()
        return res.send(tipoGasto)
    } catch (error) {
        res.status(500).send('Não foi possível carregar os tipos de gasto')
    }
})
router.post('/tipos-de-gasto', auth, permission ,async (req, res ) => {
    try {
        //new mongoose.Types.ObjectId()
        if (!req.body.descricao)
            return res.status(400).send("Descrição não foi informada.")
        const tipoGasto = await TipoGasto.saveGiven(req.body.descricao, req.body.tipogastopai)
        return res.status(201).send(tipoGasto)
    } catch (error) {
        console.log(error)
        res.status(500).send('Não foi possível criar o tipo de gasto. ')
    }
})
router.delete('/tipos-de-gasto/:id', async (req, res)=> {
    try {
        const tipogasto = await TipoGasto.findByIdAndDelete({_id: req.params.id})
        if (!tipogasto)    
            return res.status(404).send("Tipo de Gasto não encontrado")
        return res.status(200).send("1")

    } catch (error) {
        console.log(error)
        return res.status(500).send("Não foi possível efetuar a operação.")
    }
    
})
module.exports= router
