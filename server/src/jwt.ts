// function to set jwts
// see https://www.richardkotze.com/coding/json-web-tokens-using-apollo-graphql

import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

export const setTokens = (user) => {
  const accessToken = sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_DURATION,
  });
  const refreshToken = sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_DURATION,
  });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 60);
  return { id: user.id, accessToken, refreshToken };
};

// these two functions wrap verify() in a try/catch to absorb expired jwt errors
export const validateAccessToken = (token: string) => {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired') console.error(error.message);
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.message !== 'jwt expired') console.error(error.message);
  }
};

export const comparePromise = async (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    compare(password, hash, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
