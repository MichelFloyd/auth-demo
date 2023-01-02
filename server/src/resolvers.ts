import { GraphQLError } from 'graphql';
import { books } from './books';
import { login } from './login';

export const resolvers = {
  Mutation: {
    login,
  },
  Query: {
    books: () => books, // This resolver retrieves books from the "books" array above.
    me: (_: object, __: object, { user }: { user: object }) => {
      if (user) return user;
      else throw new GraphQLError('foo', { extensions: { code: 403 } });
    },
  },
};
