import MenusModel from "../models/menusModel.js";

export const addMenu = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Nombre no válido" });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: "Descripción no válida" });
    }

    const menu = new MenusModel({
      name,
      description,
    });

    await menu.save();

    res.status(201).json({ message: "Menú creado con éxito", menu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

// Traer todos los menús
export const getAllMenus = async (req, res) => {
  try {
    const menu = await MenusModel.find();
    res.status(200).json({ menu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

// Obtener menú por ID
export const getMenuById = async (req, res) => {
  try {
    const id = req.params.menuId;
    const menu = await MenusModel.findById(id);

    if (!menu) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún menú con ese ID" });
    }

    res.status(200).json({ menu });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

// Actualizar menú
export const updateMenu = async (req, res) => {
  try {
    const id = req.params.menuId;
    const { name, description } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Nombre no válido" });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: "Descripción no válida" });
    }

    const filter = { _id: id };
    const update = { name, description, updatedAt: Date.now() };

    const result = await MenusModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún menú con ese ID" });
    }

    res.status(200).json({ message: "Menú actualizado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

// Eliminar menú
export const deleteMenu = async (req, res) => {
  try {
    const id = req.params.menuId;
    const result = await MenusModel.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún menú con ese ID" });
    }

    res.status(200).json({ message: "Eliminado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};
