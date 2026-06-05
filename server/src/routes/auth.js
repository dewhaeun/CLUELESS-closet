import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

const emailRules = body('email').isEmail().normalizeEmail();
const passwordRules = body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters');

router.post('/signup', [emailRules, passwordRules], validate, signup);
router.post('/login',  [emailRules, passwordRules], validate, login);
router.get('/me', authenticate, getMe);

export default router;
