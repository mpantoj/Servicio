'use strict'

var Anio = require('../models/anio')
var mongoose = require('mongoose')

function saveAnio(req,res){
    //Definimos el objeto que se guardará como documento
    var anio = new Anio(req.body);

    //Creamos la fecha
    //var parts = req.body.fechaCreacion.split('-');
    //marca.fechaCreacion = new Date(parts[0], parts[1]-1, parts[2])

    anio.save(function(err, anioSaved){
        if (err){
            console.log(err)
            res.status(500).send({message:'Error al guardar el Año '})
        }else{
            res.status(200).send({saved:anioSaved})
        }
    });
};

function getAnios(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Anio.find({}).exec(function (err, anios) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener los años', error: err });
        } else {
            res.status(200).send({ anios })
        }
    });
}

function getAnio(req, res) {
    //Obtenemos el id que llega como parámetro
    var anioId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Anio.findById(anioId, function (err, anio) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener el año', error: err });
            } else {
                if (!anio) {
                    res.status(404).send({ message: 'No existe el año con el id proporcionado.' });
                } else {
                    res.status(200).send({ anio })
                }

            }
        });
    }
}

function updateAnio(req, res) {
    //Obtenemos el id que llega como parámetro
    var anioId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);
    if (!idValido) {
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        Anio.findByIdAndUpdate(anioId, req.body, { new: true }, function (err, anioUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar el Año', error: err });
            } else {
                if (!anioUpdate) {
                    res.status(404).send({ message: 'No existe el año con el id proporcionado.' });
                } else {
                    res.status(200).send({ data: anioUpdate })
                }
            }
        });
    }
}

function deleteAnio(req, res) {
    //  Obtenemos el id que llega como parámetro
    var anioId = req.params.id;
    //  Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(anioId);

    if (!idValido) {
        //Si noes válido mostramos un mensaje de Id Inválido
        res.status(409).send({ message: 'Id Inválido' });
    }
    else {
        Anio.findByIdAndRemove(anioId, function (err, anio) {
            if (err) {
                return res.status(500).send(err);
            } else {
                if (!anio) {
                    res.status(404).send({ message: 'No existe el año con el id proporcionado.' });
                } else {
                    //res.status(200).send({data:autoUpdate})
                    res.status(200).send({ message: 'El año se ha borrado exitosamente' })
                }
            }
        });

    }
}


//Definimos los métodos que pueden ser alcanzables
module.exports = {
    saveAnio,
    getAnio,
    getAnios,
    updateAnio,
    deleteAnio
}