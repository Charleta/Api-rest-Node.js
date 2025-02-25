import express from "express";
import jwt from "jsonwebtoken";
import * as menuController from "../controllers/menuController.js";

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
    req.userId = decoded.userId;
    next();
  });
}

router.post("/", validateToken, menuController.addMenu);
router.get("/", validateToken, menuController.getAllMenus);
router.get("/:menuId", validateToken, menuController.getMenuById);
router.put("/:menuId", validateToken, menuController.updateMenu);
router.delete("/:menuId", validateToken, menuController.deleteMenu);

export default router;
