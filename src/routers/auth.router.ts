import { Router } from 'express';
import {
  registerUser,
  loginUser,
  resendVerificationCode,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend-code', resendVerificationCode);

export { router as authRouter };
