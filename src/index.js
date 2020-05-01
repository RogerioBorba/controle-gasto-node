/*usuario mongodb 
username: rogerioborba
senha: HHughsBMLTfstc4I

Atlas admin
username: rogerioborba17
senha: Mvrwrh4rHClLlFEA
Nodejs
mongodb+srv://<username>:<password>@cluster0-gaqph.mongodb.net/test?retryWrites=true&w=majority

*/


const  mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rogerioborba:HHughsBMLTfstc4I@cluster0-gaqph.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, 'useCreateIndex': true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log("Connection was successfully created")
});