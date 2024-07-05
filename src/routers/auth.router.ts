import { Router } from 'express';
import {
  registerUser,
  loginUser,
  resendVerificationCode,
  verifyUser,
  sendPasswordResetCode,
  changePassword,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post(
  '/resend-code',
  resendVerificationCode,
);
router.post('/verify', verifyUser);
router.post(
  '/reset-password',
  sendPasswordResetCode,
);
router.post('/change-password', changePassword);

export { router as authRouter };
