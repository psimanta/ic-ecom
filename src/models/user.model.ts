import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { OTP } from './otp.model';
import { getHashedPassword } from '../utils/password.utils';
import { sendVerificationCodeMail } from '../utils/mail.utils';

interface UserInterface {
  name: string;
  email: string;
  passoword: string;
  role: 'admin' | 'user';
  confirmed: boolean;
  generateAuthToken: any;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: 100,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    maxLength: 50,
    minLength: 5,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken =
  function () {
    return jwt.sign(
      { email: this.email, role: this.role },
      process.env.JWT_PRIVATE_KEY as jwt.Secret,
    );
  };

userSchema.pre('save', async function (next) {
  this.password = await getHashedPassword(
    this.password,
  );
  next();
});

userSchema.post('save', async function () {
  const otp = new OTP({
    email: this.email,
  });
  await otp.save();
});

export const User = mongoose.model(
  'User',
  userSchema,
);
