const express = require('express')
require('./db/dbMongoose')
const app = express()
const port = process.env.PORT || 3004
app.use(express.json())
// app.use((req, res, next)=> {
//     res.status(503).send("Voltaremos em breve")
// })
const tipoGastoRouter = require('./routers/tipogasto')
const usuarioRouter = require('./routers/usuario')
app.use(tipoGastoRouter)
app.use(usuarioRouter)
app.all('*', (req, res) => {
    //console.log(req)
    res.status(404).send('Recurso não encontrado')
})
app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})