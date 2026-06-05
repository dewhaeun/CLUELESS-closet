import { Router } from 'express';
import { query as dbQuery } from 'express-validator';
import { uploadItem, getItems, deleteItem } from '../controllers/itemController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../config/cloudinary.js';

const router = Router();

// 모든 item 라우트는 JWT 필요
router.use(authenticate);

router.post(
  '/',
  upload.single('image'),
  uploadItem
);

router.get(
  '/',
  dbQuery('category')
    .optional()
    .isIn(['top', 'bottom', 'outer', 'shoes', 'accessory'])
    .withMessage('Invalid category'),
  validate,
  getItems
);

router.delete('/:id', deleteItem);

export default router;
