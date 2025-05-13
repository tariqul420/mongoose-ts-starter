import { RequestHandler, Router } from 'express';
import { createToken, removeToken } from '../controllers/jwtController';

const router = Router();

router.post('/create', createToken as RequestHandler);
router.get('/remove', removeToken as RequestHandler);

export default router;
