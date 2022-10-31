import { setTokens, validateAccessToken, validateRefreshToken } from './jwt';

export const context = async ({ req, res }) => {
  const { headers } = req;
  let accessToken = headers['x-access-token'];
  let refreshToken = headers['x-refresh-token'];

  if (accessToken && accessToken !== 'null') {
    const decodedAccessToken = validateAccessToken(accessToken);
    let id = decodedAccessToken?.user?.id;

    if (!id) {
      // access token may have expired so check the refresh token
      // Note that 'null' may come across the wire as a string
      if (refreshToken && refreshToken !== 'null') {
        const tokenUser = validateRefreshToken(refreshToken)?.user;
        if (tokenUser) {
          // refresh the tokens
          id = tokenUser.id;
          ({ accessToken, refreshToken } = setTokens(tokenUser));
          res.set('x-access-token', accessToken);
          res.set('x-refresh-token', refreshToken);
        } else console.info(`Could not decode refreshToken: ${refreshToken}`);
      } else
        console.info(
          `Invalid/expired access token presented but refreshToken null or missing!`
        );
    }
    if (id) {
    }
  }
  return { req, res };
};
