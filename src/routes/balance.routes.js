import { Router } from 'express';
import { getBalance } from '../controllers/balance.controller.js';

const router = Router();

router.get('/', getBalance);

export default router;
