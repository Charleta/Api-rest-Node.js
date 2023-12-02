const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
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


router.post('/',validateToken, courseController.addCourse);
router.get('/', validateToken, courseController.getAllCourses);
router.get('/:courseId',validateToken,  courseController.getCourseById);
router.put('/:courseId', validateToken, courseController.updateCourse);
router.delete('/:coursed',validateToken,  courseController.deleteCourse);




module.exports = router;