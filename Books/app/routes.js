var path = require('path');
var Contact = require('./model');
var routes = function(app) {
    app.get('/contact', function(req, res) {
        Contact.find({}, function(err, result) {
            if ( err ) throw err;
            res.json(result);
        });
    });
    app.post('/contact', function(req, res) {
        var contact = new Contact( {
            name:req.body.name,
            cid:req.body.id,
            email:req.body.email,
            message:req.body.message,
            phone:req.body.phone            
        });
        contact.save(function(err, result) {
            if ( err ) throw err;
            res.json( {
                message:"Successfully added contact",
                contact:result
            });
        });
    });
    app.delete("/contact/:id", function(req, res) {
        Contact.findOneAndRemove(req.query, function(err, result) {
            if ( err ) throw err;
            res.json( {
                message: "Successfully deleted the contact!",
                contact: result
            });
        });
    });
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + '/public', 'index.html'));
    });
};
module.exports = routes;