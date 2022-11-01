import Constants from 'expo-constants';
import { isDevice } from 'expo-device';

export const getHost = () => {
  const { manifest } = Constants;
  let uri = process.env.GRAPHQL_HOST;
  if (!isDevice) console.info(`connecting to ${uri}`);
  let altLocalHost = manifest?.debuggerHost
    ? manifest.debuggerHost.split(':').shift()
    : '10.0.2.2';
  if (uri.includes('localhost') && altLocalHost)
    uri = uri.replace('localhost', altLocalHost);
  return uri;
};
