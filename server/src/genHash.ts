import { genSaltSync, hashSync } from 'bcrypt';
const saltRounds = 11; // just to be unusual

export const genHash = (str) => {
  const salt = genSaltSync(saltRounds);
  return hashSync(str, salt);
};
