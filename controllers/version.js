'use strict'

var Version = require('../models/version')
var mongoose = require('mongoose')

function saveVersion(req,res){
    //Definimos el objeto que se guardará como documento
    var version = new Version(req.body);

    //Creamos la fecha
    //var parts = req.body.fechaCreacion.split('-');
    //marca.fechaCreacion = new Date(parts[0], parts[1]-1, parts[2])

    version.save(function(err, versionSaved){
        if (err){
            console.log(err)
            res.status(500).send({message:'Error al guardar la Versión'})
        }else{
            res.status(200).send({saved:versionSaved})
        }
    });
};

function getVersiones(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Version.find({}).exec(function (err, version) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener las versiones', error: err });
        } else {
            res.status(200).send({ version})
        }
    });
}

function getVersion(req, res) {
    //Obtenemos el id que llega como parámetro
    var versionId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Version.findById(versionId, function (err, version) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener la version', error: err });
            } else {
                if (!version) {
                    res.status(404).send({ message: 'No existe la vesion con el id proporcionado.' });
                } else {
                    res.status(200).send({ version })
                }

            }
        });
    }
}

function updateVersion(req, res) {
    //Obtenemos el id que llega como parámetro
    var versionId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);
    if (!idValido) {
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        Version.findByIdAndUpdate(versionId, req.body, { new: true }, function (err, versionUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar la version', error: err });
            } else {
                if (!versionUpdate) {
                    res.status(404).send({ message: 'No existe la version con el id proporcionado.' });
                } else {
                    res.status(200).send({ data: versionUpdate })
                }
            }
        });
    }
}

function deleteVersion(req, res) {
    //  Obtenemos el id que llega como parámetro
    var versionId = req.params.id;
    //  Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(versionId);

    if (!idValido) {
        //Si noes válido mostramos un mensaje de Id Inválido
        res.status(409).send({ message: 'Id Inválido' });
    }
    else {
        Version.findByIdAndRemove(versionId, function (err, version) {
            if (err) {
                return res.status(500).send(err);
            } else {
                if (!version) {
                    res.status(404).send({ message: 'No existe la version con el id proporcionado.' });
                } else {
                    //res.status(200).send({data:autoUpdate})
                    res.status(200).send({ message: 'La version se ha borrado exitosamente' })
                }
            }
        });

    }
}


//Definimos los métodos que pueden ser alcanzables
module.exports = {
    saveVersion,
    getVersion,
    getVersiones,
    updateVersion,
    deleteVersion
}