import { comparePromise, setTokens } from './jwt';

import { GraphQLError } from 'graphql';
import { findUserByUserName } from './users';

export const login = async (_: any, { username, password }) => {
  const user = findUserByUserName(username);
  if (user && (await comparePromise(password, user.hash)))
    return setTokens(user);
  else
    throw new GraphQLError('Invalid credentials', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
};
