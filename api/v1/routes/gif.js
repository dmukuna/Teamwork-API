import { Router } from 'express';
import {
  createGifController, getGifsController, getGifController, deleteGifController,
} from '../controllers/gif';
import commentRoutes from './comment';
import multerUploads from '../middleware/multerConfig';
import auth from '../middleware/auth';
import Role from '../../../config/rolesConfig';

const router = Router();

router.post('/', multerUploads, createGifController);
router.get('/', getGifsController);
router.get('/:gifId', getGifController);
router.delete('/:gifId', deleteGifController);
router.use('/:gifId/comments', auth([Role.Employee]), commentRoutes);

export default router;
