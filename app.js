import express from 'express';
import routerApi from './routes/index.js';
import conectionDB from './dataBase.js';



const app = express();
const port = 2023;


app.use(express.json()); // aca se define que se va a recibir y enviar en formato json la informacion

await conectionDB(); // aca se llama a la funcion de conexion a la base de datos

routerApi(app);

//para que se vea en la pantalla del navegador se le da una respuesta
//a la peticion de la raiz
// app.get("/", (req, res) => {
//   res.send("¡Hola Mundo!");
// });

app.listen (port, () => {
    console.log(`Servidor de puerto numero ${port}`)

});

