import { Router } from 'express';

import {
  createProduct,
  getProducts,
} from '../controllers/product.controller';
import authenticate from '../middlewares/authenticate.middleware';
import authorize from '../middlewares/authorize.middleware';

const router = Router();

router
  .route('/')
  .get(getProducts)
  .post([authenticate, authorize], createProduct);

export { router as productRouter };
