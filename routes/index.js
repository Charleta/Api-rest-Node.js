


const usersRoutes = require('./usersRoutes.js');
const menusRoutes = require('./menusRoutes.js');
const coursesRoutes = require('./courseRoutes.js');
const employeeRoutes = require('./employeRoutes.js');
const ingredientRoutes = require('./ingredientRoutes.js');


const routerApi = function (app) {
     app.use('/api/users', usersRoutes);
     app.use('/api/menus', menusRoutes);
     app.use('/api/courses', coursesRoutes);
     app.use('/api/employes', employeeRoutes);
     app.use('/api/ingredients', ingredientRoutes);


}

module.exports = routerApi;