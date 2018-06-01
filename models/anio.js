'use scrict'
//Importamos la conexión  a nuestra base de datos mongoose
//y declaramos una instancia de tipo mongoose.Schema.


var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AutoSchema = new Schema(
    {
        anio:{
            type: Number,
            require: 'Iserta un año por favor',
            default: '',
            index: {
                unique: false,
             }
        }

    },
    {
        timestamps: true
    }
)

//Definiremos que nuestro esquema se podrá llamar Auto
// en ls operaciones de nuestro controlador
var Anio = mongoose.model('Anio', AutoSchema);
//podrá ser accedido desde cualquier parte si se importa
module.exports = Anio;