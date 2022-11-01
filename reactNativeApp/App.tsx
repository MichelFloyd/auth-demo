import { StyleSheet, Text, View } from 'react-native';

import { ApolloProvider } from '@apollo/client';
import { Navigation } from './navigation';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { client } from './graphql/client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <StatusBar />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
