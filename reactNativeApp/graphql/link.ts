import { ApolloLink, HttpLink, from } from '@apollo/client';
import { getTokens, setTokens, tokenExpiryTime } from '../util/tokens';

import { getHost } from './getHost';
import { setContext } from '@apollo/client/link/context';

const uri = getHost();
const httpLink = new HttpLink({ uri });

// get the access and refresh tokens from AsyncStorage and use them to set the request headers
const authLink = setContext(async (_, { headers }) => {
  let { accessToken, refreshToken } = await getTokens();
  if (accessToken && refreshToken) {
    if (tokenExpiryTime(accessToken) > anHourFromNow())
      // access token expires at least an hour from now
      return {
        headers: { ...headers, 'x-access-token': accessToken },
      };
    else if (tokenExpiryTime(refreshToken) > new Date())
      // refresh token is unexpired
      return { headers: { ...headers, 'x-refresh-token': refreshToken } };
  }
  return { headers: { ...headers } }; // no unexpired tokens
});

// our Apollo server is regularly sending new access and refresh tokens in
// the response headers. These need to be extracted and pushed to AsyncStorage
// See https://zach.codes/access-response-headers-in-apollo-client/

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const accessToken = context?.response?.headers?.get('x-access-token');
    const refreshToken = context?.response?.headers?.get('x-refresh-token');
    if (accessToken || refreshToken) setTokens({ accessToken, refreshToken });
    if (typeof response !== 'object')
      console.error(`Response is of type ${typeof response}, expected object`);
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
