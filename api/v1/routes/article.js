import { Router } from 'express';
import {
  createArticleController, getArticlesController, getArticleController,
  updateArticleController, deleteArticleController,
} from '../controllers/article';
import commentRoutes from './comment';
import auth from '../middleware/auth';
import Role from '../../../config/rolesConfig';

const router = Router();

router.post('/', createArticleController);
router.get('/', getArticlesController);
router.get('/:articleId', getArticleController);
router.patch('/:articleId', updateArticleController);
router.delete('/:articleId', deleteArticleController);
router.use('/:articleId/comments', auth([Role.Employee, Role.Admin]), commentRoutes);

export default router;
