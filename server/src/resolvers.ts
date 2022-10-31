import { tUser, users } from './users';

import { books } from './books';
import { login } from './login';
import { setTokens } from './jwt';

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  UserTokens: {
    tokens: ({ id }) => setTokens({ id }),
  },
  Mutation: {
    login,
  },
  Query: {
    books: () => books, // This resolver retrieves books from the "books" array above.
  },
};
