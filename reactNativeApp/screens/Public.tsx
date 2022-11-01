import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<OnboardingFlowParamsList, 'welcome'>;
}

export const Public: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Public route</Text>
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
