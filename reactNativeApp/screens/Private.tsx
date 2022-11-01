import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';

import { Login } from '../components/Login';

export const Private: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Private route</Text>
      <Login />
      <Button title="Login" />
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
