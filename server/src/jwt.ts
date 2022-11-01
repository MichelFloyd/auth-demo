// function to set jwts
// see https://www.richardkotze.com/coding/json-web-tokens-using-apollo-graphql

import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

export const setTokens = ({ id }) => {
  // if you want to include more than the user's id in the JWT then include it here
  const user = { user: { id } };
  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_DURATION,
  });
  return { id, accessToken, refreshToken };
};

// the following two functions wrap verify() in a try/catch to muffle expired jwt errors
export const validateAccessToken = (token: string) => {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired')
      console.error(`Access token error: ${error.message}`);
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired')
      console.error(`Refresh token error: ${error.message}`);
  }
};

export const comparePromise = (password: string, hash: string) =>
  new Promise((resolve, reject) => {
    compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
