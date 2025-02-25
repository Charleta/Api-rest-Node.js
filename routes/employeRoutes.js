import express from "express";
import jwt from "jsonwebtoken";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();
const clave = "appKey";

function validateToken(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  token = token.split(" ")[1];

  console.log(token);
  jwt.verify(token, clave, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(403).json({ msg: "Token inválido" });
    }
    // Retorno el id del usuario
    req.userId = decoded.userId;
    next();
  });
}

router.post("/", validateToken, employeeController.addEmployee);
router.get("/", validateToken, employeeController.getAllEmployees);
router.get("/:employeeId", validateToken, employeeController.getEmployeeById);
router.put("/:employeeId", validateToken, employeeController.updateEmployee);
router.delete("/:employeeId", validateToken, employeeController.deleteEmployee);

export default router;
