import './App.css';
import Pictures from './pictures'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'ws://localhost:8083/v1/graphql',
    options: {
      reconnect: true,
      timeout: 30000
    
    }
   }),
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
