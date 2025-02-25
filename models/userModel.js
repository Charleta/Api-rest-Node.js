import mongoose from 'mongoose';
const Schema = mongoose.Schema;


//colocar fecah de creacion y actualizacion
//se crea el esquena dek usuario con sus tipos y requerimientos

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});


// se asigna la funcion de model de mongoose, la cual recibe dos parametros, 
// el nombre del modelo que seria el de la base de datos y el esquema de como se armo
// que seria el que esta arriba
// El nombre del primer parametro lo convierte en minuscula y plural de forma automatica, para tener en cuenta
const User = mongoose.model( 'User', userSchema );

export default User;
