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
        <Text style={styles.h1}>User Profile</Text>
        <Text style={styles.id}>
          <Text style={styles.label}>id: </Text>
          {id}
        </Text>
        <Text style={styles.name}>
          <Text style={styles.label}>username: </Text>
          {username}
        </Text>
        <Text style={styles.name}>
          <Text style={styles.label}>nickname: </Text>
          {nickname}
        </Text>
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
  h1: {
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 5,
  },
  id: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  label: {
    fontWeight: '500',
  },
  name: {
    textAlign: 'center',
  },
});
