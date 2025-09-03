import { Router } from 'express';
import { getIngresos, createIngreso, updateIngreso, deleteIngreso } from '../controllers/ingresos.controller.js';
import { verifyToken} from "../middleware/auth.middleware.js"

const router = Router();

router.get('/',verifyToken, getIngresos);
router.post('/',verifyToken, createIngreso);
router.put('/:id',verifyToken, updateIngreso);
router.delete('/:id',verifyToken, deleteIngreso);

export default router;
