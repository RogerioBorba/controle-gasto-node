const express = require('express')
const app = express()
const protocol = process.env.PROTOCOL || 'http'
const port = process.env.PORT || 3001
const protoc_host_baseUrl = protocol + "://" + (process.env.server ||"localhost") + `:${port}`
const  mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rogerioborba:HHughsBMLTfstc4I@cluster0-gaqph.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, 'useCreateIndex': true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log("Connection was successfully created")
  console.log(`On browser: ${protoc_host_baseUrl}/api`)
  app.listen(port,()=>console.log(`Server on port: ${port}`))
});