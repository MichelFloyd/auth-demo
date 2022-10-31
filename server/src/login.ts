import { GraphQLError } from 'graphql';
import { compare } from 'bcrypt';
import { findUserByUserName } from './users';
import { genHash } from './genHash';

const comparePromise = async (password, hash) => {
  return new Promise((resolve, reject) => {
    compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const login = async (_, { username, password }) => {
  const user = findUserByUserName(username);
  console.log(genHash(password));
  if (user && (await comparePromise(password, user.hash))) return user;
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
};
