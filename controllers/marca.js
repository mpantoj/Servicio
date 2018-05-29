'use strict'

var Marca = require('../models/marca')
var mongoose = require('mongoose')

function saveMarca(req,res){
    //Definimos el objeto que se guardará como documento
    var marca = new Marca(req.body);

    //Creamos la fecha
    var parts = req.body.fechaCreacion.split('-');
    marca.fechaCreacion = new Date(parts[0], parts[1]-1, parts[2])

    marca.save(function(err, marcaSaved){
        if (err){
            console.log(err)
            res.status(500).send({message:'Error al guardar la Marca '})
        }else{
            res.status(200).send({saved:marcaSaved})
        }
    });
};

function getMarcas(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Marca.find({}).exec(function (err, marca) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener las marcas', error: err });
        } else {
            res.status(200).send({ marca })
        }
    });
}

function getMarca(req, res) {
    //Obtenemos el id que llega como parámetro
    var marcaId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Marca.findById(marcaId, function (err, marca) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener la marca', error: err });
            } else {
                if (!marca) {
                    res.status(404).send({ message: 'No existe la marca con el id proporcionado.' });
                } else {
                    res.status(200).send({ marca })
                }

            }
        });
    }
}

function updateMarca(req, res) {
    //Obtenemos el id que llega como parámetro
    var marcaId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);
    if (!idValido) {
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        Marca.findByIdAndUpdate(marcaId, req.body, { new: true }, function (err, autoUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar la Marca.', error: err });
            } else {
                if (!autoUpdate) {
                    res.status(404).send({ message: 'No existe la marca con el id proporcionado.' });
                } else {
                    res.status(200).send({ data: autoUpdate })
                }
            }
        });
    }
}

function deleteMarca(req, res) {
    //  Obtenemos el id que llega como parámetro
    var marcaId = req.params.id;
    //  Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(marcaId);

    if (!idValido) {
        //Si noes válido mostramos un mensaje de Id Inválido
        res.status(409).send({ message: 'Id Inválido' });
    }
    else {
        Marca.findByIdAndRemove(marcaId, function (err, marca) {
            if (err) {
                return res.status(500).send(err);
            } else {
                if (!marca) {
                    res.status(404).send({ message: 'No existe la marca con el id proporcionado.' });
                } else {
                    //res.status(200).send({data:autoUpdate})
                    res.status(200).send({ message: 'La marca se ha borrado exitosamente' })
                }
            }
        });

    }
}


//Definimos los métodos que pueden ser alcanzables
module.exports = {
    saveMarca,
    getMarcas,
    getMarca,
    updateMarca,
    deleteMarca
}