import { Request, Response } from 'express';
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';

import { User, OTP } from '../models';
import { checkPassowrdValid } from '../utils/password.utils';

interface UserInterface {
  email: string;
  password: string;
  name?: string;
}

const registerUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload: UserInterface = pick(
      req.body,
      ['email', 'name', 'password'],
    );

    let user = await User.findOne({
      email: payload.email,
    });

    if (user) {
      return res.status(400).send({
        err_message: 'User already exists!',
      });
    }

    user = new User({ ...payload });
    await user.save();

    return res.status(201).send({
      message:
        'User is registered! A verification code has been sent to your email.',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

const loginUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload: UserInterface = pick(
      req.body,
      ['email', 'password'],
    );

    let user = await User.findOne({
      email: payload.email,
    });

    if (!user)
      return res.status(404).send({
        err_message: 'User does not exsit!',
      });

    const isPasswordValid: boolean =
      await checkPassowrdValid(
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

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_PRIVATE_KEY as jwt.Secret,
    );

    return res.status(200).send({
      message: 'Login successful!',
      token,
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

const resendVerificationCode = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload: UserInterface = pick(
      req.body,
      ['email', 'password'],
    );

    let user = await User.findOne({
      email: payload.email,
    });

    if (!user)
      return res.status(404).send({
        err_message: 'User does not exsit!',
      });

    const isPasswordValid: boolean =
      await checkPassowrdValid(
        payload.password,
        user.password,
      );

    if (!isPasswordValid) {
      return res.status(401).send({
        message: 'Invalid credentials!',
      });
    }

    if (user.confirmed) {
      return res.status(200).send({
        message: 'User is already verified!',
      });
    }

    const otpDoc = await OTP.findOne({
      email: payload.email,
    });

    if (!otpDoc) {
      const newOtpDoc = new OTP({
        email: payload.email,
      });
      const newOTP = await newOtpDoc.save();
      return res.status(200).send({
        verification_code: newOTP.otp,
      });
    }

    return res.status(200).send({
      verification_code: otpDoc.otp,
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

const verifyUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const payload = pick(req.body, [
      'email',
      'code',
    ]);

    const user = await User.findOne({
      email: payload.email,
    });

    if (user && user.confirmed) {
      return res.status(200).send({
        message: 'User is already verified!',
      });
    }

    let verifiedOTP = await OTP.findOne({
      email: payload.email,
      otp: payload.code,
    });

    if (verifiedOTP && user) {
      await User.findOneAndUpdate(
        { email: payload.email },
        { confirmed: true },
      );

      return res.status(200).send({
        message: 'User verified successfully!',
      });
    }

    return res.status(400).send({
      message: 'Invalid verification code!',
    });
  } catch (err: any) {
    return res.status(400).send({
      err_message: err?.message || 'Bad request',
    });
  }
};

export {
  registerUser,
  loginUser,
  resendVerificationCode,
  verifyUser,
};
