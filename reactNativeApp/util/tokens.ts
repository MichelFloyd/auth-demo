// manage security tokens sent and received from the server

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GRAPHQL_HOST } from '@env';

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

export const setTokens = ({ accessToken, refreshToken }: tokens) => {
  try {
    if (accessToken)
      AsyncStorage.setItem('graphqlHost', GRAPHQL_HOST).then(() => {
        AsyncStorage.setItem('accessToken', accessToken).then(() => {
          if (refreshToken) AsyncStorage.setItem('refreshToken', refreshToken);
        });
      });
  } catch (e) {
    console.error(e);
  }
};

export const getTokens = async () => {
  const graphqlHost = await AsyncStorage.getItem('graphqlHost');
  if (graphqlHost && graphqlHost !== GRAPHQL_HOST)
    return { accessToken: null, refreshToken: null };
  else {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  }
};

// async function to see if the app has storage tokens set

export const hasTokens = async () => {
  const graphqlHost = await AsyncStorage.getItem('graphqlHost');
  if (graphqlHost && graphqlHost !== GRAPHQL_HOST) return false;
  else {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return !!(accessToken && refreshToken);
  }
};

export const clearTokens = () =>
  Promise.all([
    AsyncStorage.removeItem('graphqlHost'),
    AsyncStorage.removeItem('accessToken'),
    AsyncStorage.removeItem('refreshToken'),
  ]);
