import { Router } from 'express';
import {
  registerUser,
  loginUser,
  resendVerificationCode,
  verifyUser,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend-code', resendVerificationCode);
router.post('/verify', verifyUser);

export { router as authRouter };
