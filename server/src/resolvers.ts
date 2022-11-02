import { books } from './books';
import { findUserById } from './users';
import { login } from './login';

export const resolvers = {
  Mutation: {
    login,
  },
  Query: {
    books: () => books, // This resolver retrieves books from the "books" array above.
    me: (_: any, __: any, { req }: any) => {
      // retrieve the current user, but only if they are logged in!
      const userId = req.user?.id; // user will only be set if valid tokens have been provided
      if (userId) return findUserById(userId);
    },
  },
};
