import express from 'express';
import {
  getKpisCategorias,
  getMovimientosPorCategoria,
  getTodosMovimientos
} from '../controllers/kpis.controller.js';

const router = express.Router();


router.get('/', getKpisCategorias);


router.get('/:categoriaId', getMovimientosPorCategoria);


router.get('/movimientos/general', getTodosMovimientos);

export default router;
