import { RequestHandler, Router } from 'express';
import {
  createUser,
  getUserRole,
  updateUser,
} from '../controllers/userController';

const router = Router();

// User routes
router.post('/create-user', createUser as RequestHandler);
router.get('/user/:email', getUserRole as RequestHandler);
router.put('/update-user/:email', updateUser as RequestHandler);

export default router;
