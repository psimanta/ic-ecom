import bcryptjs from 'bcryptjs';

const getHashedPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export { getHashedPassword };
