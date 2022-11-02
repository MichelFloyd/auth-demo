import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { Spinner } from '../components/Spinner';

const BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

interface iBook {
  id: number;
  title: string;
  author: string;
}

export const Public = () => {
  const { data, error } = useQuery(BOOKS);
  if (data)
    return (
      <View style={styles.container}>
        <Text>Public route</Text>
        {data.books.map(({ id, title, author }: iBook) => (
          <View key={id} style={styles.book}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        ))}
      </View>
    );
  else if (error)
    return (
      <View style={styles.container}>
        <Text>Error loading data: {error.message}</Text>
      </View>
    );
  else return <Spinner />;
};

const styles = StyleSheet.create({
  author: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  book: {
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
