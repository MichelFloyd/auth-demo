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
        style={styles.textInput}
      />

      <TextInput
        keyboardType="default"
        textContentType="password"
        clearButtonMode={'always'}
        placeholder="password"
        style={styles.textInput}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
