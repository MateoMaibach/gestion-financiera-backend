import db from '../models/db.js';

// Listar categorías
export const fetchCategorias = async () => {
  const [rows] = await db.query('SELECT * FROM categorias');
  return rows;
};

// Crear categoría
export const insertCategoria = async ({ nombre }) => {
  const [result] = await db.query(
    'INSERT INTO categorias (nombre) VALUES (?)',
    [nombre]
  );
  return { id: result.insertId, nombre };
};

// Actualizar categoría
export const modifyCategoria = async (id, { nombre }) => {
  await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
  return { id, nombre };
};

// Eliminar categoría
export const removeCategoria = async (id) => {
  await db.query('DELETE FROM categorias WHERE id = ?', [id]);
};
