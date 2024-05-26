import mongoose from 'mongoose';

import { getHashedPassword } from '../utils/password.utils';

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

userSchema.pre('save', async function (next) {
  this.password = await getHashedPassword(this.password);
  next();
});

export const User = mongoose.model('User', userSchema);
