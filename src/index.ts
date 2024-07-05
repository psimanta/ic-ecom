import express, {
  Response,
  Request,
} from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { useAppMiddleWares } from './middlewares';
import useRouters from './routers';

import './services/db.service';

const app = express();

useAppMiddleWares(app);

app.get('/', (req: Request, res: Response) => {
  return res
    .status(200)
    .send({ message: 'IC E-com API' });
});

useRouters(app);

app.use((req: Request, res: Response) => {
  return res.status(404).send({
    message: 'Not found!',
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server is running at http://localhost:${port}`,
  );
});
