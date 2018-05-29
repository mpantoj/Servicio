'use scrict'
//Importamos la conexión  a nuestra base de datos mongoose
//y declaramos una instancia de tipo mongoose.Schema.

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CountrySchema = new Schema(
    {
        country:{
            type: String,
            trim: true,
            default: '',
            required: 'Inserta un país por favor',
            index:{
                unique: false,
            }
        },
        continente:{
            type: String,
            required: 'Inserta un continente por favor',
            default: '',
            index:{
                unique: false
            }
        },
        habitantes:{
            type: Number,
            require: 'Iserta un numero de habitantes por favor',
            default: '',
            index: {
                unique: false,
             }
        },
        capital: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una capital por favor',
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
var Country = mongoose.model('Country', CountrySchema);
//podrá ser accedido desde cualquier parte si se importa
module.exports =Country;