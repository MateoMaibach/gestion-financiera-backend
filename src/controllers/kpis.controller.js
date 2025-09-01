import {
  getSaldoCategorias,
  getMovimientosPorCategoriaService,
  getTodosMovimientosService
} from '../services/kpis.service.js';

// KPI: saldo por categoría
export const getKpisCategorias = async (req, res) => {
  try {
    const rows = await getSaldoCategorias();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener KPIs por categoría", error: error.message });
  }
};

// Detalle de movimientos por categoría
export const getMovimientosPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    const data = await getMovimientosPorCategoriaService(categoriaId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener movimientos por categoría", error: error.message });
  }
};

// Panel general de todos los movimientos
export const getTodosMovimientos = async (req, res) => {
  try {
    const movimientos = await getTodosMovimientosService();
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener movimientos generales", error: error.message });
  }
};
