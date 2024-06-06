import { Router } from 'express';

import {
  createCategory,
  getCategories,
} from '../controllers/category.controller';
import authenticate from '../middlewares/authenticate.middleware';
import authorize from '../middlewares/authorize.middleware';

const router = Router();

router
  .route('/')
  .get(getCategories)
  .post(
    [authenticate, authorize],
    createCategory,
  );

export { router as categoryRouter };
