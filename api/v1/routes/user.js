import { Router } from 'express';
import { signUp, login } from '../controllers/user';
import auth from '../middleware/auth';
import Role from '../../../config/rolesConfig';

const router = Router();

router.post('/create-user', auth([Role.Admin]), signUp);
router.post('/signin', login);

export default router;
