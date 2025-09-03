import db from '../models/db.js';

// Obtener todos los egresos
export const getAllEgresos = async () => {
  const [rows] = await db.query(`
    SELECT e.id, e.descripcion, e.monto, e.fecha, e.usuario_id, c.nombre AS categoria
    FROM egresos e
    JOIN categorias c ON e.categoria_id = c.id
    ORDER BY e.fecha ASC
  `);
  return rows;
};

// Crear egreso
export const createEgresoService = async ({ descripcion, monto, fecha, categoria_id, usuario_id }) => {
  const [result] = await db.query(
    'INSERT INTO egresos (descripcion, monto, fecha, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?)',
    [descripcion, monto, fecha, categoria_id, usuario_id]
  );

  return { id: result.insertId, descripcion, monto, fecha, categoria_id, usuario_id };
};

// Actualizar egreso
export const updateEgresoService = async (id, { descripcion, monto, fecha, categoria_id, usuario_id }) => {
  const [result] = await db.query(
    'UPDATE egresos SET descripcion = ?, monto = ?, fecha = ?, categoria_id = ? WHERE id = ? AND usuario_id = ?',
    [descripcion, monto, fecha, categoria_id, id, usuario_id]
  );
  return result;
};

// Eliminar egreso
export const deleteEgresoService = async (id, usuario_id) => {
  const [result] = await db.query(
    'DELETE FROM egresos WHERE id = ? AND usuario_id = ?',
    [id, usuario_id]
  );
  return result;
};
