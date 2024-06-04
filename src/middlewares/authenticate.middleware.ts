import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('x-api-key');
  if (!token)
    return res.status(401).send({
      err_message: 'Access denied!',
    });
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_PRIVATE_KEY as jwt.Secret,
    );
    res.locals = { ...(decoded as any) };
    next();
  } catch (err) {
    return res.status(400).send({
      err_message: 'Invalid token!',
    });
  }
};

export default authenticate;
