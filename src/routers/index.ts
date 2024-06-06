import { authRouter } from './auth.router';
import { userRouter } from './user.router';
import { categoryRouter } from './category.router';
import { productRouter } from './product.router';

const useRouters = (app: any) => {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
};

export default useRouters;
