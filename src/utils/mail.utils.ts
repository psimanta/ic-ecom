import transporter from '../services/mail.service';

// DRY => Don't Repeat Yourself
// KISS => Keep it simple stupid

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (
  mailOptions: MailOptions,
) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

const sendVerificationCodeMail = async ({
  to,
  code,
}: {
  to: string;
  code: string;
}) => {
  await sendMail({
    from: 'IC-Ecom',
    to,
    subject: 'User verification code',
    html: `<h3>Your verification code is ${code}</h3>`,
  });
};

export { sendVerificationCodeMail };
