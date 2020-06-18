const  express = require('express')
const app = express()
const port = 3005
process.env.JWTSECRET="meusegredo"
app.use(express.json())

require('./db/dbMongoose')
const usuarioRouter = require('./routers/usuario')
app.use(usuarioRouter)
app.listen(port, ()=> {
    console.log(`Executando na porta: ${port}`)
})
