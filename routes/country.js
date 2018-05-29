'use strict'

//Importamos express
var express = require('express')

//Importamos el controlador
var autoController = require('../controllers/country')

//Instanciamos un objeto Router
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parámtero y se procesa en el método prueba del cntrolador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.get('/country/:id?', autoController.getCountry);
api.get('/countries/', autoController.getCountries);
api.post('/country', autoController.saveCountry);
api.put('/country/:id?', autoController.updateCountry);
api.delete('/country/:id?', autoController.deleteCountry);

//Para utilizarlo en otros ficheros a importar
module.exports = api;