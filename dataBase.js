import { mongoose } from 'mongoose'; // importamos mongoose

//Aca creamos uan funcion asicrona para conectarnos a la base de datos
//de mongoDB, para poder exportarlo


const conectionDB = async () =>{
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/tp1-hibridas');
        console.log('Conectado a la base de datos');

    } catch (error){

        console.log('Error al conectar a la base de datos', error);
    }
}





export default conectionDB; // exportamos por default la funcion de conexion a la base de datos
