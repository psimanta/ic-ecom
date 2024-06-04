import { Router } from 'express';
import { getMe, getUsers } from '../controllers/user.controller';

import authenticate from '../middlewares/authenticate.middleware';
import authorize from '../middlewares/authorize.middleware';

const router = Router();

router.get('/me', [authenticate], getMe);

router.get('/', [authenticate, authorize], getUsers);

export { router as userRouter };
