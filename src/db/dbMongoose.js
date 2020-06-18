const mongoose = require('mongoose')
// const connectionURL = process.env.MONGODBCONNECTION
// const connectionURL = "mongodb+srv://rogerioborba:HHughsBMLTfstc4I@cluster0-gaqph.mongodb.net/controle-adesao?w=majority&retryWrites=true"
// mongoose.connect(connectionURL, { 
//     useUnifiedTopology: true, 
//     useNewUrlParser: true, 
//     useCreateIndex: true,
//     useFindAndModify: false
// })
mongoose.connect('mongodb://localhost/controle-adesao', { useNewUrlParser: true, useUnifiedTopology: true });