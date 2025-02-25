// importamos todas los archivos de las rutas con su configuracion de rutas

import usersRoutes from "./usersRoutes.js";
import menusRoutes from "./menusRoutes.js";
import coursesRoutes from "./courseRoutes.js";
import employeeRoutes from "./employeRoutes.js";
import ingredientRoutes from "./ingredientRoutes.js";

//aca se definen las rutas para cada uno de los archivos de las rutas
//para poder exportarlas y usarlas en el archivo app.js

const routerApi = (app) => {
  app.use("/api/users", usersRoutes);
  app.use("/api/menus", menusRoutes);
  app.use("/api/courses", coursesRoutes);
  app.use("/api/employes", employeeRoutes);
  app.use("/api/ingredients", ingredientRoutes);
};

export default routerApi;
