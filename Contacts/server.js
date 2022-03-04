var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const config = require('./config');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
require('./app/routes')(app);
app.set('port', 80);
app.listen(app.get('port'), function() {
    console.log('Server up at http://localhost:' + app.get('port'));
});