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

export const getTokens = () => ({
  graphqlHost: localStorage.getItem('graphqlHost') || '',
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
});

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = () => {
  const { accessToken, refreshToken } = getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  tokenList.forEach((token) => {
    localStorage.clearItem(token);
  });
};

export const tokenExpiryTime = (token: string) =>
  token ? new Date(jwt_decode<iToken>(token)?.iat) : false;

export const isTokenValid = (token: string) =>
  tokenExpiryTime(token) >= new Date();
