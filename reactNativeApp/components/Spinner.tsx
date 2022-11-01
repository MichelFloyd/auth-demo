import * as React from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Spinner: React.FC = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
