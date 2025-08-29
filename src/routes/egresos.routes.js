import { Router } from 'express';
import {
  getEgresos,
  createEgreso,
  updateEgreso,
  deleteEgreso
} from '../controllers/egresos.controller.js';

const router = Router();

router.get('/', getEgresos);        // GET /egresos
router.post('/', createEgreso);     // POST /egresos
router.put('/:id', updateEgreso);   // PUT /egresos/:id
router.delete('/:id', deleteEgreso); // DELETE /egresos/:id

export default router;
