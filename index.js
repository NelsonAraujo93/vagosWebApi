'use strict'
var express = require('express');
var mongoose = require('mongoose');
var app = require('./app'); //importo el modulo app
var appHttp = require('./appHttp'); 
var port = 3900;
var pott = 8080;
var fs = require('fs');
var https = require('https');
var http = require('http');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/vagosstudios.com/chain.pem', 'utf8');

const options = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
var server = https.createServer(options, app);

appHttp.all('*', (req, res) => res.redirect(301, 'https://vagosstudios.com:443'));
const httpServer = http.createServer(appHttp);

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vagos-db', { useNewUrlParser: true })
    .then(() => {
        console.log('buenos días');

        //crear servidor para escuchar peticionoes
        server.listen(port, () => {
            console.log("server starting on port : " + port);
        });
        httpServer.listen(pott, () => {
            console.log("server starting on porto : " + pott);
        });
    });
