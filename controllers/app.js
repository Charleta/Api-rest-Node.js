const express = require ('express');
const routerApi = require('./routes');
const dataBase = require ('./dataBase');
const app = express();
const port = 2023;

app.use(express.json());

dataBase.once('error', () => console.log('Error al conectar a la DB'));
dataBase.once('open', () => console.log('Conectado a la DB'));



// app.get ('/', (req, res) =>{
//     res.status(200).json({
//         message: 'Tp api rest'
//     });
// })




routerApi (app);

app.listen (port, () => {
    console.log(`Servidor de puerto numero ${port}`)

});

