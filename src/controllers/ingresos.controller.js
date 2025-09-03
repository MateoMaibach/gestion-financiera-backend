import { 
  getAllIngresos,
  createIngresoService,
  updateIngresoService,
  deleteIngresoService
} from '../services/ingresos.service.js';

// Obtener todos los ingresos del usuario autenticado
export const getIngresos = async (req, res) => {
  try {
    const usuario_id = req.user.id; // ✅ Solo ingresos del usuario logueado
    const rows = await getAllIngresos(usuario_id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ingresos" });
  }
};

// Crear ingreso
export const createIngreso = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const newIngreso = await createIngresoService({ ...req.body, usuario_id });
    res.status(201).json(newIngreso);
  } catch (error) {
    res.status(500).json({ message: "Error al crear ingreso" });
  }
};

// Actualizar ingreso
export const updateIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const affectedRows = await updateIngresoService(id, req.body, usuario_id);

    if (affectedRows === 0) return res.status(404).json({ message: "Ingreso no encontrado o no autorizado" });

    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar ingreso" });
  }
};

// Eliminar ingreso
export const deleteIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const affectedRows = await deleteIngresoService(id, usuario_id);

    if (affectedRows === 0) return res.status(404).json({ message: "Ingreso no encontrado o no autorizado" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ingreso" });
  }
};
