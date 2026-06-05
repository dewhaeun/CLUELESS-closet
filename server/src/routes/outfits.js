import { Router } from 'express';
import { body } from 'express-validator';
import { saveOutfit, getOutfits, deleteOutfit } from '../controllers/outfitController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  [
    body('top_id').isInt({ gt: 0 }).withMessage('top_id must be a positive integer'),
    body('bottom_id').isInt({ gt: 0 }).withMessage('bottom_id must be a positive integer'),
  ],
  validate,
  saveOutfit
);

router.get('/', getOutfits);

router.delete('/:id', deleteOutfit);

export default router;
