import express from 'express';

import * as userController from "../controllers/userController.js";
import jwt from'jsonwebtoken';


const clave = 'appKey'; 
const router = express.Router();


function validateToken( req, res, next ) {
    let token = req.headers.authorization;

    
    

    if (!token){
        return res.status(401).json({message: 'Acceso no autorizado'});
    }
        
    token = token.split(' ')[1];
    

    console.log( token);
    
    jwt.verify(token, clave, (error, decoded) => {

        if( error) {
            console.log(token);
            return res.status(403).json({ msg: 'Token invalido'})
        }
        // Retorno el id del usuario
        req.userId = decoded.userId;
        next();
    })
    
}


router.post('/', userController.addUser);
router.post('/auth', userController.auth);
router.get('/', validateToken, userController.getAllUsers);
router.get('/:userId', validateToken, userController.getUserById);
router.put('/:userId', validateToken, userController.updateUser);
router.delete('/:userId', validateToken, userController.deleteUser);




export default router;