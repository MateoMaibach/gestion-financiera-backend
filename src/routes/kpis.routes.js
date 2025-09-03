import express from 'express';
import {
  getKpisCategorias,
  getMovimientosPorCategoria,
  getTodosMovimientos
} from '../controllers/kpis.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get('/', verifyToken, getKpisCategorias);


router.get('/:categoriaId', verifyToken, getMovimientosPorCategoria);


router.get('/movimientos/general', verifyToken, getTodosMovimientos);

export default router;
