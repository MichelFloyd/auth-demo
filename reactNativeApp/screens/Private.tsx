import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Login } from '../components/Login';
import { hasTokens } from '../util/tokens';

export const Private: React.FC<Props> = ({ navigation }) => {
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    hasTokens().then((ht) => setLogin(ht));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Private route</Text>
      {isLoggedIn ? (
        <>
          <Text>user is logged in</Text>
          <Button title="Logout" />
        </>
      ) : (
        <>
          <Login />
          <Button title="Login" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
