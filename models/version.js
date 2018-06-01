'use scrict'
//Importamos la conexión  a nuestra base de datos mongoose
//y declaramos una instancia de tipo mongoose.Schema.


var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var VersionSchema = new Schema(
    {
        version:{
            type: String,
            trim: true,
            require: 'Iserta una version por favor',
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
var Version = mongoose.model('Version', VersionSchema);
//podrá ser accedido desde cualquier parte si se importa
module.exports = Version;