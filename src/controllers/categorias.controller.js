import { fetchCategorias, insertCategoria, modifyCategoria, removeCategoria } from '../services/categorias.service.js';

// Listar categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await fetchCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear categoría
export const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaCategoria = await insertCategoria({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar categoría
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const categoriaActualizada = await modifyCategoria(id, { nombre });
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar categoría
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await removeCategoria(id);
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
