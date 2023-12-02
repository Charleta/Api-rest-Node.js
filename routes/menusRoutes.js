const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
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


router.post('/',validateToken, menuController.addmenu);
router.get('/',validateToken,  menuController.getAllMenus);
router.get('/:menuId',validateToken,  menuController.getMenusById);
router.put('/:menuId',validateToken,  menuController.updateMenu);
router.delete('/:menuId', validateToken, menuController.deleteMenu);




module.exports = router;