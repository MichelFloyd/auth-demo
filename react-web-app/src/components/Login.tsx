import '../App.css';

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { setTokens } from '../util/tokens';

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
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<Props> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credError, setCredError] = useState(false);
  const [mutate] = useMutation(LOGIN, {
    variables: { username, password },
    onCompleted: ({ login }) => {
      setTokens(login);
      setLoggedIn(true);
      setCredError(false);
    },
    onError: (error) => {
      setCredError(true);
    },
  });
  return (
    <div>
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
      {/* <Button
        title="Login"
        onPress={() => {
          mutate();
        }}
      /> */}
    </div>
  );
};
