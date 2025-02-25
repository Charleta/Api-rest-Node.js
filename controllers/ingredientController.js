import Ingredient from "../models/ingredientModel.js";

export const addIngredient = async (req, res) => {
  try {
    const { name, category, quantity, unit } = req.body;

    if (!name || !category || !quantity || !unit) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const ingredient = new Ingredient({
      name,
      category,
      quantity,
      unit,
    });

    await ingredient.save();

    res
      .status(201)
      .json({ message: "Ingrediente creado con éxito", ingredient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json({ ingredients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getIngredientById = async (req, res) => {
  try {
    const id = req.params.ingredientId;
    const ingredient = await Ingredient.findById(id);

    if (!ingredient) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún ingrediente con ese ID" });
    }

    res.status(200).json({ ingredient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const id = req.params.ingredientId;
    const { name, category, quantity, unit } = req.body;

    if (!name || !category || !quantity || !unit) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const update = {
      name,
      category,
      quantity,
      unit,
      updatedAt: Date.now(),
    };

    const result = await Ingredient.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún ingrediente con ese ID" });
    }

    res
      .status(200)
      .json({ message: "Ingrediente actualizado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const id = req.params.ingredientId;
    const result = await Ingredient.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún ingrediente con ese ID" });
    }

    res
      .status(200)
      .json({ message: "Ingrediente eliminado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};
