import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { Spinner } from '../components/Spinner';

const ME = gql`
  query {
    me {
      id
      username
      nickname
    }
  }
`;

export const Profile = () => {
  const { data, error } = useQuery(ME);
  if (data) {
    const { id, username, nickname } = data.me;
    return (
      <View style={styles.container}>
        <Text>User Profile</Text>
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.name}>{nickname}</Text>
      </View>
    );
  } else if (error)
    return (
      <View style={styles.container}>
        <Text>Error loading data: {error.message}</Text>
      </View>
    );
  else return <Spinner />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
  },
});
