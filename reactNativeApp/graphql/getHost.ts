import Constants from 'expo-constants';
import { GRAPHQL_HOST } from '@env';
import { isDevice } from 'expo-device';

export const getHost = () => {
  const { manifest } = Constants;
  let uri = GRAPHQL_HOST;
  // let uri = 'https://staging.truckerfy.com/graphql';
  if (!isDevice) console.info(`connecting to ${uri}`);
  let altLocalHost = manifest?.debuggerHost
    ? manifest.debuggerHost.split(':').shift()
    : '10.0.2.2';
  if (uri.includes('localhost') && altLocalHost)
    uri = uri.replace('localhost', altLocalHost);
  return uri;
};
