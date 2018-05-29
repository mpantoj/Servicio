//Importamos body-parser y express
var bodyParser = require('body-parser')
var express = require('express')

//Declaramos la variable app como instancia de express
var app = express()

//Importamos las rutas del recruso para autos
var auto = require('./routes/auto')
var country = require('./routes/country')
var marca = require('./routes/marca')
var modelo = require('./routes/modelo')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function(req,res,next){
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Request-Width,Content-Type,Accept, Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,POST,PUT,DELETE');
    next();
})

//URL de la API
app.use('/api',auto),
app.use('/api',country),
app.use('/api',marca),
app.use('/api',modelo)

//Para utilizarlo en otros ficheros, lo estmos exportando
module.exports = app;
