'use strict'

//Importamos app.js
var app = require('./app');
var database = require('./database');

//Puerto de variable de entorno de producción o uno especificado
var port = process.env.PORT || 7070
app.listen(port, function() {
    console.log('Esto es un ejemplo de API Puerto' + port)
});