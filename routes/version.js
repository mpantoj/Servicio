'use strict'

//Importamos express
var express = require('express')

//Importamos el controlador
var versionController = require('../controllers/version')

//Instanciamos un objeto Router
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parámtero y se procesa en el método prueba del cntrolador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.get('/version/:id?', versionController.getVersion);
api.post('/version', versionController.saveVersion);
api.get('/versiones/', versionController.getVersiones);
api.put('/version/:id?', versionController.updateVersion);
api.delete('/version/:id?', versionController.deleteVersion);

//Para utilizarlo en otros ficheros a importar
module.exports = api;