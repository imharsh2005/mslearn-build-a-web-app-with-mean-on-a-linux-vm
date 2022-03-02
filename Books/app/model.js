var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/Books';
const config = require('../config');

const dbConfig = new config();
const connString = `mongodb://${dbConfig.COSMOS_HOST}:${dbConfig.COSMOS_PORT}/${dbConfig.COSMOS_DBNAME}?ssl=true&replicaSet=globaldb&retrywrites=false`

// var DB_CONN='mongodb+srv://mymongodbproj:K1KXgMjpYyXlqXaJK2znw4EnHCcTYIC5wWzjBNHhUn5jTpwDDB7V4I7Rl0xeU6WKhbt3jVme6MH3j3KWb1sBwQ==@mymongodbproj.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mymongodbproj@';

// var DB_USER ="mymongodbproj";
// var DB_PW = "K1KXgMjpYyXlqXaJK2znw4EnHCcTYIC5wWzjBNHhUn5jTpwDDB7V4I7Rl0xeU6WKhbt3jVme6MH3j3KWb1sBwQ==";

//const {DB_CONN,DB_PW,DB_USER} = process.env;

// mongoose.connect(dbHost, { useNewUrlParser: true } );
// mongoose.connection;
// mongoose.set('debug', true);

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

// mongoose
//     .connect(
//         DB_CONN, 
//         {auth: {username: DB_USER, password:DB_PW}, useNewUrlParser:true},
//     )
//     .then(()=> console.log('Sucsessfully connected to CosmosDB!!!'))
//     .catch(console.error);

// mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
//    auth: {
//      username: process.env.COSMOSDB_USER,
//      password: process.env.COSMOSDB_PASSWORD
//    },
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  retryWrites: false
//  })
//  .then(() => console.log('Connection to CosmosDB successful'))
//  .catch((err) => console.error(err));

var bookSchema = mongoose.Schema( {
    name: String,
    isbn: {type: String, index: true},
    author: String,
    pages: Number
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;