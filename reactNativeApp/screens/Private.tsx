import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { clearTokens, hasValidTokens } from '../util/tokens';

import { Login } from '../components/Login';
import { Profile } from '../components/Profile';

export const Private = () => {
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    hasValidTokens().then((ht) => setLogin(ht));
  }, []);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Profile />
          <Button
            title="Logout"
            onPress={() => {
              clearTokens();
              setLogin(false);
            }}
          />
        </>
      ) : (
        <Login setLoggedIn={setLogin} />
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

  centered: {
    display: 'flex',
    textAlign: 'center',
  },
});
