import { setTokens, validateAccessToken, validateRefreshToken } from './jwt';

import { findUserById } from './users';

export const context = async ({ req, res }) => {
  // Note that 'null' may come across the wire as a string
  let accessToken = req.headers['x-access-token']?.replace(/^null$/, '');
  let refreshToken = req.headers['x-refresh-token']?.replace(/^null$/, '');

  if (accessToken) {
    const decodedAccessToken = validateAccessToken(accessToken);
    let id = decodedAccessToken?.user?.id;

    if (!id) {
      // access token may have expired so check the refresh token
      if (refreshToken) {
        const tokenUser = validateRefreshToken(refreshToken)?.user;
        if (tokenUser) {
          /* refresh the tokens and make them available through headers to the client
           * this allows the client to transparently get refreshed headers without
           * requiring a separate GraphQL query request */
          id = tokenUser.id;
          ({ accessToken, refreshToken } = setTokens(tokenUser));
          res.set('x-access-token', accessToken);
          res.set('x-refresh-token', refreshToken);
        }
      } else
        console.info(
          `Invalid/expired access token presented but refreshToken null or missing!`
        );
    }
    /* if we've found an authenticated user, add the user object to req for access by resolvers via req.user
     * this includes *all* the user's fields but none of this goes back to the client unless requested via a graphql query */
    if (id) req.user = findUserById(id);
  }
  return { req, res };
};
