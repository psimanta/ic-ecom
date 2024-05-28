import { Request, Response } from 'express';
import { pick } from 'lodash';

import { User } from '../models/user.model';
import { checkPassowrdValid } from '../utils/password.utils';

interface UserInterface {
  email: string;
  password: string;
  name?: string;
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload: UserInterface = pick(req.body, [
      'email',
      'name',
      'password',
    ]);

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

const loginUser = async (req: Request, res: Response) => {
  try {
    const payload: UserInterface = pick(req.body, [
      'email',
      'password',
    ]);

    let user = await User.findOne({ email: payload.email });

    if (!user)
      return res.status(404).send({
        err_message: 'User does not exsit!',
      });

    const isPasswordValid: boolean = await checkPassowrdValid(
      payload.password,
      user.password,
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: 'Invalid credentials!',
      });
    }

    if (!user.confirmed) {
      return res.status(403).send({
        message: 'User is not verified yet!',
      });
    }

    return res.status(200).send({
      message: 'Login successful!',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

export { registerUser, loginUser };
