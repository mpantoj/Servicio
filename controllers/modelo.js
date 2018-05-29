'use strict'

var Modelo = require('../models/modelo')
var mongoose = require('mongoose')

function saveModelo(req, res){
    //Definimos el objeto que se guardará como documento
    var modelo = new Modelo(req.body);

    modelo.save(function(err, modeloSaved){
        if(err){
            console.log(err)
            res.status(500).send({ message:'Error al guardar el Modelo', error: err});
        }else{
            res.status(200).send({modeloSaved})
        }
    });
};

function getModelos(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Modelo.find({}).exec(function (err, modelo) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener las marcas', error: err });
        } else {
            res.status(200).send({ modelo })
        }
    });
}

function getModelo(req, res) {
    //Obtenemos el id que llega como parámetro
    var modeloId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Modelo.findById(modeloId, function (err, modelo) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener el modelo, error: err '});
            } else {
                if (!modelo) {
                    res.status(404).send({ message: 'No existe el modelo con el id proporcionado.' });
                } else {
                    res.status(200).send({ modelo })
                }

            }
        });
    }
}


function updateModelo(req, res) {
    //Obtenemos el id que llega como parámetro
    var modeloId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);
    if (!idValido) {
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        Modelo.findByIdAndUpdate(modeloId, req.body, { new: true }, function (err, autoUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar el Modelo.', error: err });
            } else {
                if (!autoUpdate) {
                    res.status(404).send({ message: 'No existe el modelo con el id proporcionado.' });
                } else {
                    res.status(200).send({ data: autoUpdate })
                }
            }
        });
    }
}

function deleteModelo(req, res) {
    //  Obtenemos el id que llega como parámetro
    var modeloId = req.params.id;
    //  Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(modeloId);

    if (!idValido) {
        //Si noes válido mostramos un mensaje de Id Inválido
        res.status(409).send({ message: 'Id Inválido' });
    }
    else {
        Modelo.findByIdAndRemove(modeloId, function (err, modelo) {
            if (err) {
                return res.status(500).send(err);
            } else {
                if (!modelo) {
                    res.status(404).send({ message: 'No existe el modelo con el id proporcionado.' });
                } else {
                    //res.status(200).send({data:autoUpdate})
                    res.status(200).send({ message: 'El modelo se ha borrado exitosamente' })
                }
            }
        });

    }
}


module.exports = {
    saveModelo,
    getModelos,
    getModelo,
    updateModelo,
    deleteModelo
}