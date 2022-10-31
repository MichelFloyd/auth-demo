import { books } from './books';
import { login } from './login';
import { users } from './users';

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
  Mutation: {
    login,
  },
  Query: {
    books: () => books, // This resolver retrieves books from the "books" array above.
  },
};
