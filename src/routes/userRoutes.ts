import { Router } from 'express';
import {
  createUser,
  getUserRole,
  updateUser,
} from '../controllers/userController';

const router = Router();

router.post('/create-user', createUser);
router.get('/user/:email', getUserRole);
router.put('/update-user/:email', updateUser);

export default router;
