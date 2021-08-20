import logo from './logo.svg';
import './App.css';
import Pictures from './pictures'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://hasura:8083/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
  <Pictures />
    </ApolloProvider>
  );
}


export default App;
