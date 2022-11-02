// manage security tokens sent and received from the server

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

export const setTokens = ({ accessToken, refreshToken }: tokens) => {
  console.info(`got new tokens!`);
  try {
    const promiseArray = [];
    if (process.env.GRAPHQL_HOST)
      promiseArray.push(
        AsyncStorage.setItem('graphqlHost', process.env.GRAPHQL_HOST)
      );
    if (accessToken)
      promiseArray.push(AsyncStorage.setItem('accessToken', accessToken));
    if (refreshToken)
      promiseArray.push(AsyncStorage.setItem('refreshToken', refreshToken));
    Promise.all(promiseArray);
  } catch (error: any) {
    console.error(`Error setting tokens: ${error.message}`);
  }
};

export const getTokens = async () => {
  const graphqlHost = await AsyncStorage.getItem('graphqlHost');
  if (graphqlHost && graphqlHost !== process.env.GRAPHQL_HOST)
    return { accessToken: null, refreshToken: null };
  else {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  }
};

// see if the app has tokens set and at least one is not expired
export const hasValidTokens = async () => {
  /* in development and staging we often bounce around between servers with different private keys
   * by associating tokens with a particular server we can avoid invalid token errors */
  const graphqlHost = await AsyncStorage.getItem('graphqlHost');
  if (graphqlHost === process.env.GRAPHQL_HOST) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (isTokenValid(accessToken)) return true;
    else {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (isTokenValid(refreshToken)) return true;
    }
  }
  return false;
};

export const clearTokens = () =>
  Promise.all([
    AsyncStorage.removeItem('graphqlHost'),
    AsyncStorage.removeItem('accessToken'),
    AsyncStorage.removeItem('refreshToken'),
  ]);

// adapted from https://stackoverflow.com/a/69058154/2805154
const isTokenValid = (token: string | null) => {
  if (token?.length) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const expiration = JSON.parse(decodedJson).exp * 1000;
    return Date.now() <= expiration;
  }
  return false;
};
