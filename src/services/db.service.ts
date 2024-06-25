import mongoose from 'mongoose';

mongoose
  .connect(process.env.DB_URL as string)
  .then(() =>
    console.log('Db connected successfully!'),
  )
  .catch((err) => {
    throw new Error(err);
  });
