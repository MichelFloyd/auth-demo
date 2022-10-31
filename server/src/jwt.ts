// function to set jwts
// see https://www.richardkotze.com/coding/json-web-tokens-using-apollo-graphql

import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

export const setTokens = ({ id }) => {
  const accessUser = { id };
  const accessToken = sign(
    { user: accessUser },
    process.env.ACCESSTOKENSECRET,
    { expiresIn: process.env.ACCESS_TOKEN_DURATION }
  );
  const refreshUser = { id };
  const refreshToken = sign(
    { user: refreshUser },
    process.env.REFRESHTOKENSECRET,
    { expiresIn: process.env.REFRESH_TOKEN_DURATION }
  );
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 60);
  return { accessToken, refreshToken };
};

export const validateAccessToken = (token) => {
  try {
    return verify(token, process.env.ACCESSTOKENSECRET);
  } catch (error) {
    if (error.message !== 'jwt expired') console.error(error.message);
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    return verify(token, process.env.REFRESHTOKENSECRET);
  } catch (error) {
    if (error.message !== 'jwt expired') console.error(error.message);
    return null;
  }
};
