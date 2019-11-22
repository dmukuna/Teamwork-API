import { Router } from 'express';
import createCommentController from '../controllers/comment';

const router = Router({ mergeParams: true });

router.post('/', createCommentController);

export default router;
