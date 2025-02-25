import Employee from "../models/employeeModel.js";

export const addEmployee = async (req, res) => {
  try {
    const { name, position, department, hireDate, salary, email } = req.body;

    if (!name || name.trim().length === 0 || name.length < 3) {
      return res.status(400).json({ message: "Nombre no válido" });
    }

    if (!position || position.trim().length === 0 || position.length < 3) {
      return res.status(400).json({ message: "Posición no válida" });
    }

    if (!department || !["Cocina", "Atencion"].includes(department)) {
      return res.status(400).json({ message: "Departamento no válido" });
    }

    const employee = new Employee({
      name,
      position,
      department,
      hireDate,
      salary,
      email,
    });

    await employee.save();

    res.status(201).json({ message: "Empleado creado con éxito", employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.employeeId;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún empleado con ese ID" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const id = req.params.employeeId;
    const { name, position, department, hireDate, salary, email } = req.body;

    const update = {
      name,
      position,
      department,
      hireDate,
      salary,
      email,
      updatedAt: Date.now(),
    };

    const result = await Employee.findByIdAndUpdate(id, update, { new: true });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún empleado con ese ID" });
    }

    res.status(200).json({ message: "Empleado actualizado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.employeeId;
    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún empleado con ese ID" });
    }

    res.status(200).json({ message: "Empleado eliminado con éxito", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
};
