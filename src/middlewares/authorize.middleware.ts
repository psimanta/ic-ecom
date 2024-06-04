import { Request, Response, NextFunction } from 'express';

const authorize = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.locals.role !== 'admin') {
    return res.status(403).send({
      err_message: 'Unauthorized!',
    });
  }
  next();
};

export default authorize;
