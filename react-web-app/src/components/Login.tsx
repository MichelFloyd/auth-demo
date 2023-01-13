import '../App.css';

import React, { useEffect, useState } from 'react';
import { clearTokens, hasValidTokens, setTokens } from '../util/tokens';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation logMeIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      accessToken
      refreshToken
    }
  }
`;

interface Props {
  isLoggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<Props> = ({ isLoggedIn, setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credError, setCredError] = useState(false);
  useEffect(() => setLogin(hasValidTokens()), []);
  const [mutate] = useMutation(LOGIN, {
    variables: { username, password },
    onCompleted: ({ login }) => {
      setTokens(login);
      setLogin(true);
      setCredError(false);
    },
    onError: (error) => {
      setCredError(true);
    },
  });

  const logout = () => {
    clearTokens();
    setLogin(false);
  };

  return isLoggedIn ? (
    <button className="button" onClick={logout}>
      Logout
    </button>
  ) : (
    <div className="container">
      <div className="label">Please login!</div>
      <input
        onChange={(event) => {
          setUsername(event.target.value);
          setCredError(false);
        }}
        placeholder="username"
        autoFocus={true}
        className="textInput"
      />

      <input
        onChange={(event) => {
          setPassword(event.target.value);
          setCredError(false);
        }}
        placeholder="password"
        className="textInput"
      />
      {credError ? <div className="error">Invalid credentials</div> : null}
      <button className="button" onClick={() => mutate()}>
        Login
      </button>
    </div>
  );
};
