import { ApolloLink, HttpLink, from } from '@apollo/client';
import {
  getTokens,
  isTokenValid,
  setTokens,
  tokenExpiryTime,
} from '../util/tokens';

import { setContext } from '@apollo/client/link/context';

const uri = process.env.REACT_APP_GRAPHQL_HOST;
const httpLink = new HttpLink({ uri });

// get the access and refresh tokens from local storage and use them to set the request headers
const authLink = setContext((_, { headers }) => {
  let { accessToken, refreshToken } = getTokens();
  if (accessToken && refreshToken) {
    if (tokenExpiryTime(accessToken) > anHourFromNow())
      return {
        headers: { ...headers, 'x-access-token': accessToken },
      };
    else if (isTokenValid(refreshToken))
      return { headers: { ...headers, 'x-refresh-token': refreshToken } };
  }
  return { headers: { ...headers } }; // no unexpired tokens
});

// our Apollo server is regularly sending new access and refresh tokens in
// the response headers. These need to be extracted and pushed to local storage
// See https://zach.codes/access-response-headers-in-apollo-client/

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const accessToken = context?.response?.headers?.get('x-access-token');
    const refreshToken = context?.response?.headers?.get('x-refresh-token');
    if (accessToken || refreshToken) setTokens({ accessToken, refreshToken });
    return response;
  });
});

// see https://www.apollographql.com/docs/react/api/link/introduction/#additive-composition
export const link = from([authLink, afterwareLink, httpLink]);

const anHourFromNow = () => {
  const time = new Date();
  time.setHours(time.getHours() + 1);
  return time;
};
