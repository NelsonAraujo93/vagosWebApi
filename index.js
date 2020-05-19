'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //importo el modulo app
var port = 3900;
/*var fs = require('fs');
var https = require('https');

var key = fs.readFileSync('encryption/server.key');
var cert = fs.readFileSync( 'encryption/server.crt' );
var options = {
    key: key,
    cert: cert
  };

var server = https.createServer(options, app);*/

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vagos-db', { useNewUrlParser: true })
    .then(() => {
        console.log('buenos días');

        //crear servidor para escuchar peticionoes
        app.listen(port, () => {
            console.log("server starting on port : " + port)
        });
    });