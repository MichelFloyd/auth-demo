import { ApolloServer } from '@apollo/server';
import { context } from './context';
import dotenv from 'dotenv';
import { resolvers } from './resolvers';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';

dotenv.config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: parseInt(process.env.PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
