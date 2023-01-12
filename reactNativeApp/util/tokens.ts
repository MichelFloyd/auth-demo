// manage security tokens sent and received from the server

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHost } from '../graphql/getHost';
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
  AsyncStorage.multiSet([
    ['graphqlHost', getHost()],
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
  ]).catch((error: any) => {
    console.error(`Error setting tokens: ${error.message}`);
  });
};

export const getTokens = async () => {
  const kvArray = await AsyncStorage.multiGet(tokenList);
  /* in development and staging we often bounce around between servers with different private keys
   * by associating tokens with a particular server we can avoid invalid token errors */
  const graphqlHost = kvArray[0][1];
  return graphqlHost === getHost()
    ? { accessToken: kvArray[1][1], refreshToken: kvArray[2][1] }
    : { accessToken: null, refreshToken: null };
};

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = async () => {
  const { accessToken, refreshToken } = await getTokens();
  return isTokenValid(accessToken) || isTokenValid(refreshToken);
};

export const clearTokens = () => {
  AsyncStorage.multiRemove(tokenList);
};

export const tokenExpiryTime = (token: string) =>
  new Date(jwt_decode<iToken>(token)?.iat);

export const isTokenValid = (token: string | null) =>
  token?.length && new Date() <= tokenExpiryTime(token);
