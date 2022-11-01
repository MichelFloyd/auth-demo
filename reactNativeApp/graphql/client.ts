import { ApolloClient } from '@apollo/client';
import { link } from './link';

// Initialize Apollo Client

export const client = new ApolloClient({
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
  link,
});
