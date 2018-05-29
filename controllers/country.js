'use scrict'
var Country = require('../models/country')
var mongoose = require('mongoose')
//Definimos el método a ser consumido
//desde el archivo de rutas

function saveCountry(req, res) {
    //Definimos el objeto que se guardará como documento
    var country = new Country(req.body);

    country.save(function (err, countrySaved) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al guardar el Country. ', error: err });
        } else {
            res.status(200).send({ saved: countrySaved })
        }
    });
};

function getCountries(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Country.find({}).exec(function (err, paises) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener los autos', error: err });
        } else {
            res.status(200).send({ data:paises })
            //res.status(200).send({ message: 'Pude leer los autos'})

        }
    });
}

function getCountry(req, res) {
    //Obtenemos el id que llega como parámetro
    var countryId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Country.findById(countryId, function (err, auto) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener el country', error: err });
            } else {
                if (!auto) {
                    res.status(404).send({ message: 'No existe el country con el id proporcionado.' });
                } else {
                    res.status(200).send({ auto })
                }

            }
        });
    }
}

function updateCountry(req, res) {
    //Obtenemos el id que llega como parámetro
    var countryId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);
    if (!idValido) {
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({ message: 'Id Inválido.' });
    } else {
        //Utilizamos la función findByIdAndupdate, busca un documento por id y lo actualiza
        /*Auto.findByIdAndUpdate(autoId, req.body, {new:true}, function(err, autoUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Auto.',error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un espantoso 404
                if(!autoUpdate){
                    res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                }else{
                //Si se actualiza correctamente buscamos nuevamente en base, ya que el callback nos retorna
                //un objeto pero este no es el actualizado si no el viejo
                Auto.findById(autoId,function(err,autoNuevo){
                    //Buscamos por el ID y retornamos el registro viejo y el nuevo
                    res.status(200).send({viejo:autoUpdate,nuevo:autoNuevo})
                }); 
                }
            }
        });*/
        Country.findByIdAndUpdate(countryId, req.body, { new: true }, function (err, autoUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar el Auto.', error: err });
            } else {
                if (!autoUpdate) {
                    res.status(404).send({ message: 'No existe el auto con el id proporcionado.' });
                } else {
                    res.status(200).send({ data: autoUpdate })
                }
            }
        });
    }
}



function deleteCountry(req, res) {
    //  Obtenemos el id que llega como parámetro
    var countryId = req.params.id;
    //  Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);

    if (!idValido) {
        //Si noes válido mostramos un mensaje de Id Inválido
        res.status(409).send({ message: 'Id Inválido' });
    }
    else {
        Country.findByIdAndRemove(countryId, function (err, auto) {
            if (err) {
                return res.status(500).send(err);
            } else {
                if (!auto) {
                    res.status(404).send({ message: 'No existe el country con el id proporcionado.' });
                } else {
                    //res.status(200).send({data:autoUpdate})
                    res.status(200).send({ message: 'El country se ha borrado exitosamente' })
                }
            }
        });
        //Buscaremos un documento con el Id Proporcionado
        //  Auto.findById(autoId,function(err,auto)
        //  {
        //    if (err){
        //        console.log(err)
        //        res.status(500).send({message:'Error al obtener el auto.',eror:err});
        //    }
        //    else
        //    {
        //        if(!auto)
        //        {
        //            res.status(404).send({message:'No existe el auto con el id proporcionado.'});
        //        }
        //        else 
        //        {
        //            //Eliminamos el auto encontrado
        //            auto.remove(function(err){
        //                if(err){
        //                    res.status(500).send({message:'Error al eliminar el auto.',error:er});
        //                }
        //                else
        //                {
        //                    res.status(200).send({message:'El auto se ha eliminado correctamente'});
        //                }
        //            });
        //        }
        //    }
        // });
    }
}






//Definimos los métodos que pueden ser alcanzables
module.exports = {
    getCountry,
    getCountries,
    saveCountry,
    updateCountry,
    deleteCountry
}