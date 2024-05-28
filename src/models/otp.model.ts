import { Schema, model } from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    default: (Math.random() * 10 ** 6).toFixed(0),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // the document will be automatically removed after 5 minutes of creation time
  },
});

export const OTP = model('OTP', otpSchema);
