import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export const Private: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Private route</Text>
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
