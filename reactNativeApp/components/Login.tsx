import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

import React from 'react';

export const Login: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <TextInput
        keyboardType="name-phone-pad"
        textContentType="name"
        clearButtonMode={'always'}
        placeholder="username"
        autoFocus={true}
      />

      <TextInput
        keyboardType="default"
        textContentType="password"
        clearButtonMode={'always'}
        placeholder="password"
      />
    </SafeAreaView>
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
