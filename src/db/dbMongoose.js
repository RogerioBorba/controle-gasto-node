const mongoose = require('mongoose')
const connectionURL = process.env.MONGODBCONNECTION
try {
    mongoose.connect(connectionURL, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false
    })    
} catch (error) {
    console.log(error)
}

