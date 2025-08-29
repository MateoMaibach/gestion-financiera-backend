// ingresos.service.js
import db from '../models/db.js';

// Obtener todos los ingresos
export const getAllIngresos = async () => {
  const [rows] = await db.query('SELECT * FROM ingresos');
  return rows;
};

// Crear ingreso
export const createIngresoService = async ({ descripcion, monto, fecha, categoria_id }) => {
  const [result] = await db.query(
    'INSERT INTO ingresos (descripcion, monto, fecha, categoria_id) VALUES (?, ?, ?, ?)',
    [descripcion, monto, fecha, categoria_id]
  );
  return { id: result.insertId, descripcion, monto, fecha, categoria_id };
};

// Actualizar ingreso
export const updateIngresoService = async (id, { descripcion, monto, fecha, categoria_id }) => {
  const [result] = await db.query(
    'UPDATE ingresos SET descripcion = ?, monto = ?, fecha = ?, categoria_id = ? WHERE id = ?',
    [descripcion, monto, fecha, categoria_id, id]
  );
  return result.affectedRows;
};

// Eliminar ingreso
export const deleteIngresoService = async (id) => {
  const [result] = await db.query('DELETE FROM ingresos WHERE id = ?', [id]);
  return result.affectedRows;
};
