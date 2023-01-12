import './App.css';

import { ApolloProvider } from '@apollo/client';
import { Layout } from './components/Layout';
import { client } from './graphql/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  );
};

export default App;
