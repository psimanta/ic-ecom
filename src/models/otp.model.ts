import { Schema, model } from 'mongoose';
import { sendVerificationCodeMail } from '../utils/mail.utils';

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

otpSchema.post('save', async function () {
  sendVerificationCodeMail({
    to: this.email,
    code: this.otp,
  });
});

export const OTP = model('OTP', otpSchema);
