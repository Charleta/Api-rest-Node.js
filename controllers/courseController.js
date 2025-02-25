import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";

export const addCourse = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    if (!name || name.trim().length === 0 || name.length < 3) {
      return res.status(400).json({ message: "Nombre no válido" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún usuario con ese id" });
    }

    const course = new courseModel({
      name,
      description,
      userId,
    });

    await course.save();

    res.status(201).json({ message: "Curso creado con éxito", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.courseId;
    const course = await courseModel.findById(id);

    if (!course) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún curso con ese id" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const id = req.params.courseId;
    const { name, description, userId, status } = req.body;

    if (!name || name.trim().length === 0 || name.length < 3) {
      return res.status(400).json({ message: "Nombre no válido" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún usuario con ese id" });
    }

    if (
      status &&
      status !== "En armado" &&
      status !== "Atrasado" &&
      status !== "Terminado"
    ) {
      return res.status(400).json({ message: "Estado no válido" });
    }

    const update = {
      name,
      description,
      userId,
      status,
      updatedAt: Date.now(),
    };

    const result = await courseModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún curso con ese id" });
    }

    res.status(200).json({ message: "Curso actualizado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.courseId;
    const result = await courseModel.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún curso con ese id" });
    }

    res.status(200).json({ message: "Curso eliminado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};
