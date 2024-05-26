import { Request, Response } from 'express';
import { pick } from 'lodash';

import { User } from '../models/user.model';

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = pick(req.body, ['email', 'name', 'password']);

    let user = await User.findOne({ email: payload.email });

    if (user) {
      return res.status(400).send({
        err_message: 'User already exists!',
      });
    }

    user = new User({ ...payload });
    await user.save();

    return res.status(201).send({
      message: 'User is registered!',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

const loginUser = (req: Request, res: Response) => {
  return res.send({ message: 'Login' });
};

export { registerUser, loginUser };
