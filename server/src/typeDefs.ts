import gql from 'graphql-tag';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const typeDefs = gql`
  """
  This "Book" type defines the queryable fields for every book in our data source.
  """
  type Book {
    title: String
    author: String
  }

  """
  JWT tokens
  """
  type Tokens {
    """
    id is the id of the associated user
    """
    id: ID!
    accessToken: String
    refreshToken: String
  }

  """
  " User type - note that we don't expose the hash
  """
  type User {
    id: ID!
    username: String!
    nickname: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
  type Mutation {
    login(username: String!, password: String!): Tokens
  }
`;
