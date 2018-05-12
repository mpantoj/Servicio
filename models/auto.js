'use scrict'
//Importamos la conexión  a nuestra base de datos mongoose
//y declaramos una instancia de tipo mongoose.Schema.

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AutoSchema = new Schema(
    {
        marca:{
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una marca por favor',
            index:{
                unique: false,
            }
        },
        modelo:{
            type: String,
            required: 'Inserta un modelo por favor',
            default: '',
            index:{
                unique: false
            }
        },
        anio:{
            type: Number,
            require: 'Iserta un año por favor',
            default: '',
            index: {
                unique: false,
             }
        },
        version: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una version por favor',
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
var Auto = mongoose.model('Auto', AutoSchema);
//podrá ser accedido desde cualquier parte si se importa
module.exports = Auto;