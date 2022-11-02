import { Button, Text } from 'react-native';
import { KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
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
    <KeyboardAvoidingView>
      <Text style={styles.label}>Please login!</Text>
      <TextInput
        keyboardType="name-phone-pad"
        textContentType="name"
        clearButtonMode={'always'}
        onChangeText={(text) => {
          setUsername(text);
          setCredError(false);
        }}
        placeholder="username"
        autoFocus={true}
        style={styles.textInput}
        autoCorrect={false}
      />

      <TextInput
        keyboardType="default"
        secureTextEntry={true}
        clearButtonMode={'always'}
        onChangeText={(text) => {
          setPassword(text);
          setCredError(false);
        }}
        placeholder="password"
        style={styles.textInput}
        autoCorrect={false}
      />
      {credError ? <Text style={styles.error}>Invalid credentials</Text> : null}
      <Button
        title="Login"
        onPress={() => {
          mutate();
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    padding: 5,
  },
  textInput: {
    width: 200,
    textAlign: 'center',
    marginVertical: 8,
    padding: 2,
    fontSize: 16,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
});
