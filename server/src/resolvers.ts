import { books } from './books';
import { login } from './login';

export const resolvers = {
  Mutation: {
    login,
  },
  Query: {
    books: () => books, // This resolver retrieves books from the "books" array above.
  },
};
