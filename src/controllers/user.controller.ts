import { Request, Response } from 'express';

const getMe = async (req: Request, res: Response) => {
  return res.status(200).send(res.locals);
};

const getUsers = async (req: Request, res: Response) => {
  return res.status(200).send({
    message: 'List of users',
  });
};

export { getMe, getUsers };
