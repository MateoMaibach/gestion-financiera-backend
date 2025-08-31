import { calcularBalance } from '../services/balance.service.js';

export const getBalance = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, categoria_id } = req.query;
    const balance = await calcularBalance(fecha_inicio, fecha_fin, categoria_id);
    res.json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el balance" });
  }
};
