import { Router } from 'express';
import { getBalance } from '../controllers/balance.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = Router();

router.get('/', verifyToken, getBalance);

export default router;
