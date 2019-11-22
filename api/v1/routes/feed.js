import { Router } from 'express';
import getPosts from '../controllers/feed';

const router = Router();

router.get('/', getPosts);

export default router;
