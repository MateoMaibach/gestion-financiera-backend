import db from '../models/db.js';

// Obtener saldo por categoría
export const getSaldoCategorias = async () => {
  const [rows] = await db.query(`
    SELECT 
      c.nombre AS categoria,
      COALESCE(SUM(i.monto), 0) - COALESCE(SUM(e.monto), 0) AS saldo
    FROM categorias c
    LEFT JOIN ingresos i ON c.id = i.categoria_id
    LEFT JOIN egresos e ON c.id = e.categoria_id
    GROUP BY c.id
  `);
  return rows;
};

// Obtener movimientos por categoría
export const getMovimientosPorCategoriaService = async (categoriaId) => {
  const [ingresos] = await db.query(
    'SELECT id, descripcion, monto, fecha, creado_en FROM ingresos WHERE categoria_id = ?',
    [categoriaId]
  );

  const [egresos] = await db.query(
    'SELECT id, descripcion, monto, fecha, creado_en FROM egresos WHERE categoria_id = ?',
    [categoriaId]
  );

  return { ingresos, egresos };
};

// Obtener todos los movimientos
export const getTodosMovimientosService = async () => {
  const [ingresos] = await db.query(
    `SELECT i.id, i.descripcion, i.monto, i.fecha, c.nombre AS categoria, 'ingreso' AS tipo
     FROM ingresos i
     JOIN categorias c ON i.categoria_id = c.id`
  );

  const [egresos] = await db.query(
    `SELECT e.id, e.descripcion, e.monto, e.fecha, c.nombre AS categoria, 'egreso' AS tipo
     FROM egresos e
     JOIN categorias c ON e.categoria_id = c.id`
  );

  // Combinar y ordenar por fecha
  return [...ingresos, ...egresos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
};
