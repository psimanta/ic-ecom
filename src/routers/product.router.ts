import { Router } from 'express';

import {
  createProduct,
  getProducts,
} from '../controllers/product.controller';
import {
  authenticate,
  authorize,
  parseWithMulter,
} from '../middlewares';
import { validateProduct } from '../validators';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post(
    [authenticate, authorize],
    [parseWithMulter, validateProduct],
    createProduct,
  );

export { router as productRouter };
