import './App.css';
import Pictures from './pictures'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:8083/v1/graphql",
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
