import express from "express";
import jwt from "jsonwebtoken";
import * as ingredientController from "../controllers/ingredientController.js";

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

router.post("/", validateToken, ingredientController.addIngredient);
router.get("/", ingredientController.getAllIngredients);
router.get("/:ingredientId", ingredientController.getIngredientById);
router.put(
  "/:ingredientId",
  validateToken,
  ingredientController.updateIngredient
);
router.delete(
  "/:ingredientId",
  validateToken,
  ingredientController.deleteIngredient
);

export default router;
