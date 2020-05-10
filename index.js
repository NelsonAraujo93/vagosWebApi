'use strict'

var mongoose = require('mongoose');
var app = require('./app'); //importo el modulo app
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/vagos-db', { useNewUrlParser: true })
    .then(() => {
        console.log('buenos días');

        //crear servidor para escuchar peticionoes
        app.listen(port, () => {
            console.log('escuchando peticiones');
        })
    });