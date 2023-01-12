import './App.css';

import { ApolloProvider } from '@apollo/client';
import { Private } from './components/Private';
import { Public } from './components/Public';
import { client } from './graphql/client';
import logo from './logo.svg';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Public />
        <Private />
      </div>
    </ApolloProvider>
  );
};

export default App;
