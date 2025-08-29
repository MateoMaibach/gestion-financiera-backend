import {
  getAllEgresos,
  createEgresoService,
  updateEgresoService,
  deleteEgresoService
} from '../services/egresos.service.js';

// Obtener todos los egresos
export const getEgresos = async (req, res) => {
  try {
    const egresos = await getAllEgresos();
    res.json(egresos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener egresos" });
  }
};

// Crear egreso
export const createEgreso = async (req, res) => {
  try {
    const { descripcion, monto, fecha, categoria_id } = req.body;
    const newEgreso = await createEgresoService(descripcion, monto, fecha, categoria_id);
    res.status(201).json(newEgreso);
  } catch (error) {
    res.status(500).json({ message: "Error al crear egreso" });
  }
};

// Actualizar egreso
export const updateEgreso = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, monto, fecha, categoria_id } = req.body;
    const result = await updateEgresoService(id, descripcion, monto, fecha, categoria_id);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Egreso no encontrado" });

    res.json({ id, descripcion, monto, fecha, categoria_id });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar egreso" });
  }
};

// Eliminar egreso
export const deleteEgreso = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteEgresoService(id);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Egreso no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar egreso" });
  }
};
