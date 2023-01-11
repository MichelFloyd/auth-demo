// manage security tokens sent and received from the server

import jwt_decode from 'jwt-decode';

const tokenList = ['graphqlHost', 'accessToken', 'refreshToken']; //order is important!

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

interface iToken {
  id: string;
  exp: number;
  iat: number;
}

export const setTokens = ({ accessToken, refreshToken }: tokens) => {
  console.info(`got new tokens!`);
  console.log(process.env.REACT_APP_GRAPHQL_HOST);
  localStorage.setItem(
    'graphqlHost',
    process.env.REACT_APP_GRAPHQL_HOST || 'undefined'
  );
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getTokens = async () => ({
  graphqlHost: localStorage.getItem('graphqlHost') || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
});

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = async () => {
  const { accessToken, refreshToken } = await getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  tokenList.forEach((token) => {
    localStorage.clearItem(token);
  });
};

export const tokenExpiryTime = (token: string) =>
  new Date(jwt_decode<iToken>(token)?.iat);

const isTokenValid = (token: string | null) =>
  token?.length && new Date() <= new Date(jwt_decode<iToken>(token)?.iat);
