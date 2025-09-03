import { Router } from 'express';
import {
  getEgresos,
  createEgreso,
  updateEgreso,
  deleteEgreso
} from '../controllers/egresos.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',verifyToken, getEgresos);        // GET /egresos
router.post('/',verifyToken, createEgreso);     // POST /egresos
router.put('/:id',verifyToken, updateEgreso);   // PUT /egresos/:id
router.delete('/:id',verifyToken, deleteEgreso); // DELETE /egresos/:id

export default router;
