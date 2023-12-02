const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const jwt = require ('jsonwebtoken');
const clave = 'appKey';

function validateToken( req, res, next ) {
    
    let token = req.headers.authorization;

    
    

    if (!token){
        return res.status(401).json({message: 'Acceso no autorizado'});
    }
        
    token = token.split(' ')[1];
    

    console.log( token);
    jwt.verify(token, clave, (error, decoded) => {

        if( error) {
            console.log(error.JsonWebTokenError);
            return res.status(403).json({ msg: 'Token invalido'})
        }
        // Retorno el id del usuario
        req.userId = decoded.userId;
        next();
    })
    
}


router.post('/', validateToken,employeeController.addEmployee);
router.get('/', validateToken, employeeController.getAllEmployees);
router.get('/:employeId', validateToken, employeeController.getEmployeeById);
router.put('/:employeId', validateToken, employeeController.updateEmployee);
router.delete('/:employeId', validateToken, employeeController.deleteEmployee);




module.exports = router;