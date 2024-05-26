import express, { Response, Request } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import './services/db.service';

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'IC E-com API' });
});

app.use((req: Request, res: Response) => {
  return res.status(404).send({
    message: 'Not found!',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
