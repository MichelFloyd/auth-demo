import { ApolloClient } from '@apollo/client';
import { cache } from './cache';
import { link } from './link';

// Initialize Apollo Client

export const client = new ApolloClient({
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
  link,
});
