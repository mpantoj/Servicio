'use strict'

//Importamos express
var express = require('express')

//Importamos el controlador
var autoController = require('../controllers/anio')

//Instanciamos un objeto Router
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parámtero y se procesa en el método prueba del cntrolador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.get('/anio/:id?', autoController.getAnio);
api.post('/anio', autoController.saveAnio);
api.get('/anios/', autoController.getAnios);
api.put('/anio/:id?', autoController.updateAnio);
api.delete('/anio/:id?', autoController.deleteAnio);

//Para utilizarlo en otros ficheros a importar
module.exports = api;