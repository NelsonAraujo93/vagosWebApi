'use strict';

//cargar modulos de node
var express = require('express');
var bodyParser = require('body-parser');

var appHttp = express();

//ejecutar express

//cargar las rutas
var adminRoutes = require('./routes/admin');

//middlewares algo que se ejecuta antes de las rutas o las url
appHttp.use(bodyParser.urlencoded({ extended: false }));
appHttp.use(bodyParser.json());
//CORS para permitir peticiones desde el front

appHttp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', express.static('VagosApi',{redirect:false}));
app.use('/vagos', adminRoutes);

app.get('*', function(req,res,next){
    res.sendFile(path.resolve('VagosApi/index.html'));
});

module.exports = appHttp;