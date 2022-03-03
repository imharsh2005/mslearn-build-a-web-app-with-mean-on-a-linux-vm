var mongoose = require('mongoose');
const config = require('../config');

const dbConfig = new config();
const connString = `mongodb://${dbConfig.COSMOS_HOST}:${dbConfig.COSMOS_PORT}/${dbConfig.COSMOS_DBNAME}?ssl=true&replicaSet=globaldb&retrywrites=false`

mongoose.connect(connString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    auth: {
        user: dbConfig.COSMOS_USER,
        password: dbConfig.COSMOS_PASSWORD
    }
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

var contactSchema = mongoose.Schema( {
    name: String,
    cid: {type: String, index: true},
    email: String,
    message: String,
    phone: String
});
var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;