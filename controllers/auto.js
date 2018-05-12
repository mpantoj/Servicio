'use scrict'
var Auto = require('../models/auto')
var mongoose = require('mongoose')
//Definimos el método a ser consumido
//desde el archivo de rutas
function prueba(req, res) {
    if (req.params.id) {
        var id = req.params.id
    } else {
        var id = " SIN ID"
    }
    res.status(200).send(
        {
            message: "Este es el id " + id
        }
    )
}

function getAuto(req, res) {
    var autoId = req.params.id;
    res.status(200).send({ metodo: "getAutos" })
}

function getAutos(req, res) {
    console.log("Entre")
    res.status(200).send({ metodo: "getAutos" })
}

function saveAuto(req, res) {
    var params = req.body;
    res.status(200).send({ metodo: "saveAuto", auto: params })
}

function updateAuto(req, res) {
    var params = req.body;
    res.status(200).send({ metodo: "updateAuto", auto: params })
}

function deleteAuto(req, res) {
    var params = req.body;
    res.status(200).send({ metodo: "deleteAuto", auto: params })
}

function saveAuto(req, res) {
    //Definimos el objeto que se guardará como documento
    var auto = new Auto(req.body);

    auto.save(function (err, autoSaved) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al guardar el Auto.', error: err });
        } else {
            res.status(200).send({ saved: autoSaved })
        }
    });
};

function getAutos(req, res) {
    //Auto.find{}, function(arr,autos){
    //Para ordenar de manera descendente agregar -anio
    Auto.find({}).sort('anio').exec(function (err, autos) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al obtener los autos', error: err });
        } else {
            res.status(200).send({ autos })
        }
    });
}

function getAuto(req, res) {
    //Obtenemos el id que llega como parámetro
    var autoId = req.params.id;
    //Verificasmo si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if (!idValido) {
        //Si no es valido mostramos un mensaje de Id inválido
        res.stauts(409).send({ message: 'Id Inválido.' });
    } else {
        //Buscaremos un documento por el Id Proporcionado
        Auto.findById(autoId, function(err, auto){
            if(err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener el auto', error: err });
            }else{
                if(!auto) {
                    res.status(404).send({ message: 'No existe el auto con el id proporcionado.' });
                }else{
                    res.status(200).send({ auto })
                }

            }
        });
    }
}

function updateAuto(req, res) {
    //Obtenemos el id que llega como parámetro
    var autoId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es válido mostrarnos un mensaje de Id inválido
        res.status(409).send({message:'Id Inválido.'});
    }else{
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
        Auto.findByIdAndUpdate(autoId, req.body, {new:true}, function(err, autoUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Auto.',error:err});
            }else{
                if(!autoUpdate){
                    res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                }else{
                    res.status(200).send({data:autoUpdate})
                }
            }
        });
    }
}

function deleteAuto(req,res){
    //Obtenemos el id que llega como parámetro
    var autoId = req.params.id;
    //Verificamos si el parámetro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido)
      {
          //Si noes válido mostramos un mensaje de Id Inválido
          res.status(409).send({message:'Id Inválido'});
      }
    else
      {
          //Buscaremos un documento con el Id Proporcionado
          Auto.findById(autoId,function(err,auto)
            {
                if (err){
                    console.log(err)
                    res.status(500).send({message:'Error al obtener el auto.',eror:err});
                }
                else
                {
                    if(!auto)
                    {
                        res.status(404).send({message:'No existe el auto con el id proporcionado.'});
                    }
                    else 
                    {
                        //Eliminamos el auto encontrado
                        auto.remove(function(err){
                            if(err){
                                res.status(500).send({message:'Error al eliminar el auto.',error:er});
                            }
                            else
                            {
                                res.status(200).send({message:'El auto se ha eliminado correctamente'});
                            }
                        });
                    }
                }
            });
      }
}




//Definimos los métodos que pueden ser alcanzables
module.exports = {
    prueba,
    getAuto,
    getAutos,
    saveAuto,
    updateAuto,
    deleteAuto
}

