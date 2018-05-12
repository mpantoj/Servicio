//Importamos body-parser y express
var bodyParser = require('body-parser')
var express = require('express')

//Declaramos la variable app como instancia de express
var app = express()

//Importamos las rutas del recruso para autos
var api = require('./routes/auto')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//URL de la API
app.use('/api',api);

//Para utilizarlo en otros ficheros, lo estmos exportando
module.exports = app;
