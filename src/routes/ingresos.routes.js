import { Router } from 'express';
import { getIngresos, createIngreso, updateIngreso, deleteIngreso } from '../controllers/ingresos.controller.js';

const router = Router();

router.get('/', getIngresos);
router.post('/', createIngreso);
router.put('/:id', updateIngreso);
router.delete('/:id', deleteIngreso);

export default router;
