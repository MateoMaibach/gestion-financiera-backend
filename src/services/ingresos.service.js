import db from '../models/db.js';

// Obtener todos los ingresos
export const getAllIngresos = async () => {
  const [rows] = await db.query(`
    SELECT i.id, i.descripcion, i.monto, i.fecha, i.usuario_id, c.nombre AS categoria
    FROM ingresos i
    JOIN categorias c ON i.categoria_id = c.id
    ORDER BY i.fecha ASC
  `);
  return rows;
};

// Crear ingreso
export const createIngresoService = async ({ descripcion, monto, fecha, categoria_id, usuario_id }) => {
  const [result] = await db.query(
    'INSERT INTO ingresos (descripcion, monto, fecha, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?)',
    [descripcion, monto, fecha, categoria_id, usuario_id]
  );
  return { id: result.insertId, descripcion, monto, fecha, categoria_id, usuario_id };
};

// Actualizar ingreso
export const updateIngresoService = async (id, { descripcion, monto, fecha, categoria_id, usuario_id }) => {
  const [result] = await db.query(
    'UPDATE ingresos SET descripcion = ?, monto = ?, fecha = ?, categoria_id = ? WHERE id = ? AND usuario_id = ?',
    [descripcion, monto, fecha, categoria_id, id, usuario_id]
  );
  return result.affectedRows;
};

// Eliminar ingreso
export const deleteIngresoService = async (id, usuario_id) => {
  const [result] = await db.query(
    'DELETE FROM ingresos WHERE id = ? AND usuario_id = ?',
    [id, usuario_id]
  );
  return result.affectedRows;
};
