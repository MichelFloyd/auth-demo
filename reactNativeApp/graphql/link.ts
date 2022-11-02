// see https://github.com/apollographql/apollo-client/issues/6212#issuecomment-762195367
// for info on how to access AsyncStorage when constructing the headers

import { ApolloLink, HttpLink, from } from '@apollo/client';
import { getTokens, setTokens } from '../util/tokens';

import { getHost } from './getHost';
import { setContext } from '@apollo/client/link/context';

const uri = getHost();
const httpLink = new HttpLink({ uri });

// get the access and refresh tokens from AsyncStorage and use them to set the request headers
const authLink = setContext(async (_, { headers }) => {
  const { accessToken, refreshToken } = await getTokens();
  return {
    headers: {
      ...headers,
      'x-access-token': accessToken,
      'x-refresh-token': refreshToken,
    },
  };
});

// our Apollo server is regularly sending new access and refresh tokens in
// the response headers. These need to be extracted and pushed to AsyncStorage
// See https://zach.codes/access-response-headers-in-apollo-client/

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const accessToken = context.response.headers.get('x-access-token');
    const refreshToken = context.response.headers.get('x-refresh-token');
    if (accessToken || refreshToken) setTokens({ accessToken, refreshToken });

    if (typeof response !== 'object')
      console.error(`Response is of type ${typeof response}, expected object`);
    return response;
  });
});

// see https://www.apollographql.com/docs/react/api/link/introduction/#additive-composition
export const link = from([authLink, afterwareLink, httpLink]);
