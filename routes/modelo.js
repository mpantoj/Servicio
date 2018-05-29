'use strict'

//Importamos express
var express = require('express')

//Importamos el controlador
var autoController = require('../controllers/modelo')

//Instanciamos un objeto Router
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parámtero y se procesa en el método prueba del cntrolador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.post('/modelo', autoController.saveModelo);
api.get('/modelos/', autoController.getModelos);
api.get('/modelo/:id?', autoController.getModelo);
api.put('/modelo/:id?', autoController.updateModelo);
api.delete('/modelo/:id?', autoController.deleteModelo);

module.exports = api;