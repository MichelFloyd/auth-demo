import { GraphQLError } from 'graphql';
import { compare } from 'bcrypt';
import { findUserByUserName } from './users';
import { setTokens } from './jwt';

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
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user);
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
};
