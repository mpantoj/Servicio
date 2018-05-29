'use strict'

//Importamos express
var express = require('express')

//Importamos el controlador
var autoController = require('../controllers/marca')

//Instanciamos un objeto Router
var api = express.Router();

//Definimos el recurso GET con url : /api/auto/:id? , recibe
//un parámtero y se procesa en el método prueba del cntrolador
//autoController
//api.get('/auto/:id?',autoController.prueba)
api.get('/marca/:id?', autoController.getMarca);
api.post('/marca', autoController.saveMarca);
api.get('/marcas/', autoController.getMarcas);
api.put('/marca/:id?', autoController.updateMarca);
api.delete('/marca/:id?', autoController.deleteMarca);

//Para utilizarlo en otros ficheros a importar
module.exports = api;