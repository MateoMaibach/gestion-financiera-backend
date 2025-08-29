// ingresos.controller.js
import { 
  getAllIngresos,
  createIngresoService,
  updateIngresoService,
  deleteIngresoService
} from '../services/ingresos.service.js';

// Obtener todos los ingresos
export const getIngresos = async (req, res) => {
  try {
    const rows = await getAllIngresos();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ingresos" });
  }
};

// Crear ingreso
export const createIngreso = async (req, res) => {
  try {
    const newIngreso = await createIngresoService(req.body);
    res.status(201).json(newIngreso);
  } catch (error) {
    res.status(500).json({ message: "Error al crear ingreso" });
  }
};

// Actualizar ingreso
export const updateIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await updateIngresoService(id, req.body);

    if (affectedRows === 0) return res.status(404).json({ message: "Ingreso no encontrado" });

    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ingreso" });
  }
};

// Eliminar ingreso
export const deleteIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await deleteIngresoService(id);

    if (affectedRows === 0) return res.status(404).json({ message: "Ingreso no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ingreso" });
  }
};
