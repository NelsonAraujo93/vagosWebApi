'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //importo el modulo app
var port = 3900;
var fs = require('fs');
var https = require('https');


const privateKey = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/chain.pem', 'utf8');

const options = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
var server = https.createServer(options, app);


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vagos-db', { useNewUrlParser: true })
    .then(() => {
        console.log('buenos días');

        //crear servidor para escuchar peticionoes
        server.listen(port, () => {
            console.log("server starting on port : " + port)
        });
    });