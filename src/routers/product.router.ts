import { Router } from 'express';

import {
  createProduct,
  getProducts,
} from '../controllers/product.controller';
import authenticate from '../middlewares/authenticate.middleware';
import authorize from '../middlewares/authorize.middleware';
import { validateProduct } from '../validators';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(
    [authenticate, authorize],
    [validateProduct],
    createProduct,
  );

export { router as productRouter };
