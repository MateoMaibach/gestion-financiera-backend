import db from '../models/db.js';

// Obtener todos los egresos
export const getAllEgresos = async () => {
  const [rows] = await db.query('SELECT * FROM egresos');
  return rows;
};

// Crear egreso
export const createEgresoService = async (descripcion, monto, fecha, categoria_id) => {
  const [result] = await db.query(
    'INSERT INTO egresos (descripcion, monto, fecha, categoria_id) VALUES (?, ?, ?, ?)',
    [descripcion, monto, fecha, categoria_id]
  );
  return { id: result.insertId, descripcion, monto, fecha, categoria_id };
};

// Actualizar egreso
export const updateEgresoService = async (id, descripcion, monto, fecha, categoria_id) => {
  const [result] = await db.query(
    'UPDATE egresos SET descripcion = ?, monto = ?, fecha = ?, categoria_id = ? WHERE id = ?',
    [descripcion, monto, fecha, categoria_id, id]
  );
  return result;
};

// Eliminar egreso
export const deleteEgresoService = async (id) => {
  const [result] = await db.query('DELETE FROM egresos WHERE id = ?', [id]);
  return result;
};
