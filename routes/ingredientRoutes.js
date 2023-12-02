const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
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
        req.userId = decoded.userId;
        next();
    })
    
}


router.post('/',validateToken, ingredientController.addIngredient);
router.get('/', ingredientController.getAllIngredients);
router.get('/:ingredientId', ingredientController.getIngredientById);
router.put('/:ingredientId',validateToken,  ingredientController.updateIngredient);
router.delete('/:ingredientId', validateToken, ingredientController.deleteIngredient);




module.exports = router;